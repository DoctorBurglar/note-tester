import * as React from "react";
import {Box} from "@chakra-ui/react";

const BlackKeyForScrollModel: React.FC<{background: string}> = ({
  background,
}) => {
  return (
    <Box
      position="absolute"
      left="100%"
      w="70%"
      border="1px solid black"
      bg={background}
      h="60%"
      transform="translateX(-50%) translateY(-1px)"
      borderRadius="0 0 3px 3px"
      zIndex="3"
    />
  );
};

export {BlackKeyForScrollModel};
