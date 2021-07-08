import React from "react";
import {useSession} from "../hooks";
import {Flex, Heading} from "@chakra-ui/react";

const GuestScore: React.FC<{sessionId: string}> = ({sessionId}) => {
  const {sessionDoc} = useSession(sessionId);

  return (
    <Flex w="28%" justify="space-between" align="center">
      <Heading as="h2">StudentScore:</Heading>
      <Heading as="h2">{`${sessionDoc?.identifiedNotes} / ${sessionDoc?.totalNotes}`}</Heading>
      <Heading as="h2">
        {sessionDoc?.totalNotes === 0
          ? ""
          : `${Math.round(
              (sessionDoc?.identifiedNotes / sessionDoc?.totalNotes) * 100
            )}%`}
      </Heading>
    </Flex>
  );
};

export default GuestScore;
