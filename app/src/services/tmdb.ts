const BASE = 'https://api.themoviedb.org/3';
const KEY = import.meta.env.VITE_TMDB_API_KEY as string;

function qs(params: Record<string, any> = {}) {
  const sp = new URLSearchParams({ api_key: KEY });
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== '') sp.set(k, String(v));
  }
  return sp.toString();
}

async function get<T = any>(path: string, params?: Record<string, any>): Promise<T> {
  const url = `${BASE}${path}?${qs(params)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return res.json() as Promise<T>;
}

export const tmdb = {
  genres: (type: 'movie' | 'tv') =>
    get<{ genres: { id: number; name: string }[] }>(`/genre/${type}/list`),

  discover: <T = any>(type: 'movie' | 'tv', params: Record<string, any>) =>
    get<T>(`/discover/${type}`, params),

  movie: (id: number) =>
    get(`/movie/${id}`, { append_to_response: 'videos,credits,recommendations' }),

  tv: (id: number) =>
    get(`/tv/${id}`, { append_to_response: 'videos,credits,recommendations' }),

  // ⬇⬇⬇ NOVO: trending (day/week)
  trending: (type: 'movie' | 'tv' = 'movie', window: 'day' | 'week' = 'week') =>
    get<{ page: number; results: any[] }>(`/trending/${type}/${window}`),
};
