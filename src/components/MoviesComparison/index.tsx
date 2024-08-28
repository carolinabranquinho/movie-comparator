import { MovieCard } from "./MovieCard";
import { splitIntoStacks } from "./utils";

type MoviesComparisonProps = {
  selectedMoviesIds: Maybe<string[]>;
  moviesPerRow?: number;
  onRemove(movieId: string): void;
};

export function MoviesComparison({
  selectedMoviesIds,
  moviesPerRow = 3,
  onRemove,
}: MoviesComparisonProps) {
  if (!selectedMoviesIds?.length) {
    return <h3>Please Select at least one movie</h3>;
  }

  const stacks = splitIntoStacks(selectedMoviesIds, moviesPerRow);
  const elementsPerRow =
    stacks.length > 1 ? moviesPerRow : stacks?.[0]?.length || 1;

  const perfectHeight = 67 / elementsPerRow;
  const perfectProportion = perfectHeight * stacks.length;

  return (
    <div className={`flex justify-center p-8`}>
      <svg
        width="100%"
        height="67%"
        viewBox={`0 0 100 ${perfectProportion}`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMin meet"
        className="max-w-[1600px] p-2"
      >
        {stacks.map((stack, row) => {
          return stack?.map((selected, index) => {
            const cardWidth =
              stacks.length > 1 ? 100 / moviesPerRow : 100 / stack.length;

            return (
              <svg
                key={selected}
                width={`${cardWidth}`}
                viewBox="0 0 100 67"
                xmlns="http://www.w3.org/2000/svg"
                x={`${cardWidth * index}%`}
                y={`${perfectHeight * row}`}
                preserveAspectRatio="xMinYMin meet"
                name="movie-card-svg"
              >
                <g transform="scale(0.975)">
                  <MovieCard id={selected} onRemove={onRemove} />
                </g>
              </svg>
            );
          });
        })}
      </svg>
    </div>
  );
}
