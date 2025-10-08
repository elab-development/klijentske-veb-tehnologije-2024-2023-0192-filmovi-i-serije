// import { Button } from '../components/Button'

// export function Login(){
//   return (
//     <section className="section" style={{background:'#fff', color:'#111'}}>
//       <div className="container" style={{maxWidth:560}}>
//         <div className="h1" style={{color:'#111'}}>MovieMate</div>
//         <p className="muted" style={{color:'#444'}}>Enter your world of entertainment</p>
//         <div className="card" style={{padding:20, marginTop:16}}>
//           <label>Email<input style={{width:'100%', padding:10, marginTop:6, marginBottom:12}} placeholder="you@example.com"/></label>
//           <label>Password<input type="password" style={{width:'100%', padding:10, marginTop:6}}/></label>
//           <div style={{marginTop:16}}><Button variant="primary">Login</Button></div>
//         </div>
//       </div>
//     </section>
//   )
// }

export function Login(){
  return (
    <>
      <section className="section" style={{background:'#fff',color:'#111'}}>
        <div className="container" style={{textAlign:'center'}}>
          <p className="muted" style={{color:'#666'}}>Track</p>
          <h1 className="h1" style={{color:'#111'}}>MovieMate</h1>
          <div style={{display:'flex',justifyContent:'center',gap:10,marginTop:14}}>
            <button className="btn primary">Login</button>
            <button className="btn">Sign up</button>
          </div>
        </div>
      </section>

      <section className="section" style={{background:'var(--bg-1)'}}>
        <div className="container" style={{display:'grid',gap:18,placeItems:'center'}}>
          <h2 className="h1">Enter your world of entertainment</h2>
          <div style={{width:'min(740px,100%)',marginTop:10}}>
            <label className="label">Email</label>
            <input className="input" placeholder="you@example.com" />
            <label className="label">Password</label>
            <input className="input" type="password" placeholder="••••••••" />
            <div className="form-actions">
              <button className="btn primary">Login</button>
              <button className="btn ghost">Forgot password</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
