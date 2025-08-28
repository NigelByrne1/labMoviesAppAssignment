export interface BaseMovieProps {
    title: string;
    budget: number;
    homepage: string | undefined;
    id: number;
    imdb_id: string;
    original_language: string;
    overview: string;
    release_date: string;
    vote_average: number;
    popularity: number;
    poster_path?: string;
    tagline: string;
    runtime: number;
    revenue: number;
    vote_count: number;
    favourite?: boolean;
    must_watch?: boolean;
  }

export type FilterOption = "title" | "genre";


export interface MovieDetailsProps extends BaseMovieProps {
    genres: {
      id: number;
      name: string;
    }[];
    production_countries: {
      iso_3166_1: string;
      name: string;
    }[];
  }

export interface MovieImage {
  file_path: string;
  aspect_ratio?: number; //some props are optional...
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface MoviePageProps {
  movie: MovieDetailsProps;
  images: MovieImage[];
}

export interface BaseMovieListProps {
  movies: BaseMovieProps[];
  action: (m: BaseMovieProps) => React.ReactNode;
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export interface GenreData {
  genres: {
    id: string;
    name: string
  }[];
}

export interface DiscoverMovies {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
}

export interface Review {
    author: string,
    content: string,
    agree: boolean,
    rating: number,
    movieId: number,
  }

  export interface TimeWindow {
    timeWindow: string; 
  } 

  export interface BaseTVShowProps {
    name: string;
    id: number;
    poster_path?: string;
    vote_average: number;
    vote_count: number;
    first_air_date: string;
    popularity: number;
    genre_ids: number[];
    original_language: string;
    overview: string;
    origin_country: string[];
    favourite?: boolean;
    must_watch?: boolean;
  }

export interface BaseTVShowListProps {
  tvShows: BaseTVShowProps[];
  action: (tvShow: BaseTVShowProps) => React.ReactNode;
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}







