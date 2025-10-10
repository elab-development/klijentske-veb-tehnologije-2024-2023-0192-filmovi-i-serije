export type KindSingular = 'movie' | 'tv';

export class RatingMap {
  private map: Map<string, number>;

  constructor(init?: Record<string, number> | Map<string, number>) {
    if (init instanceof Map) this.map = new Map(init);
    else if (init && typeof init === 'object')
      this.map = new Map(
        Object.entries(init).filter(([_, v]) => Number.isFinite(v as number))
      );
    else this.map = new Map();
  }

  private k(kind: KindSingular, id: number) { return `${kind}:${id}`; }

  set(kind: KindSingular, id: number, value: number) {
    if (!Number.isFinite(value)) return;
    this.map.set(this.k(kind, id), value);
  }

  get(kind: KindSingular, id: number): number | undefined {
    return this.map.get(this.k(kind, id));
  }

  delete(kind: KindSingular, id: number) {
    this.map.delete(this.k(kind, id));
  }

  /** === NOVO: iterabilnost i liste === */
  entries(): Array<[string, number]> { return Array.from(this.map.entries()); }
  [Symbol.iterator](): IterableIterator<[string, number]> { return this.map[Symbol.iterator](); }

  /** Struktuirano za UI (kind,id,value) */
  list(): Array<{ kind: KindSingular; id: number; value: number }> {
    const out: Array<{ kind: KindSingular; id: number; value: number }> = [];
    for (const [key, v] of this.map) {
      const [kind, idStr] = key.split(':');
      const id = Number(idStr);
      if ((kind === 'movie' || kind === 'tv') && Number.isFinite(id)) {
        out.push({ kind: kind as KindSingular, id, value: v });
      }
    }
    return out;
  }

  /** JSON.stringify support */
  toJSON(): Record<string, number> { return Object.fromEntries(this.map.entries()); }
  static fromJSON(raw: any): RatingMap {
    if (!raw || typeof raw !== 'object') return new RatingMap();
    return new RatingMap(raw as Record<string, number>);
  }

  /** Imutabilni klon za reducer */
  clone(): RatingMap { return new RatingMap(this.map); }
}
