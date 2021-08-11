import * as React from "react";
import {lineHeightInt, lineHeight} from "../constants";
import {Flex, Box} from "@chakra-ui/react";
import {Flat} from "./Flat";
import {Sharp} from "./Sharp";

type NoteProps = {selectedNote: string; notePosition: string};

const Note: React.FC<NoteProps> = ({selectedNote, notePosition}) => {
  return (
    <Flex
      transform={`translateY(${notePosition}) translateX(3rem)`}
      position="relative"
    >
      <Box
        maxWidth="5rem"
        objectFit="contain"
        position="absolute"
        top={-1.2 * lineHeightInt + "rem"}
        left={-1.1 * lineHeightInt + "rem"}
        display={selectedNote && selectedNote[1] === "b" ? "block" : "none"}
      >
        {/* <img src={flat} alt="flat sign" /> */}
        <Flat width={0.9 * lineHeightInt} fill="black" />
      </Box>
      <Box
        position="absolute"
        top={-0.77 * lineHeightInt + "rem"}
        left={-1.9 * lineHeightInt + "rem"}
        display={selectedNote && selectedNote[1] === "s" ? "block" : "none"}
      >
        {/* <img src={sharp} alt="sharp sign" /> */}
        <Sharp
          width={2.4 * lineHeightInt}
          fill="black"
          height={2.6 * lineHeightInt}
        />{" "}
      </Box>

      <Box
        border={!notePosition ? "none" : ".4rem solid black"}
        w={1.6 * lineHeightInt + "rem"}
        height={lineHeight}
        borderRadius="50%"
      />
    </Flex>
  );
};

export {Note};
