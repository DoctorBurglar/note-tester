import * as React from "react";
import {Button} from "@chakra-ui/react";
import firebase from "firebase";

const SignOut: React.FC = () => {
  const handleSignOut = () => {
    firebase.auth().signOut();
    // .then(() => {
    //   history.push(".");
    //   window.location.reload();
    // });
  };

  return (
    <Button
      padding=".3rem 1rem"
      marginRight={{base: "none", sm: "1.5rem", md: "2rem"}}
      borderRadius="5px"
      fontSize="1rem"
      onClick={handleSignOut}
      zIndex="5"
    >
      Sign Out
    </Button>
  );
};

export {SignOut};
