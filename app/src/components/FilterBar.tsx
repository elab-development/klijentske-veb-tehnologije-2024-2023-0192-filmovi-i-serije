import { type FormEvent, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  /** "movie" ili "tv" — dolazi iz /discover/:type */
  type: 'movie' | 'tv';
};

export function FilterBar({ type }: Props) {
  const [sp, setSp] = useSearchParams();

  // inicijalne vrednosti iz URL-a
  const initialMin = sp.get('vote_average.gte') ?? '';
  const initialSort = sp.get('sort_by') ?? 'popularity.desc';
  const initialYear = sp.get(
    type === 'movie' ? 'primary_release_year' : 'first_air_date_year'
  ) ?? '';

  // lokalni state za inpute
  const [minRating, setMinRating] = useState(initialMin);
  const [sortBy, setSortBy] = useState(initialSort);
  const [year, setYear] = useState(initialYear);

  const yearParamName = useMemo(
    () => (type === 'movie' ? 'primary_release_year' : 'first_air_date_year'),
    [type]
  );

  function apply(e: FormEvent) {
    e.preventDefault();
    const next = Object.fromEntries(sp.entries());

    // resetujemo na prvu stranicu kad menjamo filtere
    next.page = '1';

    // setujemo/čistimo parametre
    if (minRating) next['vote_average.gte'] = minRating;
    else delete next['vote_average.gte'];

    if (sortBy) next['sort_by'] = sortBy;
    else delete next['sort_by'];

    if (year) next[yearParamName] = year;
    else delete next[yearParamName];

    setSp(next);
  }

  function reset() {
    const next = Object.fromEntries(sp.entries());
    delete next['vote_average.gte'];
    delete next['sort_by'];
    delete next[yearParamName];
    next.page = '1';
    setMinRating('');
    setSortBy('popularity.desc');
    setYear('');
    setSp(next);
  }

  return (
    <form
      onSubmit={apply}
      className="card"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12, padding: 12, margin: '12px 0' }}
    >
      <label style={{ display: 'grid', gap: 6 }}>
        <span className="muted">Min rating (0–10)</span>
        <input
          type="number"
          step="0.5"
          min={0}
          max={10}
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          placeholder="npr. 7.5"
        />
      </label>

      <label style={{ display: 'grid', gap: 6 }}>
        <span className="muted">{type === 'movie' ? 'Year (release)' : 'Year (first air)'}</span>
        <input
          type="number"
          min={1900}
          max={2099}
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="npr. 2020"
        />
      </label>

      <label style={{ display: 'grid', gap: 6 }}>
        <span className="muted">Sort by</span>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="popularity.desc">Popularity ↓</option>
          <option value="popularity.asc">Popularity ↑</option>
          <option value="vote_average.desc">Rating ↓</option>
          <option value="vote_average.asc">Rating ↑</option>
          <option value="release_date.desc">Release date ↓</option>
          <option value="release_date.asc">Release date ↑</option>
        </select>
      </label>

      <div style={{ display: 'flex', alignItems: 'end', gap: 8 }}>
        <button className="btn" type="submit">Primeni</button>
        <button className="btn ghost" type="button" onClick={reset}>Reset</button>
      </div>
    </form>
  );
}
