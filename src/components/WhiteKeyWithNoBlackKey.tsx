import * as React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { WhiteKey, BlackKey } from "../styles";
import { whiteKeyWidth, blackKeyWidth } from "../constants";
import Flat from "../components/Flat";

type WhiteKeyWithNoBlackKeyProps = {
  note: string;
  ind: number;
  selectedNote: string;
  setSelectedNote: React.Dispatch<React.SetStateAction<string>>;
  thisWhiteKeyIsSelected: (note: string, ind: number) => boolean;
  thisBlackKeyIsSelected: (note: string, ind: number) => boolean;
  handleWhiteFlat: (event: React.SyntheticEvent, ind: number) => void;
};

const WhiteKeyWithNoBlackKey: React.FC<WhiteKeyWithNoBlackKeyProps> = ({
  note,
  ind,
  selectedNote,
  setSelectedNote,
  thisWhiteKeyIsSelected,
  thisBlackKeyIsSelected,
  handleWhiteFlat,
}) => {
  return (
    <>
      <WhiteKey
        onClick={() => setSelectedNote(note)}
        style={{
          backgroundColor: thisWhiteKeyIsSelected(note, ind) ? "lightblue" : "",
        }}
      >
        <Flex
          position="relative"
          h="60%"
          justify="flex-end"
          align="center"
          onClick={() => setSelectedNote(note[0] + "b" + note[1])}
          overflow="hidden"
          borderRadius="0 0 5px 5px"
        >
          <Box
            marginRight={`calc(0.11 * ${whiteKeyWidth})`}
            onClick={(event) => handleWhiteFlat(event, ind)}
            borderBottom={
              thisWhiteKeyIsSelected(note, ind) && selectedNote[1] === "b"
                ? "2px solid black"
                : ""
            }
          >
            <Flat width={13} fill="black" />
          </Box>
        </Flex>
      </WhiteKey>
      {ind === 0 ? (
        <BlackKey left={`calc((-${blackKeyWidth} / 2))`}>
          <Flex
            position="relative"
            h="100%"
            zIndex="10"
            justify="center"
            align="center"
            onClick={() => setSelectedNote(note[0] + "b" + note[1])}
            overflow="hidden"
            borderRadius="0 0 5px 5px"
            style={
              thisBlackKeyIsSelected(note, ind)
                ? {
                    backgroundColor: "lightblue",
                    color: "black",
                  }
                : {}
            }
          >
            <Heading
              color={thisBlackKeyIsSelected(note, ind) ? "black" : "white"}
              as="h1"
              textAlign="center"
              borderBottom={
                thisBlackKeyIsSelected(note, ind) &&
                selectedNote[1] === "b" &&
                note[0] === selectedNote[0]
                  ? "2px solid black"
                  : "none"
              }
            >
              <Flat
                width={13}
                fill={thisBlackKeyIsSelected(note, ind) ? "black" : "white"}
              />
            </Heading>
          </Flex>
        </BlackKey>
      ) : null}
    </>
  );
};

export default WhiteKeyWithNoBlackKey;
