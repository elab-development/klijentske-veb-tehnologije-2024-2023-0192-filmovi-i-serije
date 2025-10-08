import { Link } from 'react-router-dom'
import logo from '../assets/MovieMate - logoTransparent.png'


export function NavBar() {
  return (
    <header className="site-header">
      <div className="container navbar">
        <Link to="/" className="navbar-brand h3" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={logo} alt="MovieMate logo" style={{ height: 128, width: 'auto' }} />
         
        </Link>


        <nav style={{ display: 'flex', gap: 16 }}>
          <Link to="/movies">Movies and Shows</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/watchlist">Watchlist</Link>
        </nav>

        <div className="navbar-spacer" />
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to="/login" className="btn ghost">Login</Link>
          <Link to="/signup" className="btn danger">Sign up</Link>
        </div>
      </div>
    </header>
  )
}
