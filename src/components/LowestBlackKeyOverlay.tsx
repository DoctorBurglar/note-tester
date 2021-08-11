import * as React from "react";
import {Heading, Flex} from "@chakra-ui/react";
import {Flat} from "./Flat";

type LowestBlackKeyOverlayProps = {
  thisBlackKeyIsSelected: (note: string, ind: number) => boolean;
  note: string;
  ind: number;
  selectedNote: string;
};

const LowestBlackKeyOverlay: React.FC<LowestBlackKeyOverlayProps> = ({
  thisBlackKeyIsSelected,
  note,
  ind,
  selectedNote,
}) => {
  return (
    <Flex
      className="black-accidentals"
      position="relative"
      h="100%"
      zIndex="10"
      justify="center"
      align="center"
      overflow="hidden"
      borderRadius="0 0 5px 5px"
    >
      <Heading
        className="black-accidentals"
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
          width={0.8}
          fill={thisBlackKeyIsSelected(note, ind) ? "black" : "white"}
        />
      </Heading>
    </Flex>
  );
};

export {LowestBlackKeyOverlay};
