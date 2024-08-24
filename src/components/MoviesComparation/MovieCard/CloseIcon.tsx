import { SVGProps } from "react";

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h24v24H0z" />
        <circle
          cx={12}
          cy={12}
          r={9}
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth={2}
        />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth={2}
          d="m14.121 9.879-4.242 4.242M9.879 9.879l4.242 4.242"
        />
      </g>
    </svg>
  );
}
