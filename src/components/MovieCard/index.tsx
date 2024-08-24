import { useConfiguration } from "@/data/configuration";
import { Movie, useGetMovieDetails } from "@/data/movies";
import { getFullImagePath } from "@/api/api-utils";
import { CoinStack } from "./CoinStack";
import { BillStack } from "./BillStack";

type MovieCardProps = {
  movie: Movie;
};

export function MovieCard({ movie }: MovieCardProps) {
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
    <div className="h-full w-full">
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <text x="10" y="10" fontSize="5">
          {movie.title}
        </text>
        <text x="10" y="12" fontSize="2">
          Budget: {movieDetails?.budget}
        </text>
        <text x="10" y="14" fontSize="2">
          Revenue: {movieDetails?.revenue}
        </text>
        <text x="10" y="16" fontSize="2">
          Popularity: {movieDetails?.popularity}
        </text>
        <image width="30" x="15" y="20" href={imageUrl} />

        <g transform="translate(45, 32.75)">
          <BillStack billCount={billCount} maxBillStack={12} />
        </g>
        <g transform="translate(48, 34.75)">
          <CoinStack coinCount={coinCount} maxCoinStack={6} />
        </g>
      </svg>
    </div>
  );
}
