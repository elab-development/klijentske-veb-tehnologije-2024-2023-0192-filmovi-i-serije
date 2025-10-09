import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { tmdb } from '../services/tmdb';

type Genre = { id: number; name: string };

export function Genres() {
  const { type = 'movie' } = useParams<{ type?: 'movie' | 'tv' }>();
  const navigate = useNavigate();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    tmdb.genres(type as 'movie' | 'tv')
      .then(r => setGenres(r.genres ?? []))
      .catch(e => setErr(e.message ?? 'Greška'))
      .finally(() => setLoading(false));
  }, [type]);

  if (loading) return <p>Učitavanje žanrova...</p>;
  if (err) return <p style={{color:'tomato'}}>{err}</p>;

  return (
    <section className="section">
      <div className="container" style={{display:'flex', alignItems:'center', gap:8}}>
        <h2 className="h2" style={{margin:0}}>Genres: {type}</h2>
        <div style={{marginLeft:'auto', display:'flex', gap:8}}>
          <button className="btn" disabled={type==='movie'} onClick={()=>navigate('/genres/movie')}>Movies</button>
          <button className="btn ghost" disabled={type==='tv'} onClick={()=>navigate('/genres/tv')}>TV</button>
        </div>
      </div>

      <div className="grid-3" style={{gap:12, marginTop:12}}>
        {genres.map(g => (
          <Link key={g.id} to={`/discover/${type}?with_genres=${g.id}`} className="card" style={{padding:14, textDecoration:'none'}}>
            <strong>{g.name}</strong> <span className="badge">View</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
