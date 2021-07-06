import React from "react";
import "./App.css";
import {AuthCheck} from "reactfire";
import "firebase/auth";
import AuthenticatedApp from "./AuthenticatedApp";
import {Login} from "./components/Login";

const App: React.FC = () => {
  return <AuthCheck fallback={<Login />}>{<AuthenticatedApp />}</AuthCheck>;
};

export default App;
