import { splitIntoStacks } from "./utils";

type CoinStackProps = {
  coinCount: number;
  maxCoinStack: number;
};

const COIN_WIDTH = 6;
const COIN_HEIGHT = COIN_WIDTH;

const coinSvg = (
  <svg
    width={COIN_WIDTH}
    height={COIN_HEIGHT}
    viewBox={`0 0 ${COIN_WIDTH * 5} ${COIN_HEIGHT * 5}`}
    version="1.1"
  >
    <defs>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
        <stop stopColor="#FFC923" offset="0%" />
        <stop stopColor="#FFAD41" offset="100%" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <g fillRule="nonzero">
        <path
          d="M15.0015318,0 C23.2459666,0 30.0283147,3.84541158 30.0014522,8.89840846 C29.9965884,9.80284326 29.7747958,10.6686433 29.3668043,11.4805986 C29.78428,12.3063345 30.0063567,13.1886424 30.0014522,14.1112045 C29.9743184,19.1568024 23.1958752,23 15.0015318,23 C6.80718838,23 0.0287452493,19.1568024 0.00161125443,14.1111777 C-0.00329319505,13.1886205 0.218783563,12.3063166 0.63529835,11.4803202 C0.228267728,10.6686252 0.00647508416,9.80282127 0.00161125443,8.89838167 C-0.0252510763,3.84541158 6.75709701,0 15.0015318,0 Z"
          fill="url(#linearGradient-1)"
        />
        <path
          d="M30.001,8.88238167 L30.0020465,13.6575532 C27.173493,17.2189187 21.4467641,19.5622885 15.0015318,19.5622885 C8.49193397,19.5622885 2.76785045,17.3112139 -3.21964677e-14,13.7699861 L0.001,8.90638167 L30.001,8.88238167 Z M30.0015317,8.90800594 L0.00137409822,8.89838167 C0.0287452493,13.9440064 6.80718838,17.787204 15.0015317,17.787204 C23.1958752,17.787204 29.9742388,13.9536039 30.0015317,8.90800594 Z"
          fill="#DF960A"
        />
      </g>
    </g>
  </svg>
);

export function CoinStack({ coinCount, maxCoinStack = 5 }: CoinStackProps) {
  const stacks = splitIntoStacks(coinCount, maxCoinStack);

  return stacks.map((stack, offset) => {
    return (
      <g>
        {Array.from({ length: stack }).map((_, index) => (
          <g
            key={index}
            transform={`translate(${offset * 2}, ${30 - index}) scale(0.3)`}
          >
            {coinSvg}
          </g>
        ))}
      </g>
    );
  });
}
