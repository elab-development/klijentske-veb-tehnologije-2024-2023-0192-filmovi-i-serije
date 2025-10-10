// app/src/pages/Register.tsx
import { type FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';

export function Register() {
  const { signUp } = useAuth();
  const nav = useNavigate();

  // accordion state (kept from your version)
  const [open, setOpen] = useState<number | null>(null);
  const toggle = (index: number) => setOpen(open === index ? null : index);

  // form state
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const faqs = [
    { q: 'How do I reset my password?', a: "Click the 'forgot password' link on the login page. You'll receive an email with reset instructions." },
    { q: 'Is my data secure?', a: 'We use advanced encryption to protect your personal information and viewing preferences.' },
    { q: 'Can I change my username?', a: 'Yes, you can update your profile settings after logging into your account.' },
    { q: 'Do I need a credit card?', a: 'No, registration is completely free. Create an account and start tracking movies instantly.' },
    { q: 'How do recommendations work?', a: 'Our algorithm analyzes your ratings and viewing history to suggest personalized content.' },
  ];

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!agree) { setErr('Please accept the terms and conditions'); return; }
    try {
      setErr(null);
      signUp({ name: name.trim(), surname: surname.trim(), email: email.trim(), password });
      nav('/profile');
    } catch (e: any) {
      setErr(e?.message || 'Registration failed');
    }
  }

  return (
    <>
      <section className="section" style={{ background: '#fff', color: '#111' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <p className="muted" style={{ color: '#666' }}>Start</p>
          <h1 className="h1" style={{ color: '#111' }}>Create your account</h1>

          {err && <div style={{ color: '#b00020', margin: '8px 0' }}>{err}</div>}

          <form onSubmit={onSubmit} style={{ display: 'grid', gap: 10, marginTop: 12 }}>
            <label className="label" style={{ color: 'black' }}>First name</label>
            <input className="input" placeholder="Your first name" value={name} onChange={e=>setName(e.target.value)} required />

            <label className="label" style={{ color: 'black' }}>Last name</label>
            <input className="input" placeholder="Your last name" value={surname} onChange={e=>setSurname(e.target.value)} required />

            <label className="label" style={{ color: 'black' }}>Email</label>
            <input className="input" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} required />

            <label className="label" style={{ color: 'black' }}>Password</label>
            <input className="input" type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} required />

            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
              <input className="checkbox" id="tac" type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} />
              <label htmlFor="tac" className="muted" style={{ color: '#555' }}>
                I accept the terms and conditions
              </label>
            </div>

            <div className="form-actions" style={{ display:'flex', gap:8, alignItems:'center' }}>
              <button className="btn primary" type="submit">Register</button>
              <span className="muted">Already have an account?</span>
              <Link to="/login" className="btn">Login</Link>
            </div>
          </form>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-1)' }}>
        <div className="container">
          <div className="h2">FAQs</div>
          <p className="muted" style={{ marginTop: 6 }}>
            Find answers to common questions about our movie tracking platform
          </p>

          <ul className="faq-list">
            {faqs.map((item, i) => (
              <li
                key={i}
                className={`faq-item ${open === i ? 'open' : ''}`}
                onClick={() => toggle(i)}
              >
                <div>
                  <div className="faq-q">{item.q}</div>
                  {open === i && <div className="faq-a">{item.a}</div>}
                </div>
                <span className="faq-icon">{open === i ? '−' : '+'}</span>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 28 }}>
            <div className="h3">Need more help?</div>
            <p className="muted">Our support team is ready to assist you</p>
            <button className="btn">Contact</button>
          </div>
        </div>
      </section>
    </>
  );
}
