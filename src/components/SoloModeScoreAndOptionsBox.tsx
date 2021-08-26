import * as React from "react";
import {Flex} from "@chakra-ui/react";

const SoloModeScoreAndOptionsBox: React.FC = ({children}) => {
  return (
    <Flex
      marginBottom="1rem"
      marginLeft="2rem"
      direction="column"
      marginTop={{base: "-4.5rem", md: "-4.5rem"}}
    >
      {children}
    </Flex>
  );
};

export {SoloModeScoreAndOptionsBox};
