// import { Section } from '../components/Section'
// import { Button } from '../components/Button'

// export function Profile(){
//   return (
//     <>
//       <section className="section" style={{background:'#fff', color:'#111'}}>
//         <div className="container">
//           <div className="muted">Profile</div>
//           <div className="h1" style={{color:'#111'}}>Your movie journey</div>
//           <p className="muted" style={{color:'#444'}}>Track every film and show you've watched.</p>

//           <div style={{display:'grid', gridTemplateColumns:'280px 1fr', gap:20, marginTop:20}}>
//             <div className="card"><div style={{aspectRatio:'1/1', background:'#ddd', borderRadius:'var(--radius-md)'}}/></div>
//             <div>
//               <div className="badge">@aleksi</div>
//               <div className="h2" style={{marginTop:8, color:'#111'}}>Alex Johnson</div>
//               <p className="muted" style={{color:'#444'}}>Movie lover | Exploring one film at a time</p>
//               <div style={{display:'flex', gap:8}}>
//                 <Button variant="primary">Edit</Button>
//                 <Button>Settings</Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Section title="Movies and shows you want to watch" subtitle="Your curated collection." dark right={<div style={{display:'flex', gap:8}}><Button>View</Button><Button>Add</Button></div>} />

//       <Section title="Recently watched" subtitle="Your cinematic journey" />

//       <Section title="Profile preferences" subtitle="Customize your experience" dark />
//     </>
//   )
// }

export function Profile(){
  return (
    <>
      <section className="section" style={{background:'#fff',color:'#111'}}>
        <div className="container">
          <p className="muted" style={{color:'#666'}}>Profile</p>
          <h1 className="h1" style={{color:'#111'}}>Your movie journey</h1>
          <p className="muted" style={{color:'#666',marginTop:6}}>Track every film and show you’ve watched. Your personal cinema library, always ready.</p>
        </div>
      </section>

      <section className="section">
        <div className="container grid-3">
          <div className="card" style={{gridColumn:'span 1',aspectRatio:'1/1'}} />
          <div className="card" style={{gridColumn:'span 2'}}>
            <div className="badge">@alexj</div>
            <h3 className="h2" style={{marginTop:10}}>Alex Johnson</h3>
            <div style={{display:'flex',gap:10,marginTop:12}}>
              <button className="btn ghost">Edit</button>
              <button className="btn ghost">Settings</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{background:'var(--bg-0)'}}>
        <div className="container grid-3">
          <div className="card" style={{gridColumn:'span 2'}}>
            <h3 className="h2">Recently watched</h3>
          </div>
          <div className="card" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h3 className="h2">Profile preferences</h3>
          <div className="grid-3" style={{marginTop:12}}>
            <div className="card"><div className="h3">Update personal details</div></div>
            <div className="card"><div className="h3">Change password</div></div>
            <div className="card"><div className="h3">Discover your next favorite</div></div>
          </div>
        </div>
      </section>
    </>
  )
}

