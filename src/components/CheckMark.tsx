import * as React from "react";
import {Flex, Heading} from "@chakra-ui/react";

const CheckMark = () => {
  return (
    <Flex
      height="100%"
      width="100%"
      align="flex-end"
      justify="center"
      position="absolute"
      top="0"
    >
      <Heading as="h2" fontSize="2rem">
        &#10003;
      </Heading>
    </Flex>
  );
};

export {CheckMark};
