import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'center' }}>
        <nav aria-label="Footer main" style={{ display: 'flex', gap: 24 }}>
          <Link to="/movies">Movies and Shows</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/watchlist">Watchlist</Link>
        </nav>

        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />

        <nav aria-label="Footer legal" style={{ display: 'flex', gap: 24 }}>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms of use</Link>
          <Link to="/cookies">Cookies</Link>
        </nav>
      </div>

      <div className="container" style={{ marginTop: 16, color: 'var(--muted)', display: 'flex', justifyContent: 'center' }}>
        <span>© 2025 MovieMate. All rights reserved.</span>
      </div>
    </footer>
  )
}
