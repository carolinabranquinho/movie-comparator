import { last } from "lodash";
import { Configuration } from "@/data/configuration";
import { Movie } from "@/data/movies";

// TODO: support multiple sizes
export function getFullImagePath(
  movie: Movie,
  configuration?: Maybe<Configuration>,
) {
  if (!configuration) {
    return "/no-image.jpg";
  }

  return `${configuration.secureBaseUrl}/${last(configuration.posterSizes)}/${movie.posterPath}`;
}
