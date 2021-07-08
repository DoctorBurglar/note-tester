import React from "react";
import "./App.css";
import {CreateSession} from "./components/CreateSession";
import HostNoteTester from "./components/HostNoteTester";
import GuestNoteTester from "./components/GuestNoteTester";
import {Switch, Route} from "react-router-dom";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Switch>
        <Route path="/hosted-session/:sessionId" component={HostNoteTester} />
        <Route path="/guest-session/:sessionId" component={GuestNoteTester} />
        <Route path="/" component={CreateSession} />
      </Switch>
    </div>
  );
}

export default AuthenticatedApp;
