import * as React from "react";
import {Button} from "@chakra-ui/react";
import firebase from "firebase";

const SignOut: React.FC = () => {
  return (
    <Button
      position="absolute"
      padding=".7rem 2rem"
      borderRadius="5px"
      top="2rem"
      right="2rem"
      fontSize="1.5rem"
      onClick={() => firebase.auth().signOut()}
      zIndex="5"
    >
      Sign Out
    </Button>
  );
};

export {SignOut};
