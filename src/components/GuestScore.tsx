import React from "react";
import {useSession} from "../hooks";
import {Flex, Heading} from "@chakra-ui/react";
import {StyledButtonSmall} from "../styles";

const GuestScore: React.FC<{sessionId: string; isHost?: boolean}> = ({
  sessionId,
  isHost,
}) => {
  const {sessionDoc, sessionRef} = useSession(sessionId);

  const handleResetScore = () => {
    sessionRef.update({
      identifiedNotes: 0,
      totalNotes: 0,
      answer: "",
      answerStatus: "",
    });
  };

  return (
    <Flex w="28%" justify="space-between" align="center">
      <Heading as="h2">Score:</Heading>
      <Heading as="h2">{`${sessionDoc?.identifiedNotes} / ${sessionDoc?.totalNotes}`}</Heading>
      <Heading as="h2">
        {sessionDoc?.totalNotes === 0
          ? ""
          : `${Math.round(
              (sessionDoc?.identifiedNotes / sessionDoc?.totalNotes) * 100
            )}%`}
      </Heading>
      {isHost ? (
        <StyledButtonSmall onClick={handleResetScore}>Reset</StyledButtonSmall>
      ) : null}
    </Flex>
  );
};

export default GuestScore;
