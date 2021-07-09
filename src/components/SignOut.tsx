import * as React from "react";
import {Button} from "@chakra-ui/react";
import firebase from "firebase";

const SignOut: React.FC = () => {
  return (
    <Button
      padding=".3rem 1rem"
      marginRight="2rem"
      borderRadius="5px"
      fontSize="1rem"
      onClick={() => firebase.auth().signOut()}
      zIndex="5"
    >
      Sign Out
    </Button>
  );
};

export {SignOut};
