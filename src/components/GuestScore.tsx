import React from "react";
import {useSession} from "../hooks";
import {Flex, Heading, Spinner} from "@chakra-ui/react";
import {StyledButtonSmall} from "../styles";

const GuestScore: React.FC<{sessionId: string; isHost?: boolean}> = ({
  sessionId,
  isHost,
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const {sessionDoc, sessionRef} = useSession(sessionId);

  React.useEffect(() => {
    if (sessionDoc) {
      setIsLoading(false);
    }
  }, [sessionDoc]);

  const handleResetScore = () => {
    sessionRef.update({
      identifiedNotes: 0,
      totalNotes: 0,
      answer: "",
      answerStatus: "",
    });
  };

  return (
    <>
      {isLoading ? (
        <Spinner size="xl" margin="1rem 0 0 2.5rem" />
      ) : (
        <Flex
          w="10%"
          minWidth="10rem"
          align={{base: "flex-start", md: "center"}}
          margin="1rem 0 .5rem 2.5rem"
          direction={{base: "column", md: "row"}}
          position="relative"
          zIndex="5"
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

          {isHost ? (
            <StyledButtonSmall onClick={handleResetScore}>
              Reset
            </StyledButtonSmall>
          ) : null}
        </Flex>
      )}
    </>
  );
};

export default GuestScore;
