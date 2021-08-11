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
          margin="1rem"
          position="relative"
          zIndex="5"
          align={{base: "flex-start", md: "flex-end"}}
        >
          <Heading
            as="h3"
            marginRight="1rem"
            fontSize={{base: "1rem", md: "1.5rem"}}
          >
            {`Code: `}
          </Heading>
          <Heading
            as="h3"
            fontSize={{base: "1.5rem", md: "2rem"}}
            color="var(--main-color-dark)"
            cursor="pointer"
            onClick={handleCopy}
            marginBottom="-.1rem"
            _hover={{color: "var(--main-color-very-dark)"}}
          >
            {sessionDoc?.sessionCode}
          </Heading>
        </Flex>
      )}
    </>
  );
};

export {SessionCode};
