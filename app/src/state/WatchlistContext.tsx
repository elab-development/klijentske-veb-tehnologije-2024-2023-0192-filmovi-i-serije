import { createContext, useContext, useEffect, useReducer } from 'react';

type State = { movies: number[]; tv: number[] };
type Action =
  | { type: 'add'; kind: 'movies' | 'tv'; id: number }
  | { type: 'remove'; kind: 'movies' | 'tv'; id: number };

const Ctx = createContext<{ state: State; dispatch: React.Dispatch<Action> } | null>(null);

function reducer(state: State, a: Action): State {
  const set = new Set(state[a.kind]);
  if (a.type === 'add') set.add(a.id);
  else set.delete(a.id);
  return { ...state, [a.kind]: Array.from(set) };
}

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const initial: State = JSON.parse(localStorage.getItem('watchlist_v1') || '{"movies":[],"tv":[]}');
  const [state, dispatch] = useReducer(reducer, initial);
  useEffect(() => { localStorage.setItem('watchlist_v1', JSON.stringify(state)); }, [state]);
  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>;
}

export function useWatchlist() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('WatchlistProvider is missing');
  return ctx;
}
