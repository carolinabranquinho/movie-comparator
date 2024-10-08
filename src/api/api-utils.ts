import { last } from "lodash";
import { Configuration } from "@/data/configuration";
import { Movie } from "@/data/movies";
import { NO_IMAGE_PATH } from "@/config/consts";

// TODO: support multiple sizes
/**
 * Use the API's configurationd and movie's poster to build the full path (as described by the API)
 */
export function getFullImagePath(
  movie: Movie,
  configuration?: Maybe<Configuration>,
) {
  if (!configuration?.secureBaseUrl || !movie?.posterPath) {
    return NO_IMAGE_PATH;
  }

  const baseUrl = configuration.secureBaseUrl.endsWith("/")
    ? configuration.secureBaseUrl
    : configuration.secureBaseUrl + "/";

  return `${baseUrl}${last(configuration.posterSizes)}/${movie.posterPath}`;
}
