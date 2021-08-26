import * as React from "react";
import {Flex} from "@chakra-ui/react";

const ButtonsBox: React.FC = ({children}) => {
  return (
    <Flex
      position="relative"
      h="0"
      margin="1.5rem 0 -1rem 0"
      padding="0 2rem"
      direction="column"
    >
      {children}
    </Flex>
  );
};

export {ButtonsBox};
