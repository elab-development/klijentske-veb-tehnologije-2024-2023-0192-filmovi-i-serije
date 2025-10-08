import { Button } from '../components/Button'

export function Login(){
  return (
    <section className="section" style={{background:'#fff', color:'#111'}}>
      <div className="container" style={{maxWidth:560}}>
        <div className="h1" style={{color:'#111'}}>MovieMate</div>
        <p className="muted" style={{color:'#444'}}>Enter your world of entertainment</p>
        <div className="card" style={{padding:20, marginTop:16}}>
          <label>Email<input style={{width:'100%', padding:10, marginTop:6, marginBottom:12}} placeholder="you@example.com"/></label>
          <label>Password<input type="password" style={{width:'100%', padding:10, marginTop:6}}/></label>
          <div style={{marginTop:16}}><Button variant="primary">Login</Button></div>
        </div>
      </div>
    </section>
  )
}