import { useState } from "react";
import { Combobox, ComboboxOption } from "@/components/Combobox";
import { Movie, useSearchMovies } from "@/data/movies";
import { MoviesComparation } from "@/components/MoviesComparation";

function HomePage() {
  const [selectedMovies, setSelectedMovies] = useState<Maybe<Movie[]>>();
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
      setSelectedMovies((current) => [...(current || []), selectedMovie]);
    }
  };

  const handleOnRemove = (movie: Movie) => {
    setSelectedMovies((current) =>
      (current || []).filter((m) => m.id !== movie.id),
    );
  };

  // Remove selected movies from the options
  const filteredMovies = options?.filter(
    (movie: ComboboxOption) =>
      !selectedMovies?.some(
        (selectedMovie: Movie) => selectedMovie.id === movie.id,
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
          selectedMovies={selectedMovies}
          onRemove={handleOnRemove}
        />
      </section>
    </main>
  );
}

export default HomePage;
