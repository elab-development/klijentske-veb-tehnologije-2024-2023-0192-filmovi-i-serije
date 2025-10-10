// app/src/pages/TvDetails.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { tmdb } from '../services/tmdb';
import { useWatchlist } from '../state/WatchlistContext';

export function TvDetails() {
  const { id = '' } = useParams();
  const nid = Number(id) || 0;

  const { has, getRating, rate, dispatch } = useWatchlist();
  const inWL = has('tv', nid);
  const curRating = getRating('tv', nid);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;
    async function run() {
      try {
        setLoading(true);
        setErr(null);
        const d = await tmdb.tv(nid);
        if (!cancel) setData(d);
      } catch (e: any) {
        if (!cancel) setErr(e?.message || 'Failed to load');
      } finally {
        if (!cancel) setLoading(false);
      }
    }
    if (nid) run();
    return () => { cancel = true; };
  }, [nid]);

  if (loading) return <div className="container" style={{padding:'24px 0'}}>Loading…</div>;
  if (err) return <div className="container" style={{padding:'24px 0', color:'#b00020'}}>{err}</div>;
  if (!data) return null;

  const ytVideos = data?.videos?.results?.filter((v: any) => v.site === 'YouTube')?.slice(0, 3) ?? [];
  const cast = data?.credits?.cast?.slice(0, 12) ?? [];

  return (
    <section className="section">
      <div className="container">
        <h2 className="h2">{data.name}</h2>
        <p className="muted">{data.overview}</p>

        <div style={{ display:'flex', gap:12, alignItems:'center', margin:'12px 0' }}>
          <button
            className="btn"
            onClick={() => dispatch({ type: inWL ? 'remove' : 'add', kind: 'tv', id: nid })}
          >
            {inWL ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </button>

          <select
            value={curRating ?? ''}
            onChange={e => {
              const v = Number(e.target.value);
              if (v) rate('tv', nid, v);
            }}
          >
            <option value="">Rate</option>
            {Array.from({ length: 10 }, (_, i) => i + 1).map(v => (
              <option key={v} value={v}>{v}/10</option>
            ))}
          </select>
          {curRating ? <span className="muted">Your rating: {curRating}/10</span> : null}
        </div>

        {ytVideos.length > 0 && (
          <>
            <h3>Videos</h3>
            <div style={{ display: 'grid', gap: 16, marginTop: 8 }}>
              {ytVideos.map((v: any) => (
                <div key={v.id}>
                  <p style={{ fontWeight: 500 }}>{v.name}</p>
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${v.key}`}
                    title={v.name}
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <h3 style={{ marginTop: 16 }}>Cast</h3>
        <ul>
          {cast.map((c: any) => (
            <li key={c.cast_id || c.credit_id || c.id}>{c.name}</li>
          ))}
        </ul>

        <h3 style={{ marginTop: 16 }}>Recommendations</h3>
        <ul>
          {data.recommendations?.results?.slice(0, 6).map((r: any) => (
            <li key={r.id}>{r.name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
