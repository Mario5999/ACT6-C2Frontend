export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
}

export interface TVShow {
  id: number;
  name: string;
  number_of_seasons?: number;
  poster_path: string | null;
}

export interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
}

export interface ApiResponse<T> {
  results: T[];
}