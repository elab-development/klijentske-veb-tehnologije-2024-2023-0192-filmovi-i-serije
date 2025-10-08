import { Outlet, Link } from 'react-router-dom'

export function Layout() {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: 12, borderBottom: '1px solid #ccc' }}>
        <nav style={{ display: 'flex', gap: 10 }}>
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/watchlist">Watchlist</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Register</Link>
        </nav>
      </header>
      <main style={{ flex: 1, padding: 16 }}>
        <Outlet />
      </main>
      <footer style={{ padding: 12, borderTop: '1px solid #ccc', fontSize: 12 }}>
        © 2025 MovieMate
      </footer>
    </div>
  )
}
