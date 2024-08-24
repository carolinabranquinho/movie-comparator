import { useConfiguration } from "@/data/configuration";
import { Movie, useGetMovieDetails } from "@/data/movies";
import { getFullImagePath } from "@/api/api-utils";
import { CloseIcon } from "./CloseIcon";
import { AmountStacks } from "./AmountStacks";

type MovieCardProps = {
  movie: Movie;
  onRemove(movie: Movie): void;
};

export function MovieCard({ movie, onRemove }: MovieCardProps) {
  const { data: configuration, isLoading: isLoadingConfig } =
    useConfiguration();
  const { data: movieDetails, isLoading: isLoadingMovieDetails } =
    useGetMovieDetails(movie.id);

  const isLoading = isLoadingConfig || isLoadingMovieDetails;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const imageUrl = getFullImagePath(movie, configuration);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      className="bg-slate-300"
    >
      <g color="red">
        <text x="10" y="10" fontSize="4">
          {movie.title}
        </text>
        <g>
          <title>remove movie</title>
          <CloseIcon
            x="96"
            y="7"
            width="4"
            height="4"
            onClick={() => onRemove(movie)}
          />
        </g>
      </g>

      {/* TODO: What??!? */}
      <text x="10" y="16" fontSize="2">
        Popularity: {movieDetails?.popularity}
      </text>

      <g id="moviePoster">
        <image width="30" x="15" y="20" href={imageUrl} />
      </g>

      <AmountStacks
        title="Budget"
        id="movieBudget"
        amount={movieDetails?.budget || 0}
        x={46}
        y={0}
      />

      <AmountStacks
        title="Revenue"
        id="movieRevenue"
        amount={movieDetails?.revenue || 0}
        x={46}
        y={25}
      />
    </svg>
  );
}
