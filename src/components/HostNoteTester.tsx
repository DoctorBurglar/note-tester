import React from "react";
import Staff from "./Staff";
import HostControls from "./HostControls";
import {trebleNotes, bassNotes, clefs} from "../constants";
import {Flex} from "@chakra-ui/react";
import Keyboard from "./Keyboard";
import {SignOut} from "./SignOut";
import {useUser} from "reactfire";
import {useHistory, useParams} from "react-router-dom";
import {useSession} from "../hooks";

interface IParams {
  sessionId: string;
}

function HostNoteTester() {
  const {sessionId} = useParams<IParams>();
  const history = useHistory();

  const {data} = useUser();
  const {sessionRef, sessionDoc} = useSession(sessionId);

  React.useEffect(() => {
    if (sessionDoc && sessionDoc.hostId !== data.uid) {
      history.push("/");
    }
  }, [sessionDoc, history, data.uid]);

  const handleSelectNote = (note: string) => {
    sessionRef.update({selectedNote: note, answer: "", answerStatus: ""});
  };

  const handleSelectClef = (clef: string) => {
    sessionRef.update({selectedClef: clef, selectedNote: "", answer: ""});
  };

  return (
    <div className="App">
      <Flex
        justifyContent="space-around"
        w="85rem"
        margin="0 auto"
        direction="column"
      >
        <Flex>
          <SignOut />
        </Flex>
        {/* <Button onClick={handleSignIn}>Sign In</Button> */}
        <Staff
          selectedNote={sessionDoc?.selectedNote}
          selectedClef={sessionDoc?.selectedClef}
          sessionId={sessionId}
        />

        <Flex justifyContent="space-between" w="100%">
          <HostControls
            setSelectedNote={handleSelectNote}
            setSelectedClef={handleSelectClef}
            sessionId={sessionId}
          />
        </Flex>

        <Keyboard
          notes={
            sessionDoc?.selectedClef === clefs.TREBLE
              ? Object.keys(trebleNotes)
              : Object.keys(bassNotes)
          }
          selectedClef={sessionDoc?.selectedClef}
          setSelectedNote={handleSelectNote}
          isGuestKeyboard={false}
          sessionId={sessionId}
        />
      </Flex>
    </div>
  );
}

export default HostNoteTester;
