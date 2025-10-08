export function Profile(){
  return (
    <>
      <section className="section" style={{background:'#fff',color:'#111'}}>
        <div className="container">
          <p className="muted" style={{color:'#666'}}>Profile</p>
          <h1 className="h1" style={{color:'#111'}}>Your movie journey</h1>
          <p className="muted" style={{color:'#666',marginTop:6}}>
            Track every film and show you’ve watched. Your personal cinema library, always ready.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card" style={{padding:24}}>
            <div className="badge">@username</div>
            <h3 className="h2" style={{marginTop:10}}>Your Name</h3>
            <p className="muted" style={{marginTop:6}}>you@example.com</p>
            <div style={{display:'flex',gap:10,marginTop:12}}>
              <button className="btn ghost">Edit</button>
              <button className="btn ghost">Settings</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{background:'#fff',color:'#111'}}>
        <div className="container">
          <h3 className="h2" style={{color:'#111'}}>Recently watched</h3>
          <div className="grid-3" style={{marginTop:12}}>
            <div className="card" style={{padding:16}}>
              <div className="h3" style={{color:'#111'}}>Inception</div>
              <p className="muted">2010 • Sci-Fi, Thriller</p>
              <div style={{display:'flex',gap:8,marginTop:10}}>
                <button className="btn">Details</button>
                <button className="btn">Rate</button>
              </div>
            </div>
            <div className="card" style={{padding:16}}>
              <div className="h3" style={{color:'#111'}}>Interstellar</div>
              <p className="muted">2014 • Sci-Fi, Drama</p>
              <div style={{display:'flex',gap:8,marginTop:10}}>
                <button className="btn">Details</button>
                <button className="btn">Rate</button>
              </div>
            </div>
            <div className="card" style={{padding:16}}>
              <div className="h3" style={{color:'#111'}}>The Dark Knight</div>
              <p className="muted">2008 • Action, Crime</p>
              <div style={{display:'flex',gap:8,marginTop:10}}>
                <button className="btn">Details</button>
                <button className="btn">Rate</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{background:'#fff',color:'#111'}}>
        <div className="container">
          <h3 className="h2" style={{color:'#111'}}>Your ratings</h3>

          <ul style={{listStyle:'none',padding:0,margin:'12px 0 0',display:'grid',gap:12}}>
            <li className="card" style={{padding:16,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <strong style={{color:'#111'}}>Inception</strong>
                <div className="muted">rated on 2025-10-09</div>
              </div>
              <div aria-label="rating 4 of 5" style={{fontSize:18}}>★★★★☆</div>
            </li>

            <li className="card" style={{padding:16,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <strong style={{color:'#111'}}>Interstellar</strong>
                <div className="muted">rated on 2025-10-08</div>
              </div>
              <div aria-label="rating 5 of 5" style={{fontSize:18}}>★★★★★</div>
            </li>

            <li className="card" style={{padding:16,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <strong style={{color:'#111'}}>The Dark Knight</strong>
                <div className="muted">rated on 2025-10-07</div>
              </div>
              <div aria-label="rating 4 of 5" style={{fontSize:18}}>★★★★☆</div>
            </li>
          </ul>
        </div>
      </section>

      <section className="section" style={{background:'var(--bg-0)',color:'#fff'}}>
        <div className="container" style={{textAlign:'center'}}>
          <p className="muted" style={{color:'var(--muted)'}}>Settings</p>
          <h2 className="h1" style={{color:'#fff'}}>Profile preferences</h2>
          <p className="muted" style={{marginTop:6}}>Customize your experience</p>

          <div className="grid-2" style={{marginTop:32,display:'grid',gap:20,gridTemplateColumns:'repeat(2,minmax(0,1fr))'}}>
            <div className="card" style={{textAlign:'left',padding:24,background:'var(--bg-1)',border:'1px solid var(--border)'}}>
              <p className="muted" style={{marginBottom:6}}>Personal</p>
              <div className="h3" style={{color:'#fff'}}>Update personal details</div>
              <p className="muted" style={{marginTop:4}}>Keep your profile current and accurate</p>
              <a href="#" style={{display:'inline-flex',alignItems:'center',gap:4,marginTop:12,color:'#fff',fontWeight:600}}>
                Update →
              </a>
            </div>

            <div className="card" style={{textAlign:'left',padding:24,background:'var(--bg-1)',border:'1px solid var(--border)'}}>
              <p className="muted" style={{marginBottom:6}}>Security</p>
              <div className="h3" style={{color:'#fff'}}>Change password</div>
              <p className="muted" style={{marginTop:4}}>Protect your account with a strong password</p>
              <a href="#" style={{display:'inline-flex',alignItems:'center',gap:4,marginTop:12,color:'#fff',fontWeight:600}}>
                Reset →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{background:'var(--bg-0)',color:'#fff'}}>
        <div className="container" style={{textAlign:'center'}}>
          <h2 className="h1" style={{color:'#fff'}}>Discover your next favorite</h2>
          <p className="muted" style={{marginTop:6}}>
            Personalized recommendations based on your unique viewing history and ratings
          </p>
          <div style={{display:'flex',justifyContent:'center',gap:10,marginTop:20}}>
            <button className="btn primary">Explore</button>
            <button className="btn">Recommend</button>
          </div>
        </div>
      </section>

    </>
  )
}
