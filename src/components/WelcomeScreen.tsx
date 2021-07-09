import * as React from "react";
import {
  Flex,
  Image,
  Heading,
  UnorderedList,
  ListItem,
  List,
} from "@chakra-ui/react";
import {Login} from "./Login";
import Header from "./Header";

const WelcomeScreen = () => {
  const featureArray = [
    "Hand pick the notes for your student to identify",
    "Display mnemonics on the staff to help beginners get started",
    "Optionally show the names of the notes on the keyboard",
    "Practice reading up to 4 ledger lines above or below staff",
    "Absolutely free, no credit card required",
  ];

  return (
    <>
      <Header isNotAuthenticated>
        <Login />
      </Header>
      <Flex w="90rem" direction="column" margin="1rem auto">
        <Flex justifyContent="center">
          <Flex w="45%" direction="column" margin="2rem">
            <Heading as="h2" fontSize="3rem" margin="1rem 0 1rem 0">
              A free teaching tool for{" "}
              <span style={{color: "var(--main-color-dark)"}}>
                note reading
              </span>
            </Heading>
            <UnorderedList
              margin="-1rem 2rem 0 0"
              padding="2rem"
              fontWeight="bold"
            >
              {featureArray.map((feature) => {
                return (
                  <ListItem marginBottom="1rem" key={feature} fontSize="1.5rem">
                    {feature}
                  </ListItem>
                );
              })}
            </UnorderedList>
          </Flex>
          <Flex justify="flex-start" direction="column" align="center">
            <Image
              h="25rem"
              marginTop="2.2rem"
              src="https://storage.googleapis.com/teach-me-notes/NoteTester.png"
            ></Image>
            <Heading as="h2" color="var(--main-color-dark)" fontSize="2rem">
              Click "Sign in with Google" to get started
            </Heading>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default WelcomeScreen;
