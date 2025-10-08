import { useState } from 'react'

export function Register() {
  const [open, setOpen] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpen(open === index ? null : index)
  }

  const faqs = [
    {
      q: 'How do I reset my password?',
      a: "Click the 'forgot password' link on the login page. You'll receive an email with reset instructions.",
    },
    {
      q: 'Is my data secure?',
      a: 'We use advanced encryption to protect your personal information and viewing preferences.',
    },
    {
      q: 'Can I change my username?',
      a: 'Yes, you can update your profile settings after logging into your account.',
    },
    {
      q: 'Do I need a credit card?',
      a: 'No, registration is completely free. Create an account and start tracking movies instantly.',
    },
    {
      q: 'How do recommendations work?',
      a: 'Our algorithm analyzes your ratings and viewing history to suggest personalized content.',
    },
  ]

  return (
    <>
      <section className="section" style={{ background: '#fff', color: '#111' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <p className="muted" style={{ color: '#666' }}>Start</p>
          <h1 className="h1" style={{ color: '#111' }}>Create your account</h1>

          <label className="label">Name</label>
          <input className="input" placeholder="Your name" />
          <label className="label">Email</label>
          <input className="input" placeholder="you@example.com" />
          <label className="label">Password</label>
          <input className="input" type="password" placeholder="••••••••" />

          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
            <input className="checkbox" id="tac" type="checkbox" />
            <label htmlFor="tac" className="muted" style={{ color: '#555' }}>
              I accept the terms and conditions
            </label>
          </div>

          <div className="form-actions">
            <button className="btn primary">Register</button>
          </div>
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
  )
}
