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
import styled from "@emotion/styled";
import GuestScore from "./GuestScore";

const Content = styled(Flex)`
  justify-content: space-around;
  margin: 0 auto;
  flex-direction: column;
`;

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
    <div style={{width: "100vw"}}>
      <Header />
      <Flex w="100%" h="0" justify="space-between" align="flex-start">
        <GuestScore sessionId={sessionId} isHost />
        <Flex
          direction={{base: "column", md: "row"}}
          marginRight="2rem"
          marginTop="1rem"
        >
          <Heading
            as="h3"
            margin={{base: "0 2rem 0 0", md: "0 2rem 0 0"}}
            fontSize="1.5rem"
          >
            {`Code: `}
          </Heading>
          <Heading
            as="h3"
            style={{
              fontSize: "1.5rem",
              color: "var(--main-color-dark)",
              cursor: "pointer",
            }}
            onClick={handleCopy}
          >
            {sessionDoc?.sessionCode}
          </Heading>
        </Flex>
      </Flex>
      <Content>
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
      </Content>
    </div>
  );
}

export default HostNoteTester;
