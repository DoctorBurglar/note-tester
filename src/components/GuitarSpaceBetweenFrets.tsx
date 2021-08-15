import * as React from "react";
import {Box} from "@chakra-ui/react";
import {IGuitarNote} from "../interfacesAndTypes";
import {fretHeight} from "../constants";

type GuitarSpaceBetweenFretsProps = {
  note: IGuitarNote;
  innerInd: number;
  outerInd: number;
  fretIsInRange: (outerInd: number, innerInd: number) => boolean;
  handleFretAreaClick: () => void;
  selectedString: number;
  noteRangeAllowsDuplicates: boolean;
};

const GuitarSpaceBetweenFrets: React.FC<GuitarSpaceBetweenFretsProps> = ({
  noteRangeAllowsDuplicates,
  selectedString,
  handleFretAreaClick,
  outerInd,
  fretIsInRange,
  innerInd,
  note,
  children,
}) => {
  return (
    <Box
      onClick={handleFretAreaClick}
      key={note.name + innerInd}
      h={`${fretHeight}rem`}
      w="100%"
      display="inline-block"
      position="relative"
      zIndex="7"
      boxSizing="border-box"
      _hover={
        fretIsInRange(outerInd, innerInd) &&
        (outerInd + 1 === selectedString || !noteRangeAllowsDuplicates)
          ? {
              border: "4px solid var(--main-color-dark)",
              borderRadius: "5px",
            }
          : {}
      }
    >
      {children}
    </Box>
  );
};

export {GuitarSpaceBetweenFrets};
