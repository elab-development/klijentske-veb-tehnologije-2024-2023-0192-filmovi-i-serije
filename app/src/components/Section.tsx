export function Section({title, subtitle, dark=false, right}:{title:string; subtitle?:string; dark?:boolean; right?:React.ReactNode}){
  return (
    <section className="section" style={{background: dark?'var(--bg-0)':'transparent', color: dark?'#fff':'#000'}}>
      <div className="container">
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20}}>
          <div>
            <div className="h2">{title}</div>
            {subtitle && <div className="muted">{subtitle}</div>}
          </div>
          {right}
        </div>
      </div>
    </section>
  )
}
