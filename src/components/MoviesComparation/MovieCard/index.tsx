import { useConfiguration } from "@/data/configuration";
import { Movie, useGetMovieDetails } from "@/data/movies";
import { getFullImagePath } from "@/api/api-utils";
import { CoinStack } from "./CoinStack";
import { BillStack } from "./BillStack";
import { CloseIcon } from "./CloseIcon";

type MovieCardProps = {
  movie: Movie;
  onRemove(movie: Movie): void;
};

export function MovieCard({ movie, onRemove }: MovieCardProps) {
  const { data: configuration, isLoading: isLoadingConfig } =
    useConfiguration();
  const { data: movieDetails, isLoading: isLoadingMovieDetails } =
    useGetMovieDetails(movie.id);

  const isLoading = isLoadingConfig || isLoadingMovieDetails;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const imageUrl = getFullImagePath(movie, configuration);
  const revenue = movieDetails?.revenue || 0;

  const revenuePerBill = 20000000; // $10 million per bill
  const revenuePerCoin = 1000000; // $1 million per coin

  const billCount = Math.floor(revenue / revenuePerBill);

  const remainingRevenue = revenue % revenuePerBill;
  const coinCount = Math.floor(remainingRevenue / revenuePerCoin);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      className="bg-slate-300"
    >
      <g color="red">
        <text x="10" y="10" fontSize="4">
          {movie.title}
        </text>
        <g>
          <title>remove movie</title>

          <CloseIcon
            x="96"
            y="7"
            width="4"
            height="4"
            onClick={() => onRemove(movie)}
          />
        </g>
      </g>

      <text x="10" y="12" fontSize="2">
        Budget: {movieDetails?.budget}
      </text>
      <text x="10" y="14" fontSize="2">
        Revenue: {movieDetails?.revenue}
      </text>
      <text x="10" y="16" fontSize="2">
        Popularity: {movieDetails?.popularity}
      </text>

      <g id="moviePoster">
        <image width="30" x="15" y="20" href={imageUrl} />
      </g>

      <g id="movieRevenue">
        <g transform="translate(45, 32.75)">
          <BillStack billCount={billCount} maxBillStack={40} />
        </g>
        <g transform="translate(48, 34.75)">
          <CoinStack coinCount={coinCount} maxCoinStack={6} />
        </g>
      </g>
    </svg>
  );
}
