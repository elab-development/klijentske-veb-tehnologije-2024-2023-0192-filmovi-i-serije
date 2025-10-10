import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { tmdb } from '../services/tmdb';
import { useWatchlist } from '../state/WatchlistContext';

export function MovieDetails() {
  const { id = '' } = useParams();
  const [data, setData] = useState<any>(null);
  const { state, dispatch } = useWatchlist();
  const nid = Number(id) || 0;
  const inWL = state.movies.includes(nid);

  useEffect(() => { if (nid) tmdb.movie(nid).then(setData); }, [nid]);
  if (!data) return <p>Učitavanje...</p>;

  return (
    <section className="section"><div className="container">
      <h2 className="h2">{data.title}</h2>
      <p className="muted">{data.overview}</p>
      <button className="btn" onClick={() => dispatch({ type: inWL ? 'remove' : 'add', kind: 'movies', id: nid })}>
        {inWL ? 'Remove from Watchlist' : 'Add to Watchlist'}
      </button>

<h3>Videos</h3>
<div style={{ display: 'grid', gap: 16, marginTop: 8 }}>
  {data.videos?.results
    ?.filter((v: any) => v.site === 'YouTube')
    .slice(0, 3) // prikaži do 3
    .map((v: any) => (
      <div key={v.id}>
        <p style={{ fontWeight: 500 }}>{v.name}</p>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${v.key}`}
          title={v.name}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    ))}
</div>


      <h3>Cast</h3>
      <ul>{data.credits?.cast?.slice(0,10).map((c:any)=><li key={c.cast_id || c.credit_id}>{c.name}</li>)}</ul>

      <h3>Recommendations</h3>
      <ul>{data.recommendations?.results?.slice(0,6).map((r:any)=><li key={r.id}>{r.title}</li>)}</ul>
    </div></section>
  );
}
