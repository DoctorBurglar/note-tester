import {Flex, Heading, UnorderedList, ListItem} from "@chakra-ui/react";
import {Login} from "./Login";
import {Header} from "./Header";
import {KeyboardOrGuitarPicture} from "./KeyboardOrGuitarPicture";

const WelcomeScreen = () => {
  const featureArray = [
    "Practice note reading on piano or guitar",
    "Host sessions to teach others",
    "Helpful mnemonics for beginners",
    "Display note names on keyboard or guitar while learning",
    "Up to four ledger lines above/below staff",
    "Absolutely free, no credit card required",
  ];

  return (
    <>
      <Header isNotAuthenticated>
        <Login />
      </Header>
      <Flex
        w="90%"
        maxWidth="90rem"
        margin="1rem auto"
        direction="column"
        align="center"
      >
        <Heading
          as="h2"
          fontSize="3rem"
          margin={{base: "3rem 0 ", md: "1rem 0"}}
          textAlign="center"
        >
          A free teaching tool for{" "}
          <span style={{color: "var(--main-color-dark)"}}>note reading</span>
        </Heading>
        <Flex
          justifyContent="center"
          align={{base: "center", lg: "flex-start"}}
          direction={{base: "column-reverse", lg: "row"}}
        >
          <Flex
            w={{base: "100", lg: "40%"}}
            direction="column"
            margin="2rem"
            marginLeft={{base: "3rem"}}
          >
            <UnorderedList
              marginTop={{base: "2rem", md: "0"}}
              marginRight="2rem"
              padding="1rem 0"
              fontWeight="bold"
              transform="translateX(1rem)"
            >
              {featureArray.map((feature) => {
                return (
                  <ListItem
                    marginBottom="1.5rem"
                    key={feature}
                    fontSize="1.5rem"
                  >
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
            w={{base: "90", lg: "50%"}}
          >
            <KeyboardOrGuitarPicture />

            <Heading
              as="h2"
              color="var(--grey-dark)"
              fontSize="2rem"
              textAlign="center"
              marginTop={{base: "4rem", md: "2rem"}}
            >
              Click{" "}
              <span style={{color: "var(--main-color-dark)"}}>
                "Sign in with Google"
              </span>{" "}
              to get started
            </Heading>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export {WelcomeScreen};
