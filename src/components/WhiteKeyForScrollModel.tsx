import * as React from "react";
import {Box} from "@chakra-ui/react";

const WhiteKeyForScrollModel: React.FC<{
  note: string;
  notes: string[];
  background: string;
}> = ({note, notes, background, children}) => {
  return (
    <Box
      key={note}
      w={`${100 / notes.length}%`}
      border="1px solid black"
      borderRadius="0 0 3px 3px"
      h="5rem"
      position="relative"
      bg={background}
    >
      {children}
    </Box>
  );
};

export {WhiteKeyForScrollModel};
