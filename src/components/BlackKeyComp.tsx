import * as React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { BlackKey } from "../styles";
import Flat from "./Flat";
import Sharp from "./Sharp";
import { whiteKeyWidth, blackKeyWidth } from "../constants";

type BlackKeyCompProps = {
  note: string;
  notes: string[];
  ind: number;
  selectedNote: string;
  setSelectedNote: React.Dispatch<React.SetStateAction<string>>;
  thisBlackKeyIsSelected: (note: string, ind: number) => boolean;
  handleFlat: (ind: number) => void;
};

const BlackKeyComp: React.FC<BlackKeyCompProps> = ({
  thisBlackKeyIsSelected,
  setSelectedNote,
  selectedNote,
  note,
  ind,
  notes,
  handleFlat,
}) => {
  return (
    <BlackKey
      style={{
        backgroundColor: thisBlackKeyIsSelected(note, ind) ? "lightblue" : "",
      }}
      left={`calc(${whiteKeyWidth} - (${blackKeyWidth} / 2))`}
    >
      <Flex
        position="absolute"
        h="100%"
        w="100%"
        direction="column"
        align="stretch"
      ></Flex>
      <Flex
        position="relative"
        h={ind === notes.length - 1 ? "100%" : "50%"}
        borderBottom={
          thisBlackKeyIsSelected(note, ind) && ind !== notes.length - 1
            ? "1px solid black"
            : ind !== notes.length - 1
            ? "1px solid white"
            : "none"
        }
        zIndex="10"
        justify="center"
        align="center"
        onClick={() => setSelectedNote(note[0] + "s" + note[1])}
      >
        <Box
          color={thisBlackKeyIsSelected(note, ind) ? "black" : "white"}
          as="h1"
          textAlign="center"
          borderBottom={
            thisBlackKeyIsSelected(note, ind) && selectedNote[1] === "s"
              ? "2px solid black"
              : "none"
          }
        >
          <Sharp
            fill={thisBlackKeyIsSelected(note, ind) ? "black" : "white"}
            width={17}
            height={30}
          />
        </Box>
      </Flex>
      <Flex
        position="relative"
        h={ind === notes.length - 1 ? "0" : "50%"}
        zIndex="10"
        justify="center"
        align="center"
        overflow="hidden"
        onClick={() => handleFlat(ind)}
      >
        <Heading
          color={thisBlackKeyIsSelected(note, ind) ? "black" : "white"}
          as="h1"
          textAlign="center"
          borderBottom={
            thisBlackKeyIsSelected(note, ind) && selectedNote[1] === "b"
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
  );
};

export default BlackKeyComp;
