import * as React from "react";
import {Flex, Image, Heading, UnorderedList, ListItem} from "@chakra-ui/react";
import {Login} from "./Login";
import Header from "./Header";

const WelcomeScreen = () => {
  const featureArray = [
    "Hand pick the notes for your student to identify",
    "Display mnemonics on the staff to help beginners get started",
    "Optionally show the names of the notes on the keyboard",
    "Practice reading up to 4 ledger lines above or below the staff",
    "Absolutely free, no credit card required",
  ];

  return (
    <>
      <Header isNotAuthenticated>
        <Login />
      </Header>
      <Flex
        w="90%"
        maxWidth="80rem"
        margin="1rem auto"
        direction="column"
        align="center"
      >
        <Heading
          as="h2"
          fontSize="3rem"
          margin="1rem 0 1rem 0"
          textAlign="center"
        >
          A free teaching tool for{" "}
          <span style={{color: "var(--main-color-dark)"}}>note reading</span>
        </Heading>
        <Flex
          justifyContent="center"
          align={{base: "center", md: "flex-start"}}
          direction={{base: "column-reverse", md: "row"}}
        >
          <Flex
            w={{base: "100", md: "40%"}}
            direction="column"
            margin="2rem"
            marginLeft={{base: "3rem"}}
          >
            <UnorderedList
              margin="0 2rem 0 0"
              padding="1rem 0"
              fontWeight="bold"
              transform="translateX(1rem)"
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
          <Flex
            justify="flex-start"
            direction="column"
            align="center"
            w={{base: "90", md: "50%"}}
          >
            <Image
              w="100%"
              marginTop={{base: "", md: "3rem", lg: "2rem", xl: "1rem"}}
              src="https://storage.googleapis.com/teach-me-notes/NoteTester.png"
            ></Image>
            <Heading
              as="h2"
              color="var(--main-color-dark)"
              fontSize="2rem"
              textAlign="center"
              marginTop="2rem"
            >
              Click "Sign in with Google" to get started
            </Heading>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default WelcomeScreen;
