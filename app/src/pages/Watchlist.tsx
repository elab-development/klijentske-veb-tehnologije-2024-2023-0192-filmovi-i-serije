import { useMemo, useState } from 'react'

type Item = {
  id: number
  title: string
  kind: 'movie' | 'tv' | 'doc'
  status: 'watching' | 'planned' | 'done'
  year: number
}

const MOCK: Item[] = [
  { id: 1, title: 'Inception', kind: 'movie', status: 'watching', year: 2010 },
  { id: 2, title: 'The Mandalorian', kind: 'tv', status: 'watching', year: 2023 },
  { id: 3, title: 'Planet Earth II', kind: 'doc', status: 'planned', year: 2016 },
  { id: 4, title: 'Whiplash', kind: 'movie', status: 'planned', year: 2014 },
  { id: 5, title: 'Interstellar', kind: 'movie', status: 'done', year: 2014 },
  { id: 6, title: 'Dark', kind: 'tv', status: 'done', year: 2020 },
  { id: 7, title: 'Free Solo', kind: 'doc', status: 'done', year: 2018 },
]

export function Watchlist() {
  const [category, setCategory] = useState<'all' | 'movie' | 'tv' | 'doc'>('all')
  const [status, setStatus] = useState<'all' | 'watching' | 'planned' | 'done'>('all')
  const [query, setQuery] = useState('')
  const [completedTab, setCompletedTab] = useState<'recent' | 'favorites' | 'classics'>('recent')

  const filtered = useMemo(() => {
    return MOCK.filter(it => {
      const catOk = category === 'all' || it.kind === category
      const stOk = status === 'all' || it.status === status
      const qOk = query.trim() === '' || it.title.toLowerCase().includes(query.toLowerCase())
      return catOk && stOk && qOk
    })
  }, [category, status, query])

  const watching = filtered.filter(i => i.status === 'watching')
  const planned = filtered.filter(i => i.status === 'planned')
  const done = filtered.filter(i => i.status === 'done')
  
  const recent     = done;                   // ovde bi kasnije mogao npr. sort po datumu završetka
  const favorites  = done.filter(i => i.kind === 'movie'); // demo: “favorites” kao filmovi
  const classics   = done.filter(i => i.year < 2000);      // demo: klasici pre 2000.

  const activeList =
    completedTab === 'recent'    ? recent :
    completedTab === 'favorites' ? favorites :
    classics


  return (
    <>
      <section className="section" style={{ background: '#fff', color: '#111' }}>
        <div className="container">
          <p className="muted" style={{ color: '#666' }}>Track</p>
          <h1 className="h1" style={{ color: '#111' }}>Your watchlist</h1>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 16, flexWrap: 'wrap' }}>
            <select className="input" style={{ maxWidth: 220 }} value={category}
              onChange={e => setCategory(e.target.value as any)}>
              <option value="all">All categories</option>
              <option value="movie">Movies</option>
              <option value="tv">TV shows</option>
              <option value="doc">Documentaries</option>
            </select>

            <select className="input" style={{ maxWidth: 220 }} value={status}
              onChange={e => setStatus(e.target.value as any)}>
              <option value="all">All statuses</option>
              <option value="watching">Currently watching</option>
              <option value="planned">Planned</option>
              <option value="done">Completed</option>
            </select>

            <input className="input" style={{ maxWidth: 320 }} placeholder="Search title…"
              value={query} onChange={e => setQuery(e.target.value)} />

            <button className="btn primary" onClick={() => { setCategory('all'); setStatus('all'); setQuery('') }}>
              Clear
            </button>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#fff', color: '#111' }}>
        <div className="container">
          <p className="muted" style={{ color: '#666' }}>Watch</p>
          <h2 className="h1" style={{ color: '#111' }}>Currently watching</h2>

          <div className="grid-3" style={{ marginTop: 18 }}>
            {watching.length === 0 && (
              <div className="card" style={{ gridColumn: '1 / -1', padding: 20 }}>
                <div className="h3" style={{ color: '#666' }}>No items are marked as “watching”.</div>
                <p className="muted" style={{ marginTop: 6 }}>Use filters or add titles to your watch queue.</p>
              </div>
            )}
            {watching.map(i => (
              <div key={i.id} className="card" style={{ padding: 16 }}>
                <div className="badge" style={{ marginBottom: 8 }}>{i.kind.toUpperCase()}</div>
                <div className="h3" style={{ color: '#ffffffff' }}>{i.title}</div>
                <p className="muted">{i.year}</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <button className="btn ghost">Update</button>
                  <button className="btn ghost">Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#fff', color: '#111' }}>
        <div className="container">
          <p className="muted" style={{ color: '#666' }}>Plan</p>
          <h2 className="h1" style={{ color: '#111' }}>Titles you want to watch next</h2>

          <div className="grid-3" style={{ marginTop: 18 }}>
            {planned.length === 0 && (
              <div className="card" style={{ gridColumn: '1 / -1', padding: 20 }}>
                <div className="h3" style={{ color: '#666' }}>Your planning list is empty.</div>
                <p className="muted" style={{ marginTop: 6 }}>Browse and add titles to watch later.</p>
              </div>
            )}
            {planned.map(i => (
              <div key={i.id} className="card" style={{ padding: 16 }}>
                <div className="badge" style={{ marginBottom: 8 }}>{i.kind.toUpperCase()}</div>
                <div className="h3" style={{ color: '#ffffffff' }}>{i.title}</div>
                <p className="muted">{i.year}</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <button className="btn ghost">Add to queue</button>
                  <button className="btn ghost">Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#fff', color: '#111' }}>
        <div className="container">
          <p className="muted" style={{ color: '#666' }}>Done</p>
          <h2 className="h1" style={{ color: '#111' }}>Completed titles</h2>

          <div className="tabs">
            <button className={`tab ${completedTab === 'recent' ? 'active' : ''}`}
              onClick={() => setCompletedTab('recent')}>Recent</button>
            <button className={`tab ${completedTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setCompletedTab('favorites')}>Favorites</button>
            <button className={`tab ${completedTab === 'classics' ? 'active' : ''}`}
              onClick={() => setCompletedTab('classics')}>Classics</button>
          </div>

          <div className="grid-3" style={{ marginTop: 18 }}>
            {activeList.length === 0 && (
              <div className="card" style={{ gridColumn: '1 / -1', padding: 20 }}>
                <div className="h3" style={{ color: '#666' }}>No completed titles in view.</div>
                <p className="muted" style={{ marginTop: 6 }}>Finish a title to see it here.</p>
              </div>
            )}
            {activeList.map(i => (
              <div key={i.id} className="card" style={{ padding: 16 }}>
                <div className="badge" style={{ marginBottom: 8 }}>{i.kind.toUpperCase()}</div>
                <div className="h3" style={{ color: '#ffffffff' }}>{i.title}</div>
                <p className="muted">{i.year}</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <button className="btn ghost">Review</button>
                  <button className="btn ghost">Rate</button>
                </div>
              </div>
            ))}

            <div className="card" style={{ gridColumn: '1 / -1', padding: 24 }}>
              <p className="muted">Achievements</p>
              <h3 className="h2" style={{ marginTop: 6, color: '#' }}>Track your viewing milestones</h3>
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <button className="btn ghost">Milestone</button>
                <button className="btn ghost">Share</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
