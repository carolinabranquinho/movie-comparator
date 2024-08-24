import { MovieCard } from "./MovieCard";
import { splitIntoStacks } from "./utils";

type MoviesComparationProps = {
  selectedMoviesIds: Maybe<string[]>;
  moviesPerRow?: number;
  onRemove(movieId: string): void;
};

export function MoviesComparation({
  selectedMoviesIds,
  moviesPerRow = 3,
  onRemove,
}: MoviesComparationProps) {
  if (!selectedMoviesIds?.length) {
    return <h3>Please Select at least one movie</h3>;
  }

  const stacks = splitIntoStacks(selectedMoviesIds, moviesPerRow);

  return (
    <div className="p-8">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {stacks.map((stack, row) => {
          return stack?.map((selected, index) => {
            const cardWidth = 100 / stack.length;
            const cardHeight = 100 / stacks.length;
            return (
              <svg
                key={selected}
                width={cardWidth}
                height={cardHeight}
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                x={cardWidth * index}
                y={cardHeight * row}
              >
                <MovieCard id={selected} onRemove={onRemove} />
              </svg>
            );
          });
        })}
      </svg>
    </div>
  );
}
