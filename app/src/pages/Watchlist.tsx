import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { tmdb } from '../services/tmdb';
import { useWatchlist } from '../state/WatchlistContext';

type Item = {
  id: number;
  title: string;
  kind: 'movie' | 'tv';
  year?: string;
  rating?: number;
};

export function Watchlist() {
  const { state, dispatch } = useWatchlist(); // { movies: number[], tv: number[] }
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // filteri (zadržali smo tvoj UI ali bez statusa – jer status ne čuvamo u global state-u)
  const [category, setCategory] = useState<'all' | 'movie' | 'tv'>('all');
  const [query, setQuery] = useState('');

  const [items, setItems] = useState<Item[]>([]);

  // dovuci detalje za sve ID-jeve iz watchliste
  useEffect(() => {
    let cancel = false;
    setLoading(true);
    setErr(null);

    async function load() {
      try {
        // fetch filmova paralelno
        const moviePromises = state.movies.map(async (id) => {
          const d: any = await tmdb.movie(id);
          return {
            id,
            title: d.title,
            year: (d.release_date || '').slice(0, 4),
            rating: d.vote_average,
            kind: 'movie' as const,
          };
        });

        // fetch serija paralelno
        const tvPromises = state.tv.map(async (id) => {
          const d: any = await tmdb.tv(id);
          return {
            id,
            title: d.name,
            year: (d.first_air_date || '').slice(0, 4),
            rating: d.vote_average,
            kind: 'tv' as const,
          };
        });

        const all = await Promise.all([...moviePromises, ...tvPromises]);
        if (cancel) return;

        // dedupe po id+kind (sigurnosti radi)
        const uniq = Array.from(
          new Map(all.map((x) => [`${x.kind}:${x.id}`, x])).values()
        );

        setItems(uniq);
      } catch (e: any) {
        if (!cancel) setErr(e?.message ?? 'Failed to load watchlist data.');
      } finally {
        if (!cancel) setLoading(false);
      }
    }

    load();
    return () => {
      cancel = true;
    };
  }, [state.movies.join(','), state.tv.join(',')]); // re-fetch kad se watchlist promeni

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      const catOk = category === 'all' || it.kind === category;
      const qOk = q === '' || it.title.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [items, category, query]);

  return (
    <>
      <section className="section" style={{ background: '#fff', color: '#111' }}>
        <div className="container">
          <p className="muted" style={{ color: '#666' }}>Track</p>
          <h1 className="h1" style={{ color: '#111' }}>Your watchlist</h1>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 16, flexWrap: 'wrap' }}>
            <select
              className="input"
              style={{ maxWidth: 220 }}
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
            >
              <option value="all">All categories</option>
              <option value="movie">Movies</option>
              <option value="tv">TV shows</option>
            </select>

            <input
              className="input"
              style={{ maxWidth: 320 }}
              placeholder="Search title…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <button
              className="btn primary"
              onClick={() => {
                setCategory('all');
                setQuery('');
              }}
            >
              Clear
            </button>
          </div>

          {err && <p style={{ color: 'tomato', marginTop: 12 }}>{err}</p>}
        </div>
      </section>

      <section className="section" style={{ background: '#fff', color: '#111' }}>
        <div className="container">
          <p className="muted" style={{ color: '#666' }}>Saved</p>
          <h2 className="h1" style={{ color: '#111' }}>Titles you added</h2>

          {loading ? (
            <p style={{ marginTop: 12 }}>Loading…</p>
          ) : filtered.length === 0 ? (
            <div className="card" style={{ padding: 20, marginTop: 12 }}>
              <div className="h3" style={{ color: '#666' }}>
                Your watchlist is empty for this view.
              </div>
              <p className="muted" style={{ marginTop: 6 }}>
                Browse titles and click <strong>Add to Watchlist</strong> on a movie or TV show.
              </p>
            </div>
          ) : (
            <div className="grid-3" style={{ marginTop: 18 }}>
              {filtered.map((i) => (
                <div key={`${i.kind}:${i.id}`} className="card" style={{ padding: 16 }}>
                  <div className="badge" style={{ marginBottom: 8 }}>{i.kind.toUpperCase()}</div>
                  <div className="h3" style={{ color: '#fff' }}>{i.title}</div>
                  <p className="muted">
                    {i.year ? i.year : '—'} {i.rating ? ` • ★ ${i.rating.toFixed(1)}` : ''}
                  </p>
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <Link
                      to={`/${i.kind === 'movie' ? 'movie' : 'tv'}/${i.id}`}
                      className="btn ghost"
                    >
                      Details
                    </Link>
                    <button
                      className="btn ghost"
                      onClick={() =>
                        dispatch({
                          type: 'remove',
                          kind: i.kind === 'movie' ? 'movies' : 'tv',
                          id: i.id,
                        })
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

