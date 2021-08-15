import * as React from "react";
import {Box} from "@chakra-ui/react";
import {fretBoardHeight} from "../constants";

const GuitarNut = () => {
  return (
    <Box
      minHeight={`${fretBoardHeight}rem`}
      position="absolute"
      minWidth="1rem"
      bg="var(--guitar-nut)"
      zIndex="2"
      borderRadius="1px"
      boxShadow="2px 1px 6px rgb(0,0,0,0.4)"
      right="0"
    />
  );
};

export {GuitarNut};
