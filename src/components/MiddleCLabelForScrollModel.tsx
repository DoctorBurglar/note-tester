import * as React from "react";
import {Heading} from "@chakra-ui/react";

const MiddleCLabelForScrollModel = () => {
  return (
    <Heading
      as="h3"
      position="absolute"
      bottom="-2rem"
      left="50%"
      transform="translateX(-50%)"
      fontSize="1.5rem"
    >
      M
    </Heading>
  );
};

export {MiddleCLabelForScrollModel};
