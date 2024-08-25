import { splitIntoStacks } from "../utils";

type BillStackProps = {
  billCount: number;
  maxBillStack: number;
};

const BILL_WIDTH = 40;
const BILL_HEIGHT = 0.7 * BILL_WIDTH;

const billSvg = (
  <svg
    width={0.75 * BILL_WIDTH}
    height={0.5 * BILL_HEIGHT}
    viewBox={`0 0 ${BILL_WIDTH} ${BILL_HEIGHT}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#7da34b", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#85bb65", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect
      width={BILL_WIDTH}
      height={0.5 * BILL_HEIGHT}
      fill="url(#grad1)"
      stroke="#5a8a3e"
      strokeWidth="2"
    />
    <rect
      width={BILL_WIDTH}
      height={0.125 * BILL_HEIGHT}
      y={0.375 * BILL_HEIGHT}
      fill="#5a8a3e"
    />
    <text
      x={0.5 * BILL_WIDTH}
      y={0.3 * BILL_HEIGHT}
      fontSize={0.275 * BILL_HEIGHT}
      textAnchor="middle"
      fill="#ffffff"
    >
      $
    </text>
  </svg>
);

export function BillStack({ billCount, maxBillStack = 12 }: BillStackProps) {
  const stacks = splitIntoStacks(
    Array.from<number>({ length: billCount }).fill(0),
    maxBillStack,
  );

  return stacks.map((stack, offset) => {
    return (
      <g key={offset}>
        {stack.map((_, index) => (
          <g
            key={index}
            transform={`translate(${offset * BILL_WIDTH * 0.175}, ${30 - index}) scale(0.3)`}
          >
            {billSvg}
          </g>
        ))}
      </g>
    );
  });
}
