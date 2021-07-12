import * as React from "react";
import {Flex, Heading, Link} from "@chakra-ui/react";
import {SignOut} from "./SignOut";
import {NavLink} from "react-router-dom";

type HeaderProps = {
  isNotAuthenticated?: boolean;
};

const Header: React.FC<HeaderProps> = ({children, isNotAuthenticated}) => {
  return (
    <Flex
      w="100%"
      bg="var(--grey-dark)"
      align="center"
      justify="space-between"
      padding="1rem"
      direction={{base: "column", sm: "row"}}
    >
      <Heading
        as="h2"
        marginLeft={{base: "none", sm: "1.5rem", md: "2rem"}}
        color="var(--white)"
        fontWeight="300"
        fontSize="2.5rem"
      >
        TeachMeNotes.com
      </Heading>
      <Flex align="center" marginTop={{base: "1rem", sm: "none"}}>
        {isNotAuthenticated ? null : (
          <Link
            as={NavLink}
            to="/"
            color="white"
            marginRight={{base: "1rem", md: "4rem"}}
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

export default Header;
