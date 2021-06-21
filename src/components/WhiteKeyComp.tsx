import * as React from "react";
import { WhiteKey } from "../styles";
import { Flex, Box, Heading } from "@chakra-ui/react";
import { whiteKeyWidth } from "../constants";

type WhiteKeyCompProps = {
  note: string;
  ind: number;
  selectedNote: string;
  setSelectedNote: React.Dispatch<React.SetStateAction<string>>;
  thisWhiteKeyIsSelected: (note: string, ind: number) => boolean;
  handleWhiteAccidental: (event: React.SyntheticEvent, ind: number) => void;
  displayingNotes: boolean;
};

const WhiteKeyComp: React.FC<WhiteKeyCompProps> = ({
  children,
  note,
  ind,
  handleWhiteAccidental,
  thisWhiteKeyIsSelected,
  selectedNote,
  setSelectedNote,
  displayingNotes,
}) => {
  const accidentalType = note[0] === "B" || note[0] === "E" ? "b" : "s";

  const isBOrE = note[0] === "B" || note[0] === "E";

  const isCOrF = note[0] === "C" || note[0] === "F";

  return (
    <>
      <WhiteKey
        onClick={() => setSelectedNote(note)}
        style={{
          backgroundColor: thisWhiteKeyIsSelected(note, ind) ? "lightblue" : "",
        }}
      >
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
                  marginRight={
                    isBOrE ? `calc(0.11 * ${whiteKeyWidth})` : "none"
                  }
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
        <Flex flex="1" direction="column" justify="flex-end">
          <Heading as="h1" textAlign="center">
            {displayingNotes ? note[0] : ""}
          </Heading>
        </Flex>
      </WhiteKey>
      {note === "C4" ? (
        <Heading as="h1" textAlign="center" marginTop=".5rem">
          M
        </Heading>
      ) : null}
    </>
  );
};

export default WhiteKeyComp;
