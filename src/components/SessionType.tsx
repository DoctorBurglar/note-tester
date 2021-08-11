import * as React from "react";
import {Flex, Heading} from "@chakra-ui/react";
import styled from "@emotion/styled";

const SessionBox = styled(Flex)`
  flex-direction: column;
  width: 15%;
  min-width: 20rem;
  justify-content: space-between;
  margin: 0 3rem 4rem 3rem;
`;

type SessionTypeProps = {
  description: string;
  title: string;
};

const SessionType: React.FC<SessionTypeProps> = ({
  children,
  description,
  title,
}) => {
  return (
    <SessionBox>
      <Flex direction="column">
        <Heading as="h1" fontSize="2.3rem" fontWeight="500" marginBottom="1rem">
          <span style={{color: "var(--main-color-dark)"}}>{title}</span> Session
        </Heading>
        <Flex
          display={{base: "none", sm: "flex"}}
          direction="column"
          fontSize="1.5rem"
          justify="space-between"
          marginBottom="1rem"
        >
          <p>{description}</p>
        </Flex>
      </Flex>

      <Flex direction="column" justifyContent="flex-end">
        {children}
      </Flex>
    </SessionBox>
  );
};

export {SessionType};
