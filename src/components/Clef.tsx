import * as React from "react";
import {Box} from "@chakra-ui/react";
import {lineHeightInt, clefs} from "../constants";
import {TrebleClef} from "./TrebleClef";
import {BassClef} from "./BassClef";

const Clef: React.FC<{selectedClef: string}> = ({selectedClef}) => {
  return (
    <>
      {selectedClef === clefs.TREBLE ? (
        <Box
          position="absolute"
          top={3.35 * lineHeightInt + "rem"}
          left="-1.5rem"
        >
          <TrebleClef
            width={4.6666666667 * lineHeightInt + "rem"}
            fill="black"
          />
        </Box>
      ) : selectedClef === clefs.BASS ? (
        <Box
          position="absolute"
          top={3.1666666667 * lineHeightInt + "rem"}
          left="-1.5rem"
        >
          <BassClef width={4.8 * lineHeightInt + "rem"} fill="black" />
        </Box>
      ) : null}
    </>
  );
};

export {Clef};
