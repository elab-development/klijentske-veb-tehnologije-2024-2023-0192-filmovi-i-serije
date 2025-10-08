import { Section } from '../components/Section'
import { Button } from '../components/Button'

export function Profile(){
  return (
    <>
      <section className="section" style={{background:'#fff', color:'#111'}}>
        <div className="container">
          <div className="muted">Profile</div>
          <div className="h1" style={{color:'#111'}}>Your movie journey</div>
          <p className="muted" style={{color:'#444'}}>Track every film and show you've watched.</p>

          <div style={{display:'grid', gridTemplateColumns:'280px 1fr', gap:20, marginTop:20}}>
            <div className="card"><div style={{aspectRatio:'1/1', background:'#ddd', borderRadius:'var(--radius-md)'}}/></div>
            <div>
              <div className="badge">@aleksi</div>
              <div className="h2" style={{marginTop:8, color:'#111'}}>Alex Johnson</div>
              <p className="muted" style={{color:'#444'}}>Movie lover | Exploring one film at a time</p>
              <div style={{display:'flex', gap:8}}>
                <Button variant="primary">Edit</Button>
                <Button>Settings</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section title="Movies and shows you want to watch" subtitle="Your curated collection." dark right={<div style={{display:'flex', gap:8}}><Button>View</Button><Button>Add</Button></div>} />

      <Section title="Recently watched" subtitle="Your cinematic journey" />

      <Section title="Profile preferences" subtitle="Customize your experience" dark />
    </>
  )
}
