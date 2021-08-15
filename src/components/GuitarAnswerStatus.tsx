import * as React from "react";
import {Heading} from "@chakra-ui/react";
import {answerStatusOptions} from "../constants";

const GuitarAnswerStatus: React.FC<{answerStatus: string}> = ({
  answerStatus,
}) => {
  return (
    <Heading
      as="h2"
      marginRight="1rem"
      alignSelf="flex-end"
      position="absolute"
      fontSize={{base: "1.5rem", md: "2rem"}}
      right={{base: "0", md: "5%"}}
      bottom={{base: "0", md: "1rem"}}
    >
      {!answerStatus
        ? null
        : answerStatus === answerStatusOptions.CORRECT
        ? "Correct!"
        : "Incorrect :("}
    </Heading>
  );
};

export {GuitarAnswerStatus};
