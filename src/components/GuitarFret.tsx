import * as React from "react";
import {Box} from "@chakra-ui/react";
import {fretBoardHeight} from "../constants";

type GuitarFretProps = {
  outerInd: number;
  innerInd: number;
};

const GuitarFret: React.FC<GuitarFretProps> = ({outerInd, innerInd}) => {
  return (
    <Box
      minHeight={outerInd === 0 && innerInd > 0 ? `${fretBoardHeight}rem` : ""}
      position="absolute"
      right="0"
      minWidth=".4rem"
      bg="var(--guitar-fret-silver)"
      zIndex="2"
      borderRadius="3px"
      backgroundImage="linear-gradient(to right, transparent, var(--guitar-fret-shine-2), transparent), linear-gradient(to top, var(--guitar-fret-silver) 65%, var(--guitar-fret-shine) 83%, var(--guitar-fret-silver) 100%)"
      boxShadow="2px 1px 6px rgb(0,0,0,0.4)"
    />
  );
};

export {GuitarFret};
