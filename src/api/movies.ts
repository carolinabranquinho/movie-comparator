import { MOVIE_API_KEY, MOVIE_API_URL } from "../config/consts";

type GetMovieDataAttributes = {
  title: string;
};

export type MoviesResponse = {
  results: [];
  page: number;
  total_pages: number;
  total_results: number;
};

// TODO: Move this to the backend as we don't want to expose the API_KEY
export async function getMoviesData({ title }: GetMovieDataAttributes) {
  const api = `${MOVIE_API_URL}/search/movie?query=${title}&api_key=${MOVIE_API_KEY}`;
  const result = await fetch(api);
  const json = await result.json();

  return json as MoviesResponse;
}
