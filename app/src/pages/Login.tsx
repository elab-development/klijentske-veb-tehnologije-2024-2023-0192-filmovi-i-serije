import loginPicture from '../assets/login.jpg'

export function Login() {
  return (
    <>
      <section className="section" style={{ background: '#fff', color: '#111' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="muted" style={{ color: '#666' }}>Track</p>
          <h1 className="h1" style={{ color: '#111' }}>MovieMate</h1>
          <p>Your gateway to cinematic stories and television adventures</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 14 }}>
            <button className="btn primary">Login</button>
            <button className="btn" style={{ background: '#fff', color: '#000', borderColor: '#ccc' }}>
              Sign up
            </button>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-1)' }}>
        <div className="container" style={{ display: 'grid', gap: 18, placeItems: 'center' }}>
          <h2 className="h1">Enter your world of entertainment</h2>
          <p>
            Access your personal movie and TV show tracking dashboard. Discover, rate, and remember every story that moves you.
          </p>

          <div style={{ width: 'min(740px,100%)', marginTop: 10 }}>
            <label className="label">Email</label>
            <input className="input" placeholder="you@example.com" />
            <label className="label">Password</label>
            <input className="input" type="password" placeholder="••••••••" />
            <div className="form-actions">
              <button className="btn primary">Login</button>
              <button className="btn ghost">Forgot password</button>
            </div>
          </div>

          <div style={{ marginTop: 40 }}>
            <img
              src={loginPicture}
              alt="Decorative movie scene"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: 'var(--radius-md)',
              }}
            />
          </div>
        </div>

      </section>
    </>
  )
}
