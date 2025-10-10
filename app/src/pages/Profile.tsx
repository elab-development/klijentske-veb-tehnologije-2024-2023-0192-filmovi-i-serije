import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';
import { useWatchlist } from '../state/WatchlistContext';
import { tmdb } from '../services/tmdb';

type MiniItem = { id: number; kind: 'movie' | 'tv'; title: string; year?: string; genres?: string[] };

export function Profile(){
  const { user, isAuthenticated, updateProfile, signOut } = useAuth();
  const { state } = useWatchlist(); // { movies:number[], tv:number[], ratings: RatingMap }

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(user?.name ?? '');
  const [surname, setSurname] = useState(user?.surname ?? '');

  useEffect(() => {
    if (user) { setName(user.name); setSurname(user.surname); }
  }, [user?.id]);

  const username = useMemo(() => {
    const mail = user?.email ?? 'guest@example.com';
    return '@' + (mail.split('@')[0] || 'user');
  }, [user?.email]);

  // Recently "watched": poslednje 3 iz watchlist-a
  const [recent, setRecent] = useState<MiniItem[]>([]);
  useEffect(() => {
    let cancel = false;
    async function run(){
      const pick = [
        ...state.movies.slice(0, 3).map(id => ({ kind:'movie' as const, id })),
        ...state.tv.slice(0, 3).map(id => ({ kind:'tv' as const, id })),
      ].slice(0,3);
      const items = await Promise.all(pick.map(async (x) => {
        const d = x.kind === 'movie' ? await tmdb.movie(x.id) : await tmdb.tv(x.id);
        return {
          id: x.id,
          kind: x.kind,
          title: (d.title || d.name || 'Untitled') as string,
          year: ((d.release_date || d.first_air_date || '') as string).slice(0,4),
          genres: Array.isArray(d.genres) ? d.genres.map((g:any)=>g.name) : [],
        } as MiniItem;
      }));
      if (!cancel) setRecent(items);
    }
    run();
    return () => { cancel = true; };
  }, [state.movies, state.tv]);

  // Ratings list: koristi RatingMap.list()
  const [rated, setRated] = useState<Array<MiniItem & { score: number }>>([]);
  useEffect(() => {
    let cancel = false;
    async function run(){
      const entries = state.ratings.list(); // [{kind,id,value}]
      const first = entries.slice(0, 6);
      const out: Array<MiniItem & { score:number }> = [];
      for (const r of first) {
        const d = r.kind === 'movie' ? await tmdb.movie(r.id) : await tmdb.tv(r.id);
        out.push({
          id: r.id,
          kind: r.kind,
          title: (d.title || d.name || 'Untitled') as string,
          year: ((d.release_date || d.first_air_date || '') as string).slice(0,4),
          genres: Array.isArray(d.genres) ? d.genres.map((g:any)=>g.name) : [],
          score: Number(r.value),
        });
      }
      if (!cancel) setRated(out);
    }
    run();
    return () => { cancel = true; };
  }, [state.ratings]);

  if (!isAuthenticated) {
    return (
      <>
        <section className="section" style={{background:'#fff',color:'#111'}}>
          <div className="container">
            <p className="muted" style={{color:'#666'}}>Profile</p>
            <h1 className="h1" style={{color:'#111'}}>You are not logged in</h1>
            <p className="muted" style={{color:'#666',marginTop:6}}>Login or create an account to view your profile.</p>
            <div style={{display:'flex',gap:10,marginTop:12}}>
              <Link className="btn primary" to="/login">Login</Link>
              <Link className="btn" to="/signup" style={{color: 'black'}}>Sign up</Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="section" style={{background:'#fff',color:'#111'}}>
        <div className="container">
          <p className="muted" style={{color:'#666'}}>Profile</p>
          <h1 className="h1" style={{color:'#111'}}>Your movie journey</h1>
          <p className="muted" style={{color:'#666',marginTop:6}}>
            Track every film and show you’ve watched. Your personal cinema library, always ready.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card" style={{padding:24}}>
            <div className="badge">{username}</div>

            {!edit ? (
              <>
                <h3 className="h2" style={{marginTop:10}}>
                  {user!.name} {user!.surname}
                </h3>
                <p className="muted" style={{marginTop:6}}>{user!.email}</p>
                <div style={{display:'flex',gap:10,marginTop:12}}>
                  <button className="btn ghost" onClick={()=>setEdit(true)}>Edit</button>
                  <Link className="btn ghost" to="/watchlist">My Watchlist</Link>
                  <button className="btn" onClick={signOut}>Sign out</button>
                </div>
              </>
            ) : (
              <>
                <div style={{display:'grid',gap:10,marginTop:10, maxWidth:420}}>
                  <label className="label">First name</label>
                  <input className="input" value={name} onChange={e=>setName(e.target.value)} />

                  <label className="label">Last name</label>
                  <input className="input" value={surname} onChange={e=>setSurname(e.target.value)} />
                </div>
                <div style={{display:'flex',gap:10,marginTop:12}}>
                  <button className="btn primary" onClick={()=>{ updateProfile({ name: name.trim(), surname: surname.trim() }); setEdit(false); }}>
                    Save
                  </button>
                  <button className="btn ghost" onClick={()=>{ setName(user!.name); setSurname(user!.surname); setEdit(false); }}>
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="section" style={{background:'#fff',color:'#111'}}>
        <div className="container">
          <h3 className="h2" style={{color:'#111'}}>Recently watched</h3>
          <div className="grid-3" style={{marginTop:12}}>
            {recent.length === 0 && (
              <div className="muted">No items yet. Add titles to your watchlist.</div>
            )}
            {recent.map(it=>(
              <div key={`${it.kind}:${it.id}`} className="card" style={{padding:16}}>
                <div className="h3" style={{color:'#ffffffff'}}>{it.title}</div>
                <p className="muted">
                  {it.year || '—'} {it.genres?.length ? `• ${it.genres.slice(0,2).join(', ')}` : ''}
                </p>
                <div style={{display:'flex',gap:8,marginTop:10}}>
                  <Link className="btn" to={it.kind === 'movie' ? `/movie/${it.id}` : `/tv/${it.id}`}>Details</Link>
                  <Link className="btn" to={it.kind === 'movie' ? `/movie/${it.id}` : `/tv/${it.id}`}>Rate</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{background:'#fff',color:'#111'}}>
        <div className="container">
          <h3 className="h2" style={{color:'#111'}}>Your ratings</h3>

          <ul style={{listStyle:'none',padding:0,margin:'12px 0 0',display:'grid',gap:12}}>
            {rated.length === 0 && (
              <li className="muted">No ratings yet.</li>
            )}
            {rated.map(r => {
              const stars5 = Math.round((r.score/10)*5); // 1..5
              const stars = '★★★★★'.slice(0, stars5) + '☆☆☆☆☆'.slice(0, 5 - stars5);
              return (
                <li key={`${r.kind}:${r.id}`} className="card" style={{padding:16,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <strong style={{color:'#ffffffff'}}>{r.title}</strong>
                    <div className="muted">{r.year || '—'}</div>
                  </div>
                  <div aria-label={`rating ${stars5} of 5`} style={{fontSize:18, color:'#ffffffff'}}>
                    {stars}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section" style={{background:'var(--bg-0)',color:'#fff'}}>
        <div className="container" style={{textAlign:'center'}}>
          <p className="muted" style={{color:'var(--muted)'}}>Settings</p>
          <h2 className="h1" style={{color:'#fff'}}>Profile preferences</h2>
          <p className="muted" style={{marginTop:6}}>Customize your experience</p>

          <div className="grid-2" style={{marginTop:32,display:'grid',gap:20,gridTemplateColumns:'repeat(2,minmax(0,1fr))'}}>
            <div className="card" style={{textAlign:'left',padding:24,background:'var(--bg-1)',border:'1px solid var(--border)'}}>
              <p className="muted" style={{marginBottom:6}}>Personal</p>
              <div className="h3" style={{color:'#fff'}}>Update personal details</div>
              <p className="muted" style={{marginTop:4}}>Keep your profile current and accurate</p>
              <button className="btn" style={{marginTop:12}} onClick={()=>setEdit(true)}>Update →</button>
            </div>

            <div className="card" style={{textAlign:'left',padding:24,background:'var(--bg-1)',border:'1px solid var(--border)'}}>
              <p className="muted" style={{marginBottom:6}}>Security</p>
              <div className="h3" style={{color:'#fff'}}>Change password</div>
              <p className="muted" style={{marginTop:4}}>Protect your account with a strong password</p>
              <Link to="/forgot" className="btn" style={{marginTop:12}}>Reset →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{background:'var(--bg-0)',color:'#fff'}}>
        <div className="container" style={{textAlign:'center'}}>
          <h2 className="h1" style={{color:'#fff'}}>Discover your next favorite</h2>
          <p className="muted" style={{marginTop:6}}>
            Personalized recommendations based on your unique viewing history and ratings
          </p>
          <div style={{display:'flex',justifyContent:'center',gap:10,marginTop:20}}>
            <Link className="btn primary" to="/discover/movie?page=1">Explore</Link>
            <Link className="btn" to="/watchlist">Recommend</Link>
          </div>
        </div>
      </section>
    </>
  );
}