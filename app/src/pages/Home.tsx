import { Section } from '../components/Section'
import { Button } from '../components/Button'
import heroImage from '../assets/home-hero.jpg'
import iconAccess from '../assets/account_box.svg'
import iconNavigation from '../assets/navigation.svg'
import iconSearch from '../assets/search.svg'
import feature1 from '../assets/home-features1.jpg'
import feature2 from '../assets/home-features2.jpg'
import feature3 from '../assets/home-features3.jpg'
import iconStar from '../assets/star_shine.svg'
import iconHistory from '../assets/history_2.svg'
import iconTv from '../assets/tv_next.svg'
import { Link } from 'react-router-dom'

export function Home() {
  return (
    <>
      <section
        className="section"
        style={{
          position: 'relative',
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '560px',
          display: 'flex',
          alignItems: 'center',
          color: 'var(--text-0)',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="h1" style={{ maxWidth: 760 }}>Track every movie and show you love</div>
          <p className="muted" style={{ maxWidth: 560, margin: '8px 0 20px' }}>
            Discover, rate, and manage your watchlist with one powerful app.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link to="/signup" className="btn white">Get started</Link>
            <Button>Learn more</Button>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,.45), rgba(0,0,0,.85))',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        />
      </section>

      <section className="section" style={{ background: 'var(--bg-0)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="muted" style={{ marginBottom: 8 }}>Explore</p>
          <h2 className="h2">Powerful tools for your entertainment discovery</h2>
          <p className="lead" style={{ margin: '10px auto 32px' }}>Navigate through thousands of movies and TV shows with precision and speed. Find exactly what you want, when you want it.</p>

          <div className="grid-3">
            <div className="card">
              <img src={iconAccess} alt="Access icon" width={48} height={48} />
              <div className="h3">Seamless access</div>
              <p className="muted" style={{ marginTop: 8 }}>Create your account and start tracking in moments.</p>
            </div>
            <div className="card">
              <img src={iconNavigation} alt="Access icon" width={48} height={48} />
              <div className="h3">Smart content navigation</div>
              <p className="muted" style={{ marginTop: 8 }}>Filter titles by genre, popularity, and release date.</p>
            </div>
            <div className="card">
              <img src={iconSearch} alt="Access icon" width={48} height={48} />
              <div className="h3">Advanced search</div>
              <p className="muted" style={{ marginTop: 8 }}>Uncover hidden gems with intelligent algorithms.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#fff' }}>
        <Section title="Personalize your entertainment journey" subtitle="Experience" dark={false} />
        <div className="container grid grid-3">

          <div
            className="card feature-card"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.85)), url(${feature1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: '#fff',
              position: 'relative',
              padding: '32px',
              borderRadius: 'var(--radius-md)',
              minHeight: '280px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              textAlign: 'left'
            }}
          >
            <img src={iconStar} alt="Review icon" width={32} height={32}
              style={{ position: 'absolute', top: 20, left: 20 }} />
            <div className="h3">Rate and review content</div>
            <p style={{ marginTop: 8 }}>Share your thoughts and see what others recommend.</p>
            <Link
              to="/profile"
              style={{
                color: '#fff',
                marginTop: 12,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              Review →
            </Link>
          </div>

          <div
            className="card feature-card"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.85)), url(${feature2})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: '#fff',
              position: 'relative',
              padding: '32px',
              borderRadius: 'var(--radius-md)',
              minHeight: '280px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              textAlign: 'left'
            }}
          >
            <img src={iconHistory} alt="Watchlist icon" width={32} height={32}
              style={{ position: 'absolute', top: 20, left: 20 }} />
            <div className="h3">Manage your watchlist</div>
            <p style={{ marginTop: 8 }}>Keep track of what you want to watch next.</p>
            <Link
              to="/watchlist"
              style={{
                color: '#fff',
                marginTop: 12,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              Organize →
            </Link>
          </div>

          <div
            className="card feature-card"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.85)), url(${feature3})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: '#fff',
              position: 'relative',
              padding: '32px',
              borderRadius: 'var(--radius-md)',
              minHeight: '280px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              textAlign: 'left'
            }}
          >
            <img src={iconTv} alt="Recommendations icon" width={32} height={32}
              style={{ position: 'absolute', top: 20, left: 20 }} />
            <div className="h3">Get personalized recommendations</div>
            <p style={{ marginTop: 8 }}>Discover new titles based on your viewing history.</p>
            <Link
              to="/movies"
              style={{
                color: '#fff',
                marginTop: 12,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              Discover →
            </Link>
          </div>

        </div>
      </section>



    </>
  )
}
