export interface MediaBase { id: number; title?: string; name?: string; poster_path?: string | null; vote_average?: number; }
export interface Paginated<T> { page: number; total_pages: number; results: T[]; }
