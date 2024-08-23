import { useQuery } from "@tanstack/react-query";
import { getMoviesData, MoviesResponse } from "../api/movies";
import { Maybe } from "../lib/types";

export type Movie = {
  id: string;
  title: string;
};

function parseGetMoviesResponse(moviesResponse: MoviesResponse): Movie[] {
  return (
    moviesResponse?.results?.map((m: Movie) => ({
      id: m.id,
      title: m.title,
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
