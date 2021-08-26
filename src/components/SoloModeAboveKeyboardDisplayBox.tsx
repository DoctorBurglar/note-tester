import * as React from "react";
import {Flex} from "@chakra-ui/react";

const SoloModeAboveKeyboardDisplayBox: React.FC = ({children}) => {
  return (
    <Flex
      w="90%"
      justify="space-between"
      position="relative"
      margin="0 auto"
      maxWidth="var(--max-width)"
    >
      {children}
    </Flex>
  );
};

export {SoloModeAboveKeyboardDisplayBox};
