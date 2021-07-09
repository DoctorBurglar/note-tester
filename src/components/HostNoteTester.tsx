import React from "react";
import Staff from "./Staff";
import HostControls from "./HostControls";
import {trebleNotes, bassNotes, clefs} from "../constants";
import {Flex, Heading} from "@chakra-ui/react";
import Keyboard from "./Keyboard";
import {useUser} from "reactfire";
import {useHistory, useParams} from "react-router-dom";
import {useSession} from "../hooks";
import Header from "./Header";

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

  const handleCopy = () => {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", sessionDoc?.sessionCode);
  };

  return (
    <div className="App">
      <Header />
      <Flex w="100%" h="0" justify="flex-end">
        <Heading as="h3" marginRight="2rem">
          {`SessionCode: `}
          <span
            style={{
              marginLeft: ".7rem",
              fontSize: "1.5rem",
              color: "var(--main-color-dark)",
              cursor: "pointer",
            }}
            onClick={handleCopy}
          >
            {sessionDoc?.sessionCode}
          </span>
        </Heading>
      </Flex>
      <Flex
        justifyContent="space-around"
        w="85rem"
        margin="0 auto"
        direction="column"
      >
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
