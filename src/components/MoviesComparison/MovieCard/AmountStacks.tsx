import { BillStack } from "./BillStack";
import { CoinStack } from "./CoinStack";

type AmountStacksProps = {
  amount: number;
  title?: string;
  id?: string;
  x: number;
  y: number;
};

// TODO: turn into props
const amountPerBill = 25000000; // $25 million per bill
const amountPerCoin = 1000000; // $1 million per coin

// TODO: SUPPORT CUSTOM COLORS
export function AmountStacks({
  amount,
  title = "Amount",
  id,
  x,
  y,
}: AmountStacksProps) {
  const billCount = Math.floor(amount / amountPerBill);

  const remainingRevenue = amount % amountPerBill;
  const coinCount = Math.floor(remainingRevenue / amountPerCoin);

  return (
    <g id={id}>
      <text x={x} y={y + 22} fontSize="2">
        {title}: {amount}
      </text>

      <g transform={`translate(${x}, ${6.75 + y})`}>
        <BillStack billCount={billCount} maxBillStack={15} />
      </g>

      <g transform={`translate(${x}, ${8.75 + y})`}>
        <CoinStack coinCount={coinCount} maxCoinStack={8} />
      </g>
    </g>
  );
}
