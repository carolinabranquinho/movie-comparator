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
    <>
      <header className="border-b-2 bg-stone-100 p-4 shadow-sm">
        <a
          href="/"
          className="p-2 text-3xl text-teal-700 decoration-transparent"
        >
          MovieCompare!
        </a>
      </header>

      <main className="center h-full w-full p-2 text-center">
        <h1 className="m-2">Welcome to Movie Compare 🍿</h1>
        <p>
          This is an interactive app that lets you visually compare movie
          information using dynamic SVG visualizations. Dive into movie
          comparisons and explore key metrics.
        </p>
        <Combobox
          onSelect={handleOnSelect}
          onChangeQuery={setQuery}
          query={query}
          options={filteredMovies}
          loading={isLoading}
          placeholder="Search for a movie title"
          ariaLabel="Search for a movie title"
        />

        <section>
          <MoviesComparison
            selectedMoviesIds={selectedMovies}
            onRemove={handleOnRemove}
          />
        </section>
      </main>
    </>
  );
}

export default HomePage;
