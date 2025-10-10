import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { tmdb } from '../services/tmdb';
import { FilterBar } from '../components/FilterBar';

type Paginated<T> = { page: number; total_pages: number; results: T[] };
type Item = { id: number; title?: string; name?: string; vote_average?: number };

export function Discover() {
  const { type = 'movie' } = useParams<{ type?: 'movie' | 'tv' }>();
  const [sp, setSp] = useSearchParams();
  const [data, setData] = useState<Paginated<Item> | null>(null);

  const page = Number(sp.get('page') ?? '1');

  useEffect(() => {
    const params: Record<string, string> = Object.fromEntries(sp.entries());
    if (!params.page) params.page = '1';

    let canceled = false;

    tmdb.discover<Paginated<Item>>(type as 'movie' | 'tv', params).then((res) => {
      if (canceled) return;
      // deduplikacija (ponekad se u StrictMode-u dupliraju renderi)
      const uniq = Array.from(new Map(res.results.map((r) => [r.id, r])).values());
      setData({ ...res, results: uniq });
    });

    return () => {
      canceled = true;
    };
  }, [type, sp.toString()]);

  if (!data) return <p>Učitavanje...</p>;

  const go = (p: number) => {
    const next = new URLSearchParams(sp);
    next.set('page', String(p));
    setSp(next);
  };

  // 🔗 OVO JE KLJUČ: FilterBar vraća params -> upišemo u URL i resetujemo page
  const applyFilters = (params: Record<string, string>) => {
    const next = new URLSearchParams(sp);

    // Očisti stare filtere koji nas zanimaju
    const yearKey =
      (type as 'movie' | 'tv') === 'movie' ? 'primary_release_year' : 'first_air_date_year';
    ['vote_average.gte', 'sort_by', yearKey].forEach((k) => next.delete(k));

    // Upisi nove (samo one koji imaju vrednost)
    Object.entries(params).forEach(([k, v]) => {
      if (v != null && v !== '') next.set(k, String(v));
    });

    next.set('page', '1'); // uvek resetuj paginaciju kad se filteri menjaju
    setSp(next);
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="h2">Discover: {type}</h2>

        {/* FilterBar sada dobija onApply */}
        <FilterBar type={type as 'movie' | 'tv'} onApply={applyFilters} />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 12,
          }}
        >
          {data.results.map((m) => (
            <div key={m.id} className="card" style={{ padding: 10 }}>
              <div style={{ fontWeight: 600 }}>{m.title ?? m.name}</div>
              <div className="muted" style={{ fontSize: 12 }}>
                Ocena: {m.vote_average}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button className="btn" disabled={page <= 1} onClick={() => go(page - 1)}>
            Prev
          </button>
          <button
            className="btn"
            disabled={page >= data.total_pages}
            onClick={() => go(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
