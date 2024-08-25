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
    <g name="movie-card" data-testid="movie-card">
      <g className="text-slate-100">
        <rect
          x="1"
          y="1"
          fill="currentColor"
          width="98.5%"
          height="97.5%"
          stroke="rgb(55, 65, 81)"
          strokeWidth="1px"
          paintOrder="stroke"
        />
      </g>

      <g>
        <foreignObject width="90%" height="18" x={0} y={0}>
          <div className="relative p-1 text-left">
            <span className="text line-clamp-2 text-ellipsis text-wrap text-[3.75px] font-bold leading-tight tracking-tighter">
              {movieDetails.title}
            </span>
          </div>
        </foreignObject>

        <SvgButton
          onClick={() => onRemove(movieDetails.id)}
          tooltip={`Remove movie: ${movieDetails.title}`}
        >
          <CloseIcon x="93" y="4.25" width="3" height="3" color="red" />
        </SvgButton>
      </g>

      <text x="46" y="16" fontSize="2">
        Popularity: {movieDetails.popularity}
      </text>

      <g name="movie-poster">
        <image width="30" x="8" y="20" href={imageUrl} />
      </g>

      <AmountStacks
        title="Budget"
        name="movie-budget"
        amount={movieDetails.budget || 0}
        x={46}
        y={0}
      />

      <AmountStacks
        title="Revenue"
        name="movie-revenue"
        amount={movieDetails.revenue || 0}
        x={46}
        y={25}
      />
    </g>
  );
}
