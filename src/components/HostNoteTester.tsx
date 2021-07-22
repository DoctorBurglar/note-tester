import React from "react";
import Staff from "./Staff";
import HostControls from "./HostControls";
import {trebleNotes, bassNotes, clefs} from "../constants";
import {Flex} from "@chakra-ui/react";
import Keyboard from "./Keyboard";
import {useUser} from "reactfire";
import {useHistory, useParams} from "react-router-dom";
import {useSession} from "../hooks";
import Header from "./Header";
import styled from "@emotion/styled";
import GuestScore from "./GuestScore";
import SessionCode from "./SessionCode";
import AutoQuiz from "./AutoQuiz";

const Content = styled(Flex)`
  justify-content: space-around;
  margin: 0 auto;
  flex-direction: column;
`;

interface IParams {
  sessionId: string;
}

const HostNoteTester = () => {
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

  return (
    <div style={{width: "100vw"}}>
      <Header />
      <Flex w="100%" h="0" justify="space-between" align="flex-start">
        <Flex direction="column">
          <GuestScore sessionId={sessionId} isHost />
          <AutoQuiz sessionId={sessionId} />
        </Flex>

        <SessionCode sessionDoc={sessionDoc} />
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
};

export default HostNoteTester;
