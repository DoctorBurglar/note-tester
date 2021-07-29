import * as React from "react";
import {Flex, Box} from "@chakra-ui/react";
import {whiteKeyWidth} from "../constants";

type WhiteKeyOverlayProps = {
  note: string;
  ind: number;
  selectedNote: string;
  thisWhiteKeyIsSelected: (note: string, ind: number) => boolean;
  handleWhiteAccidental: (event: React.SyntheticEvent, ind: number) => void;
  displayingNotes: boolean;
};

const WhiteKeyOverlay: React.FC<WhiteKeyOverlayProps> = ({
  note,
  ind,
  handleWhiteAccidental,
  thisWhiteKeyIsSelected,
  selectedNote,
  children,
}) => {
  const accidentalType = note[0] === "B" || note[0] === "E" ? "b" : "s";

  const isBOrE = note[0] === "B" || note[0] === "E";

  const isCOrF = note[0] === "C" || note[0] === "F";

  return (
    <>
      {isBOrE || isCOrF ? (
        <Flex
          position="relative"
          height="50%"
          justify={isBOrE ? "flex-end" : "flex-start"}
          align="flex-end"
          overflow="hidden"
          className="accidentals"
          onClick={(event) => handleWhiteAccidental(event, ind)}
          borderBottom="1px solid black"
        >
          {ind === 0 && isCOrF ? null : (
            <Box
              marginRight={isBOrE ? `calc(2.5 * ${whiteKeyWidth})` : "none"}
              marginLeft={isCOrF ? `calc(2.5 * ${whiteKeyWidth})` : "none"}
              marginBottom="1rem"
              borderBottom={
                thisWhiteKeyIsSelected(note, ind) &&
                selectedNote[1] === accidentalType
                  ? "2px solid black"
                  : ""
              }
            >
              {children}
            </Box>
          )}
        </Flex>
      ) : null}
    </>
  );
};

export default WhiteKeyOverlay;
