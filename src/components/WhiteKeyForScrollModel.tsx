import * as React from "react";
import {Box} from "@chakra-ui/react";

type WhiteKeyForScrollModelProps = {
  note: string;
  notes: string[];
  background: string;
};

const WhiteKeyForScrollModel: React.FC<WhiteKeyForScrollModelProps> = ({
  note,
  notes,
  background,
  children,
}) => {
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
