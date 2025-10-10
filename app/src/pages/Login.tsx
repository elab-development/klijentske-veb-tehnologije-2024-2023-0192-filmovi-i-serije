// app/src/pages/Login.tsx
import { type FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';
import loginPicture from '../assets/login.jpg';

export function Login() {
  const { signIn } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      setErr(null);
      signIn(email.trim(), password);
      nav('/profile');
    } catch (e: any) {
      setErr(e?.message || 'Login failed');
    }
  }

  return (
    <>
      <section className="section" style={{ background: '#fff', color: '#111' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="muted" style={{ color: '#666' }}>Track</p>
          <h1 className="h1" style={{ color: '#111' }}>MovieMate</h1>
          <p>Your gateway to cinematic stories and television adventures</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 14 }}>
            <button
              className="btn primary"
              onClick={() => (document.getElementById('login-form') as HTMLFormElement | null)?.requestSubmit()}
            >
              Login
            </button>
            <button
              className="btn"
              style={{ background: '#fff', color: '#000', borderColor: '#ccc' }}
              onClick={() => nav('/signup')}
            >
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

          <form
            id="login-form"
            onSubmit={onSubmit}
            style={{ width: 'min(740px,100%)', marginTop: 10, display: 'grid', gap: 8 }}
          >
            {err && (
              <div style={{ color: '#b00020', marginBottom: 8 }}>
                {err}
              </div>
            )}
            <label className="label">Email</label>
            <input
              className="input"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <div className="form-actions">
              <button className="btn primary" type="submit">Login</button>
              <Link to="/forgot" className="btn ghost">Forgot password</Link>
            </div>
          </form>

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
  );
}
