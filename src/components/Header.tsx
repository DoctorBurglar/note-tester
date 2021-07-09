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
      h="4rem"
      w="100%"
      bg="var(--grey-dark)"
      align="center"
      justify="space-between"
    >
      <Heading
        as="h2"
        marginLeft="2rem"
        color="var(--white)"
        fontWeight="300"
        fontSize="2rem"
      >
        TeachMeNotes.com
      </Heading>
      <Flex align="center">
        {isNotAuthenticated ? null : (
          <Link
            as={NavLink}
            to="/"
            color="white"
            marginRight="4rem"
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
