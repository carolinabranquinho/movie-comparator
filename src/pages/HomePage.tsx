import { useState } from "react";
import { Combobox, ComboboxOption } from "@/components/Combobox";
import { Movie, useSearchMovies } from "@/data/movies";
import { MoviesComparation } from "@/components/MoviesComparation";

function HomePage() {
  const [selectedMovies, setSelectedMovies] = useState<Maybe<string[]>>();
  const [query, setQuery] = useState<Maybe<string>>("");
  // TODO: implement error state
  const { data, isLoading } = useSearchMovies(query);

  const options = data?.map((m: Movie) => ({
    id: m.id,
    label: m.title,
  }));

  // TODO: limit max of selections
  const handleOnSelect = (selectedOption?: Maybe<ComboboxOption>) => {
    const selectedMovie = data?.find((m) => m.id === selectedOption?.id);

    if (selectedMovie) {
      setSelectedMovies((current) => [...(current || []), selectedMovie.id]);
    }
  };

  const handleOnRemove = (movieId: string) => {
    setSelectedMovies((current) =>
      (current || []).filter((m) => m !== movieId),
    );
  };

  // Remove selected movies from the options
  const filteredMovies = options?.filter(
    (movie: ComboboxOption) =>
      !selectedMovies?.some(
        (selectedMovie: string) => selectedMovie === movie.id,
      ),
  );

  return (
    <main className="center h-full w-full text-center">
      <h1>Welcome</h1>

      <Combobox
        onSelect={handleOnSelect}
        onChangeQuery={setQuery}
        query={query}
        options={filteredMovies}
        loading={isLoading}
      />

      <section className="h-[80vh]">
        <MoviesComparation
          selectedMoviesIds={selectedMovies}
          onRemove={handleOnRemove}
        />
      </section>
    </main>
  );
}

export default HomePage;
