import { Section } from '../components/Section'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Link } from 'react-router-dom'

export function Movies(){
  const items = [1,2,3]
  return (
    <>
      <Section title="Discover your next great watch" subtitle="Browse endless movies and TV shows." right={<div style={{display:'flex', gap:8}}><Button variant="primary">Browse</Button><Button>Filter</Button></div>} />
      <section className="section">
        <div className="container grid grid-3">
          {items.map(i=>(
            <Card key={i}>
              <div style={{height:160, background:'#e5e7eb', borderRadius:12, marginBottom:10}} />
              <div className="h3">Movie {i}</div>
              <div className="muted">Science fiction, thriller</div>
              <div style={{marginTop:8}}><Link to={`/movies/${i}`} className="btn">View</Link></div>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}
