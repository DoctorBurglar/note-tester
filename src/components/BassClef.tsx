import * as React from "react";

type BassClefProps = {
  width: string;
  fill: string;
};

const BassClef: React.FC<BassClefProps> = ({ width, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="svg3033"
      viewBox="0 0 744.09 1052.4"
      version="1.1"
      width={width}
    >
      <title id="title3077">Bass Clef</title>
      <defs id="defs3035">
        <linearGradient
          id="linearGradient3770"
          y2="231.09"
          gradientUnits="userSpaceOnUse"
          x2="-190.88"
          gradientTransform="translate(729.67 -22.021)"
          y1="770.94"
          x1="-543.25"
        >
          <stop id="stop3015-9" stop-opacity=".82639" offset="0" />
          <stop id="stop3017-0" offset="1" />
        </linearGradient>
      </defs>
      <g id="layer1">
        <path
          id="path3"
          d="m190.85 451.25c11.661 14.719 32.323 24.491 55.844 24.491 36.401 0 65.889-23.372 65.889-52.214s-29.488-52.214-65.889-52.214c-20.314 4.1522-28.593 9.0007-33.143-2.9091 17.976-54.327 46.918-66.709 96.546-66.709 65.914 0 96.969 59.897 96.969 142.97-18.225 190.63-205.95 286.75-246.57 316.19 5.6938 13.103 5.3954 12.631 5.3954 12.009 189.78-86.203 330.69-204.43 330.69-320.74 0-92.419-58.579-175.59-187.72-172.8-77.575 0-170.32 86.203-118 171.93zm328.1-89.88c0 17.852 14.471 32.323 32.323 32.323s32.323-14.471 32.323-32.323-14.471-32.323-32.323-32.323-32.323 14.471-32.323 32.323zm0 136.75c0 17.852 14.471 32.323 32.323 32.323s32.323-14.471 32.323-32.323-14.471-32.323-32.323-32.323-32.323 14.471-32.323 32.323z"
          stroke={fill}
          fill="url(#linearGradient3770)"
          fill-rule="evenodd"
        />
      </g>
    </svg>
  );
};

export default BassClef;
