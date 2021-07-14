import * as React from "react";
import {ISession} from "../interfacesAndTypes";
import {Flex, Heading, Spinner} from "@chakra-ui/react";

const SessionCode: React.FC<{sessionDoc: ISession}> = ({sessionDoc}) => {
  const [isLoading, setIsloading] = React.useState(true);

  React.useEffect(() => {
    if (sessionDoc) {
      setIsloading(false);
    }
  }, [sessionDoc]);

  const handleCopy = () => {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", sessionDoc?.sessionCode);
  };

  return (
    <>
      {isLoading ? (
        <Spinner size="md" margin="1rem 2rem" />
      ) : (
        <Flex
          direction={{base: "column", md: "row"}}
          marginRight="2.5rem"
          marginTop="1rem"
          position="relative"
          zIndex="5"
          align="center"
        >
          <Heading as="h3" marginRight="2rem" fontSize="2rem">
            {`Code: `}
          </Heading>
          <Heading
            as="h3"
            fontSize="2rem"
            color="var(--main-color-dark)"
            cursor="pointer"
            onClick={handleCopy}
          >
            {sessionDoc?.sessionCode}
          </Heading>
        </Flex>
      )}
    </>
  );
};

export default SessionCode;
