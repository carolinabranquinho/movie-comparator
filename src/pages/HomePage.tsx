import { useState } from "react";
import { Combobox, ComboboxOption } from "../components/Combobox";
import { Maybe } from "../lib/types";
import { Movie, useSearchMovies } from "../data/movies";

function HomePage() {
  const [selectedMovies, setSelectedMovies] =
    useState<Maybe<ComboboxOption[]>>();
  const [query, setQuery] = useState<Maybe<string>>("");
  // TODO: implement error state
  const { data, isLoading } = useSearchMovies(query);

  const movies = data?.map((m: Movie) => ({
    id: m.id,
    label: m.title,
  }));

  // TODO: limit max of selections
  const handleOnSelect = (selectedMovie?: Maybe<ComboboxOption>) => {
    if (selectedMovie) {
      setSelectedMovies((current) => [...(current || []), selectedMovie]);
    }
  };

  // Remove selected movies from the options
  const filteredMovies = movies?.filter(
    (movie: ComboboxOption) =>
      !selectedMovies?.some(
        (selectedMovie: ComboboxOption) => selectedMovie.id === movie.id,
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

      <ul>
        {selectedMovies?.map((selected) => (
          <li key={selected.id}>{selected.label}</li>
        ))}
      </ul>
    </main>
  );
}

export default HomePage;
