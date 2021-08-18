import * as React from "react";
import {Flex, Heading, Link, Image} from "@chakra-ui/react";
import {SignOut} from "./SignOut";
import {NavLink, useHistory} from "react-router-dom";

type HeaderProps = {
  isNotAuthenticated?: boolean;
};

const Header: React.FC<HeaderProps> = ({children, isNotAuthenticated}) => {
  const history = useHistory();

  const isHomePage = history.location.pathname === "/";

  return (
    <Flex
      w="100%"
      h={{base: "7rem", md: "5rem"}}
      bg="var(--grey-dark)"
      align="center"
      justify="space-between"
      padding={{base: "none", md: "1rem"}}
      direction="row"
    >
      <Flex align="center">
        <Image
          boxSize="3.5rem"
          marginLeft={{base: "2rem", sm: "1.5rem", md: "2rem"}}
          src="https://storage.googleapis.com/teach-me-notes/TeachMeNotesIcon.png"
        ></Image>
        <Heading
          as="h2"
          marginLeft="1rem"
          color="var(--white)"
          fontWeight="300"
          display={{base: "none", sm: "flex"}}
          fontSize={{base: "2rem", md: "2.5rem"}}
        >
          TeachMeNotes.com
        </Heading>
      </Flex>

      <Flex justify="flex-end" align="center" minWidth="16rem">
        {isHomePage || isNotAuthenticated ? null : (
          <Link
            as={NavLink}
            to="/"
            color="white"
            marginRight={{base: "2rem", md: "4rem"}}
            fontSize="1.3rem"
          >
            Sessions
          </Link>
        )}
        {isNotAuthenticated ? children : <SignOut />}
      </Flex>
    </Flex>
  );
};

export {Header};
