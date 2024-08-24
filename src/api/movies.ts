// TODO: REFACTOR THIS FILE

import { MOVIE_API_KEY, MOVIE_API_URL } from "@/config/consts";

type ApiMovieSummary = {
  id: string;
  title: string;
  poster_path?: string;
  overview?: string;
};

export type MoviesResponse = {
  results: ApiMovieSummary[];
  page: number;
  total_pages: number;
  total_results: number;
};

type GetMoviesDataAttributes = {
  title: string;
};

// TODO: Move this to the backend as we don't want to expose the API_KEY
export async function getMoviesData({ title }: GetMoviesDataAttributes) {
  const api = `${MOVIE_API_URL}/search/movie?query=${title}&api_key=${MOVIE_API_KEY}`;
  const result = await fetch(api);
  const json = await result.json();

  return json as MoviesResponse;
}

export type MovieDetailsResponse = ApiMovieSummary & {
  revenue: number;
  budget: number;
  popularity: number;
};

type GetMovieDetailsDataAttributes = {
  id: string;
};

export async function getMovieDetailsData({
  id,
}: GetMovieDetailsDataAttributes) {
  const apiUrl = `${MOVIE_API_URL}/movie/${id}?api_key=${MOVIE_API_KEY}`;
  const result = await fetch(apiUrl);
  const json = await result.json();

  return json as MovieDetailsResponse;
}
