import * as React from "react";
import "./App.css";
import {AuthCheck} from "reactfire";
import "firebase/auth";
import AuthenticatedApp from "./AuthenticatedApp";
import {WelcomeScreen} from "./components/WelcomeScreen";

const App: React.FC = () => {
  return (
    <AuthCheck fallback={<WelcomeScreen />}>{<AuthenticatedApp />}</AuthCheck>
  );
};

export default App;
