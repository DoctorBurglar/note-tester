import React from "react";
import Staff from "./Staff";
import TeacherControls from "./TeacherControls";
import {trebleNotes, bassNotes, clefs} from "../constants";
import {Flex} from "@chakra-ui/react";
import SelectedKeyboard from "./SelectedKeyboard";
import {SignOut} from "./SignOut";
import {useUser} from "reactfire";
import {useHistory, useParams} from "react-router-dom";
import {useSession} from "../hooks";

interface IParams {
  sessionId: string;
}

function NoteTester() {
  const [displayingNotes, setDisplayingNotes] = React.useState(false);

  console.log(displayingNotes);

  const {sessionId} = useParams<IParams>();
  const history = useHistory();

  console.log(sessionId);

  const {data} = useUser();
  const {sessionRef, sessionDoc} = useSession(sessionId);

  React.useEffect(() => {
    if (sessionDoc && sessionDoc.hostId !== data.uid) {
      history.push("/");
    }
  }, [sessionDoc, history, data.uid]);

  const handleSelectNote = (note: string) => {
    sessionRef.update({selectedNote: note, answer: ""});
  };

  const handleSelectClef = (clef: string) => {
    sessionRef.update({selectedClef: clef});
  };

  return (
    <div className="App">
      <SignOut />
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
        />

        <TeacherControls
          setSelectedNote={handleSelectNote}
          setSelectedClef={handleSelectClef}
          selectedClef={sessionDoc?.selectedClef}
          selectedNote={sessionDoc?.selectedNote}
          setDisplayingNotes={setDisplayingNotes}
        />
        <SelectedKeyboard
          notes={
            sessionDoc?.selectedClef === clefs.TREBLE
              ? Object.keys(trebleNotes)
              : Object.keys(bassNotes)
          }
          selectedClef={sessionDoc?.selectedClef}
          selectedNote={sessionDoc?.selectedNote}
          setSelectedNote={handleSelectNote}
          displayingNotes={displayingNotes}
          isStudentKeyboard={false}
        />
      </Flex>
    </div>
  );
}

export default NoteTester;
