import { Button } from '../components/Button'

export function Register(){
  return (
    <section className="section" style={{background:'#fff', color:'#111'}}>
      <div className="container" style={{maxWidth:640}}>
        <div className="h1" style={{color:'#111'}}>Create your account</div>
        <div className="card" style={{padding:20, marginTop:16}}>
          <label>Name<input style={{width:'100%', padding:10, marginTop:6, marginBottom:12}}/></label>
          <label>Email<input style={{width:'100%', padding:10, marginTop:6, marginBottom:12}}/></label>
          <label>Password<input type="password" style={{width:'100%', padding:10, marginTop:6}}/></label>
          <div style={{marginTop:16}}><Button variant="primary">Register</Button></div>
        </div>
      </div>
    </section>
  )
}