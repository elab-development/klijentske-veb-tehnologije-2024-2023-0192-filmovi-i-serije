import { useParams } from 'react-router-dom'
import { Button } from '../components/Button'
import { Section } from '../components/Section'

export function MovieDetails(){
  const { id } = useParams()
  return (
    <>
      <section className="section" style={{background:'#fff', color:'#111'}}>
        <div className="container">
          <div className="h1" style={{color:'#111'}}>Inception</div>
          <div style={{display:'flex', gap:8, margin:'8px 0'}}>
            <span className="badge">Sci-fi</span>
            <span className="badge">Thriller</span>
            <span className="badge">Drama</span>
          </div>
          <p className="muted" style={{color:'#444', maxWidth:700}}>
            A mind-bending journey through dreams and reality.
          </p>
        </div>
      </section>

      <section className="section" style={{background:'var(--bg-0)'}}>
        <div className="container grid" style={{gridTemplateColumns:'1fr 420px'}}>
          <div>
            <div className="h2">A journey into the subconscious</div>
            <p className="muted">Skilled thief enters people's dreams to steal secrets.</p>
            <div style={{display:'flex', gap:8}}>
              <Button variant="primary">Watch</Button>
              <Button>Trailer</Button>
            </div>
            <div style={{marginTop:20}}>
              <div className="h3">Details</div>
              <ul style={{color:'#d1d5db', lineHeight:1.8}}>
                <li>Duration: 148 min</li>
                <li>Director: Christopher Nolan</li>
                <li>Cast: DiCaprio, Gordon-Levitt, Page, Hardy</li>
              </ul>
            </div>
          </div>
          <div style={{height:300, background:'#1f2937', borderRadius:16}}/>
        </div>
      </section>

      <Section title="More like this" subtitle="Recommendations based on viewing history" />
      <div className="container section">
        <Button>Add to watchlist</Button> <span className="muted">ID: {id}</span>
      </div>
    </>
  )
}
