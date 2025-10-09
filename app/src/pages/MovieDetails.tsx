import { Link } from 'react-router-dom'
import movieImg from '../assets/movie-single-2.jpg'


type CastMember = { id: number; name: string; role: string }

const MOCK = {
  title: 'Inception',
  tagline: 'A mind-bending journey through dreams and reality…',
  genres: ['Sci-fi', 'Thriller', 'Drama'],
  duration: '148 minutes',
  director: 'Christopher Nolan',
  cast: [
    { id: 1, name: 'Leonardo DiCaprio', role: 'Cobb' },
    { id: 2, name: 'Joseph Gordon-Levitt', role: 'Arthur' },
    { id: 3, name: 'Ellen Page', role: 'Ariadne' },
    { id: 4, name: 'Tom Hardy', role: 'Eames' },
  ] as CastMember[],
}

export function MovieDetails() {

  return (
    <>
      <section className="section" style={{ background: '#fff', color: '#111' }}>
        <div className="container">
          <h1 className="h1" style={{ color: '#111' }}>{MOCK.title}</h1>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '10px 0 8px' }}>
            {MOCK.genres.map(g => (
              <span key={g} className="badge" style={{ background: '#eef2ff', color: '#1e293b', border: 'none' }}>
                {g}
              </span>
            ))}
          </div>

          <p className="muted" style={{ color: '#666', marginTop: 6 }}>{MOCK.tagline}</p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-0)' }}>
        <div className="container grid-3">
          <div className="card" style={{ gridColumn: 'span 2' }}>
            <p className="muted">Dream</p>
            <h2 className="h1" style={{ margin: '6px 0 10px' }}>A journey into the subconscious</h2>
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <button className="btn primary">Watch</button>
              <button className="btn ghost">Trailer</button>
            </div>
          </div>

          <div className="card" style={{ aspectRatio: '4/5', overflow: 'hidden' }}>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h3 className="h2">More information about the film</h3>

          <div className="grid-3" style={{ marginTop: 12 }}>
            <div className="card">
              <div className="muted">Genre</div>
              <div>{MOCK.genres.join(', ')}</div>
            </div>
            <div className="card">
              <div className="muted">Duration</div>
              <div>{MOCK.duration}</div>
            </div>
            <div className="card">
              <div className="muted">Director</div>
              <div>{MOCK.director}</div>
            </div>

            <div className="card" style={{ gridColumn: '1 / -1' }}>
              <div className="muted">Cast</div>
              <ul style={{ marginTop: 8, paddingLeft: 18 }}>
                {MOCK.cast.map(m => (
                  <li key={m.id} style={{ margin: '4px 0' }}>
                    <strong>{m.name}</strong> — <span className="muted">{m.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#fff', color: '#111' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 24, alignItems: 'center' }}>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <img src={movieImg} alt="People reviewing a movie"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

          </div>
          <div>
            <p className="muted" style={{ color: '#666' }}>Rate</p>
            <h2 className="h2" style={{ color: '#111' }}>Share your thoughts</h2>
            <p className="muted" style={{ marginTop: 8 }}>
              Users can rate and review this film. Your opinion matters and helps others discover great content.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <Link to="/profile" className="btn" style={{color: 'black'}}>Review</Link>
              <Link to="/profile" className="btn ghost" style={{color: 'black'}}>Rate</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-0)' }}>
        <div className="container">
          <p className="muted">Save</p>
          <h2 className="h1">Add to your watchlist</h2>
          <p className="muted" style={{ marginTop: 8 }}>
            Keep track of movies you want to watch. Never miss a great film again.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
            <button className="btn">Add</button>
            <Link to="/watchlist" className="btn ghost">Watchlist</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <h3 className="h2">More like this</h3>
          <div className="grid-3" style={{ marginTop: 12 }}>
            <div className="card" style={{ aspectRatio: '3/2' }} />
            <div className="card" style={{ aspectRatio: '3/2' }} />
            <div className="card" style={{ aspectRatio: '3/2' }} />
          </div>
        </div>
      </section>
    </>
  )
}
