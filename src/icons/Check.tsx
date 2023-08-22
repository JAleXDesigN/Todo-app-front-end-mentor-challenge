import type { FC, SVGProps } from "react";

const Check: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <circle
      cx="12"
      cy="12"
      r="11.5"
      fill="#fff"
      stroke="#E3E4F1"
    />
    <circle
      cx="12"
      cy="12"
      r="12"
      fill="url(#a)"
    />
    <path
      d="m8 12.3 2.7 2.7 6-6"
      stroke="#fff"
      strokeWidth="2"
    />
    <defs>
      <linearGradient
        id="a"
        x1="-12"
        y1="12"
        x2="12"
        y2="36"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5DF" />
        <stop
          offset="1"
          stopColor="#C058F3"
        />
      </linearGradient>
    </defs>
  </svg>
);

export default Check;
