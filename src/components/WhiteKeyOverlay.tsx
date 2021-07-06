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
        <>
          <Flex
            position="relative"
            h="60%"
            justify={isBOrE ? "flex-end" : "flex-start"}
            align="center"
            overflow="hidden"
            borderRadius="0 0 5px 5px"
          >
            {ind === 0 && isCOrF ? null : (
              <Box
                marginRight={isBOrE ? `calc(0.11 * ${whiteKeyWidth})` : "none"}
                marginLeft={isCOrF ? `calc(0.11 * ${whiteKeyWidth})` : "none"}
                onClick={(event) => handleWhiteAccidental(event, ind)}
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
        </>
      ) : null}
    </>
  );
};

export default WhiteKeyOverlay;
