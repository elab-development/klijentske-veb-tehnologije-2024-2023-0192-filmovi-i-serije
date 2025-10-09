import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

export function NavBar(){
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900 && open) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [open])

  return (
    <header className="site-header">
      <div className="container navbar">
        <Link to="/" className="navbar-brand h3">MovieMate</Link>

        <nav className="desktop-only" style={{display:'flex', gap:16, marginLeft:16}}>
          <NavLink to="/movies">Movies and Shows</NavLink>
          <NavLink to="/genres/movie">Genres</NavLink>
          <NavLink to="/discover/movie?page=1">Discover</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/watchlist">Watchlist</NavLink>
        </nav>

        <div className="navbar-spacer" />

        <div className="desktop-only" style={{display:'flex', gap:8}}>
          <Link to="/login" className="btn">Login</Link>
          <Link to="/signup" className="btn danger">Sign up</Link>
        </div>

        <button className="burger mobile-only"
          aria-label="Open menu" aria-controls="mobile-menu"
          aria-expanded={open} onClick={() => setOpen(true)}>
          <span className="burger-lines" />
        </button>
      </div>

      {open && (
        <>
          <div className="mobile-backdrop" onClick={() => setOpen(false)} />
          <aside id="mobile-menu" className="mobile-drawer" role="dialog" aria-modal="true">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
              <span className="h3">Menu</span>
              <button className="btn" onClick={() => setOpen(false)}>Close</button>
            </div>
            <NavLink to="/movies" className="mobile-link" onClick={() => setOpen(false)}>Movies and Shows</NavLink>
            <NavLink to="/profile" className="mobile-link" onClick={() => setOpen(false)}>Profile</NavLink>
            <NavLink to="/genres/movie" className="mobile-link" onClick={() => setOpen(false)}>Genres</NavLink>
            <NavLink to="/discover/movie?page=1" className="mobile-link" onClick={() => setOpen(false)}>Discover</NavLink>
            <NavLink to="/watchlist" className="mobile-link" onClick={() => setOpen(false)}>Watchlist</NavLink>
            <div style={{height:1, background:'var(--border)', margin:'8px 0'}}/>
            <Link to="/login" className="mobile-link" onClick={() => setOpen(false)}>Login</Link>
            <Link to="/signup" className="mobile-link" onClick={() => setOpen(false)}>Sign up</Link>
          </aside>
        </>
      )}
    </header>
  )
}
