import * as React from "react";
import {useAuth} from "reactfire";
import {StyledFirebaseAuth} from "react-firebaseui";
import "firebaseui/dist/firebaseui.css";

const Login: React.FC = () => {
  const auth = useAuth;

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [auth.GoogleAuthProvider.PROVIDER_ID],
    // added this property to refresh page to avoid reactfire login bug
    signInSuccessUrl: "/",
    // callbacks: {
    //   // Avoid redirects after sign-in.  Originally used this before encountering reactfire login bug
    // signInSuccessWithAuthResult: () => false,
    // },
  };

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />;
};

export {Login};
