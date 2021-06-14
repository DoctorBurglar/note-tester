import * as React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { blackKeyWidth } from "../constants";
import { BlackKey } from "../styles";
import Flat from "../components/Flat";

type LowestBlackKeyProps = {
  selectedNote: string;
  ind: number;
  setSelectedNote: React.Dispatch<React.SetStateAction<string>>;
  thisBlackKeyIsSelected: (note: string, ind: number) => boolean;
  note: string;
};

const LowestBlackKey: React.FC<LowestBlackKeyProps> = ({
  selectedNote,
  ind,
  setSelectedNote,
  note,
  thisBlackKeyIsSelected,
}) => {
  return (
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
  );
};

export default LowestBlackKey;
