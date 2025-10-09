import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { tmdb } from '../services/tmdb';

type Paginated<T> = { page: number; total_pages: number; results: T[] };
type Item = { id: number; title?: string; name?: string; vote_average?: number };

export function Discover() {
  const { type = 'movie' } = useParams<{ type?: 'movie' | 'tv' }>();
  const [sp, setSp] = useSearchParams();
  const [data, setData] = useState<Paginated<Item> | null>(null);

  const page = Number(sp.get('page') ?? '1');

  useEffect(() => {
    const params: Record<string, string> = Object.fromEntries(sp.entries());
    if (!params.page) params.page = '1';
    tmdb.discover<Paginated<Item>>(type as 'movie'|'tv', params).then(setData);
  }, [type, sp.toString()]);

  if (!data) return <p>Učitavanje...</p>;

  const go = (p: number) => {
    const next = Object.fromEntries(sp.entries());
    next.page = String(p);
    setSp(next);
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="h2">Discover: {type}</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px,1fr))', gap:12}}>
          {data.results.map(m => (
            <div key={m.id} className="card" style={{padding:10}}>
              <div style={{fontWeight:600}}>{m.title ?? m.name}</div>
              <div className="muted" style={{fontSize:12}}>Ocena: {m.vote_average}</div>
            </div>
          ))}
        </div>
        <div style={{display:'flex', gap:8, marginTop:12}}>
          <button className="btn" disabled={page<=1} onClick={()=>go(page-1)}>Prev</button>
          <button className="btn" disabled={page>=data.total_pages} onClick={()=>go(page+1)}>Next</button>
        </div>
      </div>
    </section>
  );
}
