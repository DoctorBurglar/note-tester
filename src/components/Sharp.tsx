import * as React from "react";

type SharpProps = {
  fill: string;
  width: number;
  height: number;
};

const Sharp: React.FC<SharpProps> = ({fill, width, height}) => {
  return (
    <svg
      width={width + "rem"}
      height={height + "rem"}
      viewBox="0 0 87 171"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="26.5"
        y1="11"
        x2="26.5"
        y2="171"
        stroke={fill}
        strokeWidth="9"
      />
      <line x1="59.5" x2="59.5" y2="160" stroke={fill} strokeWidth="9" />
      <path
        d="M4.44868 74.8604L43.2304 61.983L82.0121 49.1057"
        stroke={fill}
        strokeWidth="18"
      />
      <path
        d="M4.44868 121.755L43.2304 108.877L82.0121 96"
        stroke={fill}
        strokeWidth="18"
      />
    </svg>
  );
};

export {Sharp};
