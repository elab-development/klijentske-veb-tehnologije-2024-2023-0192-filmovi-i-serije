import { Section } from '../components/Section'
import { Button } from '../components/Button'
import { Card } from '../components/Card'

export function Watchlist(){
  return (
    <>
      <section className="section" style={{background:'#fff', color:'#111'}}>
        <div className="container">
          <div className="muted">Track</div>
          <div className="h1" style={{color:'#111'}}>Your watchlist</div>
          <p className="muted" style={{color:'#444'}}>Organize and manage favorites.</p>
          <div style={{display:'flex', gap:8}}>
            <Button variant="primary">Browse</Button>
            <Button>Filter</Button>
          </div>
        </div>
      </section>

      <Section title="Currently watching" subtitle="Keep your progress updated" />

      <section className="section">
        <div className="container grid grid-3">
          <Card><div className="h3">Mark your viewing status</div><p className="muted">Track episodes and scenes.</p></Card>
          <Card><div className="h3">Titles you want to watch next</div><p className="muted">Plan your future watching.</p></Card>
          <Card><div className="h3">Completed titles</div><p className="muted">Review finished content.</p></Card>
        </div>
      </section>

      <Section title="Track your viewing milestones" subtitle="Celebrate achievements" dark />
    </>
  )
}