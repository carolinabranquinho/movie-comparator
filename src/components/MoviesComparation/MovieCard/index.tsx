import { useConfiguration } from "@/data/configuration";
import { useGetMovieDetails } from "@/data/movies";
import { getFullImagePath } from "@/api/api-utils";
import { CloseIcon } from "../../CloseIcon";
import { AmountStacks } from "./AmountStacks";
import { SvgButton } from "@/components/SvgButton";

type MovieCardProps = {
  id: string;
  onRemove(movieId: string): void;
};

export function MovieCard({ id, onRemove }: MovieCardProps) {
  const { data: configuration, isLoading: isLoadingConfig } =
    useConfiguration();
  const { data: movieDetails, isLoading: isLoadingMovieDetails } =
    useGetMovieDetails(id);

  const isLoading = isLoadingConfig || isLoadingMovieDetails;

  // TODO: implement better loading states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movieDetails) {
    return <div>No movie found</div>;
  }

  const imageUrl = getFullImagePath(movieDetails, configuration);

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100">
      <g color="red">
        <text x="10" y="10" fontSize="4">
          {movieDetails.title}
        </text>

        <SvgButton
          onClick={() => onRemove(movieDetails.id)}
          tooltip={`Remove movie: ${movieDetails.title}`}
        >
          <CloseIcon x="90" y="7" width="3" height="3" />
        </SvgButton>
      </g>

      {/* TODO: What??!? */}
      <text x="10" y="16" fontSize="2">
        Popularity: {movieDetails.popularity}
      </text>

      <g id="moviePoster">
        <image width="30" x="15" y="20" href={imageUrl} />
      </g>

      <AmountStacks
        title="Budget"
        id="movieBudget"
        amount={movieDetails.budget || 0}
        x={46}
        y={0}
      />

      <AmountStacks
        title="Revenue"
        id="movieRevenue"
        amount={movieDetails.revenue || 0}
        x={46}
        y={25}
      />
    </svg>
  );
}
