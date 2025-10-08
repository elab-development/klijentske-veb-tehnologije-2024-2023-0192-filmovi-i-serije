// import { Button } from '../components/Button'

// export function Register(){
//   return (
//     <section className="section" style={{background:'#fff', color:'#111'}}>
//       <div className="container" style={{maxWidth:640}}>
//         <div className="h1" style={{color:'#111'}}>Create your account</div>
//         <div className="card" style={{padding:20, marginTop:16}}>
//           <label>Name<input style={{width:'100%', padding:10, marginTop:6, marginBottom:12}}/></label>
//           <label>Email<input style={{width:'100%', padding:10, marginTop:6, marginBottom:12}}/></label>
//           <label>Password<input type="password" style={{width:'100%', padding:10, marginTop:6}}/></label>
//           <div style={{marginTop:16}}><Button variant="primary">Register</Button></div>
//         </div>
//       </div>
//     </section>
//   )
// }

export function Register(){
  return (
    <section className="section" style={{background:'var(--bg-1)'}}>
      <div className="container" style={{maxWidth:760}}>
        <p className="muted">Start</p>
        <h1 className="h1">Create your account</h1>

        <label className="label">Name</label>
        <input className="input" placeholder="Your name" />
        <label className="label">Email</label>
        <input className="input" placeholder="you@example.com" />
        <label className="label">Password</label>
        <input className="input" type="password" placeholder="••••••••" />
        <div style={{marginTop:10,display:'flex',alignItems:'center',gap:8}}>
          <input className="checkbox" id="tac" type="checkbox"/><label htmlFor="tac" className="muted">I accept the terms and conditions</label>
        </div>
        <div className="form-actions">
          <button className="btn primary">Register</button>
        </div>
      </div>
    </section>
  )
}
