import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { tmdb } from '../services/tmdb';
import { useWatchlist } from '../state/WatchlistContext';

export function TvDetails() {
  const { id = '' } = useParams();
  const [data, setData] = useState<any>(null);
  const { state, dispatch } = useWatchlist();
  const nid = Number(id) || 0;
  const inWL = state.tv.includes(nid);

  useEffect(() => { if (nid) tmdb.tv(nid).then(setData); }, [nid]);
  if (!data) return <p>Učitavanje...</p>;

  return (
    <section className="section"><div className="container">
      <h2 className="h2">{data.name}</h2>
      <p className="muted">{data.overview}</p>
      <button className="btn" onClick={() => dispatch({ type: inWL ? 'remove' : 'add', kind: 'tv', id: nid })}>
        {inWL ? 'Remove from Watchlist' : 'Add to Watchlist'}
      </button>

      <h3>Videos</h3>
      <ul>{data.videos?.results?.map((v:any)=><li key={v.id}>{v.name}</li>)}</ul>

      <h3>Cast</h3>
      <ul>{data.credits?.cast?.slice(0,10).map((c:any)=><li key={c.cast_id || c.credit_id}>{c.name}</li>)}</ul>

      <h3>Recommendations</h3>
      <ul>{data.recommendations?.results?.slice(0,6).map((r:any)=><li key={r.id}>{r.name}</li>)}</ul>
    </div></section>
  );
}
