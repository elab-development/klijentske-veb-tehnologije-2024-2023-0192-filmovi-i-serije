// app/src/state/WatchlistContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { useAuth } from './AuthContext';

type KindSingular = 'movie' | 'tv';
type KindPlural = 'movies' | 'tv';

export type State = {
  movies: number[];
  tv: number[];
  ratings: Record<string, number>; // key: `${kind}:${id}` -> 1..10
};

type Action =
  | { type: 'add'; kind: KindPlural; id: number }
  | { type: 'remove'; kind: KindPlural; id: number }
  | { type: 'rate'; kind: KindSingular; id: number; value: number }
  | { type: 'unrate'; kind: KindSingular; id: number }
  | { type: 'reset'; next: State };

type CtxValue = {
  state: State;
  dispatch: React.Dispatch<Action>;
  has: (kind: KindSingular, id: number) => boolean;
  rate: (kind: KindSingular, id: number, value: number) => void;
  getRating: (kind: KindSingular, id: number) => number | undefined;
};

const Ctx = createContext<CtxValue | null>(null);

function emptyState(): State {
  return { movies: [], tv: [], ratings: {} };
}

function revive(raw: any): State {
  if (!raw || typeof raw !== 'object') return emptyState();
  return {
    movies: Array.isArray(raw.movies) ? raw.movies.filter((n: any) => Number.isFinite(n)) : [],
    tv: Array.isArray(raw.tv) ? raw.tv.filter((n: any) => Number.isFinite(n)) : [],
    ratings: raw.ratings && typeof raw.ratings === 'object' ? raw.ratings : {},
  };
}

function reducer(state: State, a: Action): State {
  switch (a.type) {
    case 'add': {
      const list = a.kind === 'movies' ? state.movies : state.tv;
      if (list.includes(a.id)) return state;
      return a.kind === 'movies'
        ? { ...state, movies: [a.id, ...state.movies] }
        : { ...state, tv: [a.id, ...state.tv] };
    }
    case 'remove': {
      const list = a.kind === 'movies' ? state.movies : state.tv;
      const key = `${a.kind === 'movies' ? 'movie' : 'tv'}:${a.id}`;
      const { [key]: _drop, ...rest } = state.ratings;
      return a.kind === 'movies'
        ? { ...state, movies: list.filter(x => x !== a.id), ratings: rest }
        : { ...state, tv: list.filter(x => x !== a.id), ratings: rest };
    }
    case 'rate': {
      const key = `${a.kind}:${a.id}`;
      return { ...state, ratings: { ...state.ratings, [key]: a.value } };
    }
    case 'unrate': {
      const key = `${a.kind}:${a.id}`;
      const { [key]: _omit, ...rest } = state.ratings;
      return { ...state, ratings: rest };
    }
    case 'reset':
      return a.next;
    default:
      return state;
  }
}

function storageKey(userId: string | null) {
  return `watchlist_v2:${userId ?? 'guest'}`;
}

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(reducer, emptyState());

  // load per-user on mount/when user changes
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(user?.id ?? null));
      const next = raw ? revive(JSON.parse(raw)) : emptyState();
      dispatch({ type: 'reset', next });
    } catch {
      dispatch({ type: 'reset', next: emptyState() });
    }
  }, [user?.id]);

  // persist per-user
  useEffect(() => {
    try {
      localStorage.setItem(storageKey(user?.id ?? null), JSON.stringify(state));
    } catch {}
  }, [state, user?.id]);

  const api = useMemo<CtxValue>(() => ({
    state,
    dispatch,
    has: (kind, id) => (kind === 'movie' ? state.movies.includes(id) : state.tv.includes(id)),
    rate: (kind, id, value) => dispatch({ type: 'rate', kind, id, value }),
    getRating: (kind, id) => state.ratings[`${kind}:${id}`],
  }), [state]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useWatchlist() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('WatchlistProvider is missing');
  return ctx;
}
