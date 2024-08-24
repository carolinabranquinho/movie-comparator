import { Movie } from "@/data/movies";
import { MovieCard } from "./MovieCard";
import { splitIntoStacks } from "./utils";

type MoviesComparationProps = {
  selectedMovies: Maybe<Movie[]>;
  moviesPerRow?: number;
  onRemove(movie: Movie): void;
};

export function MoviesComparation({
  selectedMovies,
  moviesPerRow = 3,
  onRemove,
}: MoviesComparationProps) {
  if (!selectedMovies?.length) {
    return <h3>Please Select at least one movie</h3>;
  }

  const stacks = splitIntoStacks(selectedMovies, moviesPerRow);

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
                width={cardWidth}
                height={cardHeight}
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                x={cardWidth * index}
                y={cardHeight * row}
              >
                <MovieCard
                  key={selected.id}
                  movie={selected}
                  onRemove={onRemove}
                />
              </svg>
            );
          });
        })}
      </svg>
    </div>
  );
}
