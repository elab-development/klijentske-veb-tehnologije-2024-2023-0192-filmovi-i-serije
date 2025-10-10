import { useEffect, useRef, useState } from 'react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Link } from 'react-router-dom';
import { tmdb } from '../services/tmdb';

type Teaser = { id: number; title: string; subtitle: string };

export function Movies() {
  const trackRef = useRef<HTMLDivElement>(null);

  const [items, setItems] = useState<Teaser[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;

    // Uzimamo trending filmove (week). Po želji može i popular: /movie/popular
    tmdb
      .trending('movie', 'week')
      .then((res: any) => {
        if (cancel) return;
        const mapped: Teaser[] = (res.results ?? [])
          .slice(0, 16)
          .map((m: any) => ({
            id: m.id,
            title: m.title,
            // jednostavan podnaslov – možeš promeniti u release_date ili žanrove
            subtitle: `Rating ${m.vote_average?.toFixed(1) ?? '-'}`,
          }));
        setItems(mapped);
      })
      .catch((e: any) => setErr(e?.message ?? 'Failed to load movies.'))
      .finally(() => setLoading(false));

    return () => {
      cancel = true;
    };
  }, []);

  const scrollByCard = (dir: 'prev' | 'next') => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.carousel-card');
    const step = card ? card.offsetWidth + 20 : 320;
    el.scrollBy({ left: dir === 'next' ? step : -step, behavior: 'smooth' });
  };

  return (
    <>
      <section className="section" style={{ background: '#fff', color: '#111' }}>
        <Section
          title="Discover your next great watch"
          subtitle="Browse endless movies and TV shows. Find exactly what you want to see."
          right={
            <div style={{ display: 'flex', gap: 8 }}>
              <Link to="/genres/movie"   style={{
    border: '1px solid #000',        // crni border
    borderRadius: '6px',             // zaobljene ivice
    padding: '6px 12px',             // unutrašnji razmak
    textDecoration: 'none',          // ukloni underline
    color: '#000',                   // boja teksta
    display: 'inline-block'          // ponašanje kao dugme
  }}>Browse</Link>
            </div>
          }
        />

        <div className="container">
          {err && (
            <p style={{ color: 'tomato', marginBottom: 12 }}>
              {err}
            </p>
          )}

          <div className="carousel">
            <button
              aria-label="Prev"
              className="carousel-nav"
              onClick={() => scrollByCard('prev')}
            >
              ‹
            </button>

            <div className="carousel-track" ref={trackRef}>
              {(loading ? Array.from({ length: 8 }).map((_, i) => ({
                id: i,
                title: 'Loading…',
                subtitle: '',
              })) : items).map((i) => (
                <div className="carousel-card" key={i.id}>
                  <Card>
                    <div
                      style={{
                        height: 160,
                        background: '#e5e7eb',
                        borderRadius: 12,
                        marginBottom: 12,
                        opacity: loading ? 0.5 : 1,
                      }}
                    />
                    <div className="h3" style={{ color: '#fff' }}>
                      {i.title}
                    </div>
                    <div className="muted" style={{ marginTop: 4 }}>
                      {i.subtitle}
                    </div>
                    <div style={{ marginTop: 12 }}>
                      {/* VAŽNO: ruta do tvojih detalja je /movie/:id */}
                      <Link to={`/movie/${i.id}`} className="btn on-light">
                        View
                      </Link>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            <button
              aria-label="Next"
              className="carousel-nav"
              onClick={() => scrollByCard('next')}
            >
              ›
            </button>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-0)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="muted" style={{ marginBottom: 8 }}>
            Genres
          </p>
          <h2 className="h2">Find movies and shows your way</h2>
          <p className="lead" style={{ margin: '10px auto 24px' }}>
            Filter content by genre to narrow down your perfect entertainment. Select from action,
            drama, comedy, and more.
          </p>
          <Link 
  to="/discover/movie?page=1"
  style={{
    border: '1px solid #fff',        // crni border
    borderRadius: '6px',             // zaobljene ivice
    padding: '6px 12px',             // unutrašnji razmak
    textDecoration: 'none',          // ukloni underline
    color: '#fff',                   // boja teksta
    display: 'inline-block'          // ponašanje kao dugme
  }}
>
  Discover
</Link>
        </div>
      </section>

      <section className="section" style={{ background: '#fff', color: '#111' }}>
        <div
          className="container"
          style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }}
        >
          <div>
            <p className="muted" style={{ color: '#666' }}>
              Sort
            </p>
            <h2 className="h2" style={{ color: '#111' }}>
              Smart sorting options
            </h2>
          </div>
          <div>
            <p className="muted" style={{ color: '#666' }}>
              Choose how you want to view your entertainment. Newest releases or highest rated first.
            </p>
            <div style={{ marginTop: 12 }}>
              <Button className="on-light">Sort</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-0)' }}>
        <div className="container">
          <div className="cta-panel">
            <h2 className="h2" style={{ textAlign: 'center' }}>
              Start tracking your favorites
            </h2>
            <p className="muted" style={{ textAlign: 'center', marginTop: 8 }}>
              Create an account to save your preferences and build the ultimate watchlist.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
              <Link to="/signup">
                <Button variant="primary">Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
