import * as React from "react";

type FlatProps = {
  fill: string;
  width: number;
};

const Flat: React.FC<FlatProps> = ({fill, width}) => {
  return (
    <svg
      width={width + "rem"}
      viewBox="0 0 59 158"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4.99992 0.0253296L4 157" stroke={fill} stroke-width="8" />
      <path
        d="M4.5 89.5484C37.432 61.727 50.1427 75.072 52.8976 92.1774C53.7249 97.3141 52.7837 102.564 50.7821 107.367C40.0367 133.149 18.9677 151.939 3 153"
        stroke={fill}
        stroke-width="10"
      />
      <path
        d="M4.63988 89.3939C29.4295 74.0693 39.99 82.8133 43.1123 91.2941C43.9282 93.5102 44.0341 95.9091 43.9491 98.2691C42.6397 134.629 16.3765 146.592 3 148"
        stroke={fill}
        stroke-width="12"
      />
      <rect y="155" width="5" height="3" rx="1.5" fill={fill} />
    </svg>
  );
};

export default Flat;
