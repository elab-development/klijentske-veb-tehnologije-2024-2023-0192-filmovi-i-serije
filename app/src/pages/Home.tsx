import { Section } from '../components/Section'
import { Button } from '../components/Button'

export function Home(){
  return (
    <>
      <section className="section" style={{background:'var(--bg-0)'}}>
        <div className="container">
          <div className="h1" style={{maxWidth:760}}>Track every movie and show you love</div>
          <p className="muted" style={{maxWidth:560, margin:'8px 0 20px'}}>
            Discover, rate, and manage your watchlist with one powerful app.
          </p>
          <div style={{display:'flex', gap:12}}>
            <Button variant="primary">Get started</Button>
            <Button>Learn more</Button>
          </div>
        </div>
      </section>

      <Section title="Powerful tools for your entertainment discovery" subtitle="Filter, sort and find exactly what you want." dark />

      <section className="section">
        <div className="container grid grid-3">
          <div className="card" style={{padding:24}}>
            <div className="h3">Rate and review</div>
            <p className="muted">Share thoughts and see what others recommend.</p>
          </div>
          <div className="card" style={{padding:24}}>
            <div className="h3">Manage your watchlist</div>
            <p className="muted">Keep track of what you want to watch next.</p>
          </div>
          <div className="card" style={{padding:24}}>
            <div className="h3">Personalized picks</div>
            <p className="muted">Discover new titles based on your history.</p>
          </div>
        </div>
      </section>
    </>
  )
}
