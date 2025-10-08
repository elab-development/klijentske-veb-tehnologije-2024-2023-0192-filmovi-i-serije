// import { Section } from '../components/Section'
// import { Button } from '../components/Button'
// import { Card } from '../components/Card'
// import { Link } from 'react-router-dom'

// export function Movies(){
//   const items = [1,2,3]
//   return (
//     <>
//       <Section title="Discover your next great watch" subtitle="Browse endless movies and TV shows." right={<div style={{display:'flex', gap:8}}><Button variant="primary">Browse</Button><Button>Filter</Button></div>} />
//       <section className="section">
//         <div className="container grid grid-3">
//           {items.map(i=>(
//             <Card key={i}>
//               <div style={{height:160, background:'#e5e7eb', borderRadius:12, marginBottom:10}} />
//               <div className="h3">Movie {i}</div>
//               <div className="muted">Science fiction, thriller</div>
//               <div style={{marginTop:8}}><Link to={`/movies/${i}`} className="btn">View</Link></div>
//             </Card>
//           ))}
//         </div>
//       </section>
//     </>
//   )
// }

import { Link } from 'react-router-dom'

export function Movies(){
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1" style={{marginBottom:20}}>Discover your next great watch</h1>

        <div style={{display:'flex',gap:10,marginBottom:20}}>
          <button className="btn primary">Browse</button>
          <button className="btn ghost">Filter</button>
        </div>

        <div className="grid-3" style={{marginTop:10}}>
          {[1,2,3,4,5,6].map(i=>(
            <Link to={`/movies/${i}`} key={i} className="card" style={{aspectRatio:'3/4'}}>
              <div className="muted">Movie {i}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
