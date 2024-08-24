import { useQuery } from "@tanstack/react-query";
import {
  getMovieDetailsData,
  getMoviesData,
  MovieDetailsResponse,
  MoviesResponse,
} from "@/api/movies";

export type Movie = {
  id: string;
  title: string;
  posterPath?: string;
  overview?: string;
};

export type MovieDetails = Movie & {
  budget: number;
  revenue: number;
  popularity: number;
};

function parseGetMoviesResponse(moviesResponse: MoviesResponse): Movie[] {
  return (
    moviesResponse?.results?.map((m) => ({
      id: m.id,
      title: m.title,
      posterPath: m.poster_path,
      overview: m.overview,
    })) || []
  );
}

export function useSearchMovies(title?: Maybe<string>) {
  const querySearchMovies = async () => {
    if (!title) {
      return [];
    }
    const moviesData = await getMoviesData({ title });
    return parseGetMoviesResponse(moviesData);
  };

  return useQuery({
    queryKey: ["movies", "search", title],
    queryFn: querySearchMovies,
  });
}

function parseGetMovieDetailsResponse(
  movieDetailsResponse: MovieDetailsResponse,
): MovieDetails {
  return {
    id: movieDetailsResponse.id,
    title: movieDetailsResponse.title,
    overview: movieDetailsResponse.overview,
    posterPath: movieDetailsResponse.poster_path,
    popularity: movieDetailsResponse.popularity,
    budget: movieDetailsResponse.budget,
    revenue: movieDetailsResponse.revenue,
  };
}

export function useGetMovieDetails(id?: string) {
  const querySearchMovies = async () => {
    if (!id) {
      return null;
    }
    const movieDetailsData = await getMovieDetailsData({ id });
    return parseGetMovieDetailsResponse(movieDetailsData);
  };

  return useQuery({
    queryKey: ["movies", "search", id],
    queryFn: querySearchMovies,
  });
}
