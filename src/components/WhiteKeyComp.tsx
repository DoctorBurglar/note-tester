import * as React from "react";
import { WhiteKey } from "../styles";
import { Flex, Box } from "@chakra-ui/react";
import { whiteKeyWidth, trebleNotes } from "../constants";

type WhiteKeyCompProps = {
  keyNames: "BE" | "CF";
  note: string;
  ind: number;
  selectedNote: string;
  setSelectedNote: React.Dispatch<React.SetStateAction<string>>;
  thisWhiteKeyIsSelected: (note: string, ind: number) => boolean;
  handleWhiteAccidental: (event: React.SyntheticEvent, ind: number) => void;
};

const WhiteKeyComp: React.FC<WhiteKeyCompProps> = ({
  children,
  keyNames,
  note,
  ind,
  handleWhiteAccidental,
  thisWhiteKeyIsSelected,
  selectedNote,
  setSelectedNote,
}) => {
  const accidentalType = keyNames === "BE" ? "b" : "s";

  return (
    <WhiteKey
      onClick={() => setSelectedNote(note)}
      style={{
        border: note === trebleNotes.C4 ? "2px solid blue" : "",
        backgroundColor: thisWhiteKeyIsSelected(note, ind) ? "lightblue" : "",
      }}
    >
      {note[0] === keyNames[0] || note[0] === keyNames[1] ? (
        <Flex
          position="relative"
          h="60%"
          justify={keyNames === "BE" ? "flex-end" : "flex-start"}
          align="center"
          overflow="hidden"
          borderRadius="0 0 5px 5px"
        >
          {ind !== 0 ? (
            <Box
              marginRight={
                keyNames === "BE" ? `calc(0.11 * ${whiteKeyWidth})` : "none"
              }
              marginLeft={
                keyNames === "CF" ? `calc(0.11 * ${whiteKeyWidth})` : "none"
              }
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
          ) : null}
        </Flex>
      ) : null}
    </WhiteKey>
  );
};

export default WhiteKeyComp;
