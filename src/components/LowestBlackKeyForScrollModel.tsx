import * as React from "react";
import {Box} from "@chakra-ui/react";

const LowestBlackKeyForScrollModel = () => {
  return (
    <Box
      position="absolute"
      right="100%"
      w="70%"
      bg="black"
      h="60%"
      transform="translateX(50%) translateY(-1px)"
      borderRadius="0 0 4px 4px"
    />
  );
};

export {LowestBlackKeyForScrollModel};
