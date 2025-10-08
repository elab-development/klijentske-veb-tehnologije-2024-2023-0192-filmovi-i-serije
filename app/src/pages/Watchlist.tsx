// import { Section } from '../components/Section'
// import { Button } from '../components/Button'
// import { Card } from '../components/Card'

// export function Watchlist(){
//   return (
//     <>
//       <section className="section" style={{background:'#fff', color:'#111'}}>
//         <div className="container">
//           <div className="muted">Track</div>
//           <div className="h1" style={{color:'#111'}}>Your watchlist</div>
//           <p className="muted" style={{color:'#444'}}>Organize and manage favorites.</p>
//           <div style={{display:'flex', gap:8}}>
//             <Button variant="primary">Browse</Button>
//             <Button>Filter</Button>
//           </div>
//         </div>
//       </section>

//       <Section title="Currently watching" subtitle="Keep your progress updated" />

//       <section className="section">
//         <div className="container grid grid-3">
//           <Card><div className="h3">Mark your viewing status</div><p className="muted">Track episodes and scenes.</p></Card>
//           <Card><div className="h3">Titles you want to watch next</div><p className="muted">Plan your future watching.</p></Card>
//           <Card><div className="h3">Completed titles</div><p className="muted">Review finished content.</p></Card>
//         </div>
//       </section>

//       <Section title="Track your viewing milestones" subtitle="Celebrate achievements" dark />
//     </>
//   )
// }

export function Watchlist(){
  return (
    <>
      <section className="section" style={{background:'#fff',color:'#111'}}>
        <div className="container">
          <p className="muted" style={{color:'#666'}}>Track</p>
          <h1 className="h1" style={{color:'#111'}}>Your watchlist</h1>
          <div style={{display:'flex',gap:10,marginTop:18}}>
            <button className="btn" style={{background:'var(--brand)',borderColor:'transparent',color:'#fff'}}>Browse</button>
            <button className="btn">Filter</button>
          </div>
        </div>
      </section>

      <section className="section" style={{background:'var(--bg-0)'}}>
        <div className="container">
          <p className="muted">Watch</p>
          <h2 className="h1">Currently watching</h2>
          <div style={{display:'flex',gap:12,marginTop:12}}>
            <button className="btn ghost">View</button>
            <button className="btn ghost">Update</button>
          </div>

          <div className="grid-3" style={{marginTop:24}}>
            <div className="card"><div className="h3">Movies</div></div>
            <div className="card"><div className="h3">TV shows</div></div>
            <div className="card"><div className="h3">Documentaries</div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-3">
          <div className="card">
            <p className="muted">Progress</p>
            <h3 className="h2" style={{margin:'6px 0 10px'}}>Mark your viewing status</h3>
            <div style={{display:'flex',gap:10}}>
              <button className="btn ghost">Track</button>
              <button className="btn ghost">Recommendations</button>
            </div>
          </div>
          <div className="card" style={{aspectRatio:'16/9'}} />
          <div className="card">
            <p className="muted">Plan</p>
            <h3 className="h2" style={{margin:'6px 0 10px'}}>Titles you want to watch next</h3>
          </div>
        </div>
      </section>

      <section className="section" style={{background:'var(--bg-0)'}}>
        <div className="container">
          <p className="muted">Done</p>
          <h2 className="h1">completed titles</h2>
          <div className="tabs">
            <span className="tab active">Recent</span>
            <span className="tab">Favorites</span>
            <span className="tab">Classics</span>
          </div>
          <div className="grid-3" style={{marginTop:18}}>
            <div className="card" style={{aspectRatio:'16/9'}} />
            <div className="card">
              <p className="muted">Achievements</p>
              <h3 className="h2" style={{marginTop:8}}>Track your viewing milestones</h3>
              <div style={{marginTop:12,display:'flex',gap:10}}>
                <button className="btn ghost">Milestone</button>
                <button className="btn ghost">Share</button>
              </div>
            </div>
            <div className="card" />
          </div>
        </div>
      </section>
    </>
  )
}
