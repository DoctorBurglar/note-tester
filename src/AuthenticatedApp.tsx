import "./App.css";
import {Sessions} from "./components/Sessions";
import {HostNoteTester} from "./components/HostNoteTester";
import {GuestNoteTester} from "./components/GuestNoteTester";
import {SoloModePiano} from "./components/SoloModePiano";
import {SoloModeGuitar} from "./components/SoloModeGuitar";
import {Switch, Route} from "react-router-dom";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Switch>
        <Route path="/hosted-session/:sessionId" component={HostNoteTester} />
        <Route path="/guest-session/:sessionId" component={GuestNoteTester} />\
        <Route path="/solo-mode/keyboard" component={SoloModePiano} />
        <Route path="/solo-mode/guitar" component={SoloModeGuitar} />
        <Route path="/" component={Sessions} />
      </Switch>
    </div>
  );
}

export default AuthenticatedApp;
