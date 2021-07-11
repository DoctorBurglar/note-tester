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
    <Flex
      w="10%"
      minWidth="8rem"
      align={{base: "flex-start", md: "center"}}
      margin="1rem 0 0 2rem"
      direction={{base: "column", md: "row"}}
    >
      <Flex
        align="center"
        minWidth="10rem"
        marginBottom={{base: "1rem", md: "0"}}
      >
        <Heading as="h2" fontSize="1.5rem" marginRight="1rem">
          Score:
        </Heading>
        <Heading
          as="h2"
          fontSize="1.5rem"
        >{`${sessionDoc?.identifiedNotes} / ${sessionDoc?.totalNotes}`}</Heading>
      </Flex>
      {/* <Heading as="h2">
        {sessionDoc?.totalNotes === 0
          ? ""
          : `${Math.round(
              (sessionDoc?.identifiedNotes / sessionDoc?.totalNotes) * 100
            )}%`}
      </Heading> */}
      {isHost ? (
        <StyledButtonSmall onClick={handleResetScore}>Reset</StyledButtonSmall>
      ) : null}
    </Flex>
  );
};

export default GuestScore;
