if (
  !import.meta.env.VITE_MOVIE_API_URL ||
  !import.meta.env.VITE_MOVIE_API_KEY
) {
  throw new Error(
    "Please initialize the Movie DB API settings in your environment",
  );
}

export const MOVIE_API_URL = import.meta.env.VITE_MOVIE_API_URL;
export const MOVIE_API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

export const NO_IMAGE_PATH = "/no-image.jpg";
