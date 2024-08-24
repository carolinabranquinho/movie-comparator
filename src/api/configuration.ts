import { MOVIE_API_KEY, MOVIE_API_URL } from "../config/consts";

export type ConfigurationResponse = {
  images: {
    secure_base_url: string;
    poster_sizes: string[];
  };
};

// TODO: Move this to the backend as we don't want to expose the API_KEY
export async function getConfigurationData() {
  const api = `${MOVIE_API_URL}/configuration?api_key=${MOVIE_API_KEY}`;
  const result = await fetch(api);
  const json = await result.json();

  return json as ConfigurationResponse;
}
