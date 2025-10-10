// app/src/state/WatchlistContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { useAuth } from './AuthContext';
import { RatingMap, type KindSingular } from '../models/watchlist';

type KindPlural = 'movies' | 'tv';

export type State = {
  movies: number[];
  tv: number[];
  ratings: RatingMap; // class-based, serializable via toJSON
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
  return { movies: [], tv: [], ratings: new RatingMap() };
}

function revive(raw: any): State {
  if (!raw || typeof raw !== 'object') return emptyState();
  return {
    movies: Array.isArray(raw.movies) ? raw.movies.filter((n: any) => Number.isFinite(n)) : [],
    tv: Array.isArray(raw.tv) ? raw.tv.filter((n: any) => Number.isFinite(n)) : [],
    ratings: RatingMap.fromJSON(raw.ratings),
  };
}

function reducer(state: State, a: Action): State {
  switch (a.type) {
    case 'add': {
      const already = a.kind === 'movies' ? state.movies.includes(a.id) : state.tv.includes(a.id);
      if (already) return state;
      return a.kind === 'movies'
        ? { ...state, movies: [a.id, ...state.movies] }
        : { ...state, tv: [a.id, ...state.tv] };
    }

    case 'remove': {
      const list = a.kind === 'movies' ? state.movies : state.tv;
      const nextRatings = state.ratings.clone(); // avoid mutating existing reference
      const singular: KindSingular = a.kind === 'movies' ? 'movie' : 'tv';
      nextRatings.delete(singular, a.id);
      return a.kind === 'movies'
        ? { ...state, movies: list.filter(x => x !== a.id), ratings: nextRatings }
        : { ...state, tv: list.filter(x => x !== a.id), ratings: nextRatings };
    }

    case 'rate': {
      const nextRatings = state.ratings.clone();
      nextRatings.set(a.kind, a.id, a.value);
      return { ...state, ratings: nextRatings };
    }

    case 'unrate': {
      const nextRatings = state.ratings.clone();
      nextRatings.delete(a.kind, a.id);
      return { ...state, ratings: nextRatings };
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

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(user?.id ?? null));
      const next = raw ? revive(JSON.parse(raw)) : emptyState();
      dispatch({ type: 'reset', next });
    } catch {
      dispatch({ type: 'reset', next: emptyState() });
    }
  }, [user?.id]);

  // JSON.stringify will use RatingMap.toJSON automatically
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
    getRating: (kind, id) => state.ratings.get(kind, id),
  }), [state]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useWatchlist() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('WatchlistProvider is missing');
  return ctx;
}
