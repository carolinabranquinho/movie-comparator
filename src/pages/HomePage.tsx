import { useState } from "react";
import { Combobox, ComboboxOption } from "@/components/Combobox";
import { Movie, useSearchMovies } from "@/data/movies";
import { MoviesComparison } from "@/components/MoviesComparison";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  const [query, setQuery] = useState<Maybe<string>>("");
  const [searchParams, setSearchParams] = useSearchParams();
  // TODO: implement error state
  const { data, isLoading } = useSearchMovies(query);

  const options = data?.map((m: Movie) => ({
    id: m.id,
    label: m.title,
  }));

  const selectedMovies = searchParams.getAll("movie");

  // TODO: limit max of selections
  const handleOnSelect = (selectedOption?: Maybe<ComboboxOption>) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    const selectedMovie = data?.find((m) => m.id === selectedOption?.id);

    if (selectedMovie) {
      // const current = searchParams.getAll("movie");
      updatedSearchParams.append("movie", selectedMovie.id);
      setSearchParams(updatedSearchParams);
    }
  };

  const handleOnRemove = (movieId: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams);

    const currentMoviesIds = updatedSearchParams.getAll("movie");
    const newMoviesIds = currentMoviesIds.filter(
      (mId) => mId.toString() !== movieId.toString(),
    );
    updatedSearchParams.delete("movie");

    newMoviesIds.forEach((element) => {
      updatedSearchParams.append("movie", element);
    });

    setSearchParams(updatedSearchParams);
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
        <MoviesComparison
          selectedMoviesIds={selectedMovies}
          onRemove={handleOnRemove}
        />
      </section>
    </main>
  );
}

export default HomePage;
