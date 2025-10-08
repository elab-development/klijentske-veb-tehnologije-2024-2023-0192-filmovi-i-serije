import { Link, useLocation } from 'react-router-dom'

export function NavBar(){
  const { pathname } = useLocation()
  return (
    <header style={{background:'var(--bg-0)', borderBottom:'1px solid #232826'}}>
      <div className="container" style={{display:'flex', alignItems:'center', gap:16, height:64}}>
        <Link to="/" className="h3" style={{color:'#fff'}}>MovieMate</Link>
        <nav style={{display:'flex', gap:16, marginLeft:16}}>
          <Link to="/movies">Movies and Shows</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/watchlist">Watchlist</Link>
        </nav>
        <div style={{marginLeft:'auto', display:'flex', gap:8}}>
          <Link to="/login" className="btn">Login</Link>
          <Link to="/signup" className="btn" style={{borderColor:'transparent', background:'#ef4444', color:'#fff'}}>Sign up</Link>
        </div>
        <span className="muted" style={{marginLeft:12, fontSize:12}}>{pathname}</span>
      </div>
    </header>
  )
}
