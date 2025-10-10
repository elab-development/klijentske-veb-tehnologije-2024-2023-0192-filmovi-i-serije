// app/src/components/NavBar.tsx
import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../state/AuthContext'

export function NavBar(){
  const [open, setOpen] = useState(false)
  const { isAuthenticated, signOut } = useAuth()

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900 && open) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [open])

  const link = (to: string, label: string) => (
    <NavLink
      to={to}
      className={({isActive}) => isActive ? 'active nav-link' : 'nav-link'}
    >
      {label}
    </NavLink>
  )

  return (
    <header className="site-header">
      <div className="container navbar">
        <Link to="/" className="navbar-brand h3">MovieMate</Link>

        <nav className="desktop-only" style={{display:'flex', gap:16, marginLeft:16}}>
          {link('/movies', 'Movies and Shows')}
          {link('/genres/movie', 'Genres')}
          {link('/discover/movie?page=1', 'Discover')}
          {link('/profile', 'Profile')}
          {link('/watchlist', 'Watchlist')}
        </nav>

        <div className="navbar-spacer" />

        <div className="desktop-only" style={{display:'flex', gap:8}}>
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="btn">Login</Link>
              <Link to="/signup" className="btn danger">Sign up</Link>
            </>
          ) : (
            <button className="btn" onClick={signOut}>Sign out</button>
          )}
        </div>

        <button
          className="burger mobile-only"
          aria-label="Open menu"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span className="burger-lines" />
        </button>
      </div>

      {open && (
        <>
          <div className="mobile-backdrop" onClick={() => setOpen(false)} />
          <aside id="mobile-menu" className="mobile-drawer" role="dialog" aria-modal="true" onClick={(e)=>e.stopPropagation()}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
              <span className="h3">Menu</span>
              <button className="btn" onClick={() => setOpen(false)}>Close</button>
            </div>

            {link('/movies', 'Movies and Shows')}
            {link('/profile', 'Profile')}
            {link('/genres/movie', 'Genres')}
            {link('/discover/movie?page=1', 'Discover')}
            {link('/watchlist', 'Watchlist')}

            <div style={{height:1, background:'var(--border)', margin:'8px 0'}}/>

            {!isAuthenticated ? (
              <>
                <Link to="/login" className="mobile-link" onClick={() => setOpen(false)}>Login</Link>
                <Link to="/signup" className="mobile-link" onClick={() => setOpen(false)}>Sign up</Link>
              </>
            ) : (
              <button
                className="mobile-link"
                onClick={() => { setOpen(false); signOut(); }}
              >
                Sign out
              </button>
            )}
          </aside>
        </>
      )}
    </header>
  )
}
