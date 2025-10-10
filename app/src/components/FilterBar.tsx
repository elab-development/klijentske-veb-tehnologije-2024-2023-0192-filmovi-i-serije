// src/components/FilterBar.tsx
import { useState } from "react";

type Props = {
  type: "movie" | "tv";
  onApply?: (params: Record<string, string>) => void; // (ako koristiš spolja)
};

export function FilterBar({ type, onApply }: Props) {
  const [min, setMin] = useState("7.5");
  const [year, setYear] = useState("");
  const [sort, setSort] = useState("popularity.desc");

  const apply = () => {
    const params: Record<string, string> = {};
    if (min) params["vote_average.gte"] = min;
    if (year) params[type === "movie" ? "primary_release_year" : "first_air_date_year"] = year;
    if (sort) params["sort_by"] = sort;
    onApply?.(params);
  };

  const reset = () => {
    setMin("");
    setYear("");
    setSort("popularity.desc");
    onApply?.({});
  };

  return (
    <div className="filterbar card">
      <div className="filter-grid">
        <label className="filter-item">
          <span className="filter-label">Min rating (0–10)</span>
          <input
            className="input"
            placeholder="npr. 7.5"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            inputMode="decimal"
          />
        </label>

        <label className="filter-item">
          <span className="filter-label">Year (release)</span>
          <input
            className="input"
            placeholder="npr. 2020"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            inputMode="numeric"
          />
        </label>

        <label className="filter-item">
          <span className="filter-label">Sort by</span>
          <select
            className="input select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="popularity.desc">Popularity ↓</option>
            <option value="popularity.asc">Popularity ↑</option>
            <option value="vote_average.desc">Rating ↓</option>
            <option value="vote_average.asc">Rating ↑</option>
            <option value="primary_release_date.desc">Release date ↓</option>
            <option value="primary_release_date.asc">Release date ↑</option>
          </select>
        </label>
      </div>

      <div className="filter-actions">
        <button className="btn primary" onClick={apply}>Primeni</button>
        <button className="btn ghost" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

