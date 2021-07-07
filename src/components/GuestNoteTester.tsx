import React from "react";
import Staff from "./Staff";
import {trebleNotes, bassNotes, clefs, answerStatus} from "../constants";
import {Flex, Heading, Button} from "@chakra-ui/react";
import SelectedKeyboard from "./SelectedKeyboard";
import {SignOut} from "./SignOut";
import {useUser} from "reactfire";
import {useParams} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {useSession} from "../hooks";

interface IParams {
  sessionId: string;
}

function GuestNoteTester() {
  // const [answer, setAnswer] = React.useState("");
  const [displayingNotes, setDisplayingNotes] = React.useState(false);
  // const [answerStatus, setAnswerStatus] = React.useState("");

  const {sessionId} = useParams<IParams>();
  const history = useHistory();

  const {data} = useUser();
  const {sessionRef, sessionDoc} = useSession(sessionId);

  const notes =
    sessionDoc?.selectedClef === clefs.TREBLE
      ? Object.keys(trebleNotes)
      : Object.keys(bassNotes);

  React.useEffect(() => {
    if (sessionDoc?.guestId !== data.uid) {
      history.push("/");
    }
  }, [sessionDoc, data, history]);

  const handleAnswer = (
    note: string,
    status: answerStatus.CORRECT | answerStatus.INCORRECT
  ) => {
    if (status === answerStatus.CORRECT) {
      // setAnswerStatus("CORRECT");
      sessionRef.update({
        answer: note,
        identifiedNotes: sessionDoc.identifiedNotes + 1,
        totalNotes: sessionDoc.totalNotes + 1,
        answerStatus: "CORRECT",
      });
    } else {
      // setAnswerStatus("INCORRECT");
      sessionRef.update({
        answer: note,
        totalNotes: sessionDoc.totalNotes + 1,
        answerStatus: "INCORRECT",
      });
    }
  };

  const handleSelectNote = (note: string) => {
    if (sessionDoc.answer !== "" || sessionDoc.selectedNote === "") {
      return;
    }
    const noteWithoutSharp = note[1] === "s" ? note[0] + note[2] : note;
    const nextNote = notes[notes.indexOf(noteWithoutSharp) + 1];
    const prevNote = notes[notes.indexOf(noteWithoutSharp) - 1];
    const selectedNote = sessionDoc.selectedNote;

    sessionRef.update({answer: note});
    if (note === selectedNote) {
      return handleAnswer(note, answerStatus.CORRECT);
    } else if (note[1] === "s") {
      if (nextNote[0] + "b" + nextNote[1] === selectedNote) {
        return handleAnswer(note, answerStatus.CORRECT);
      }
    } else if (note[0] === "E" || note[0] === "B") {
      if (nextNote[0] + "b" + nextNote[1] === selectedNote) {
        return handleAnswer(note, answerStatus.CORRECT);
      }
    } else if (note[0] === "C" || note[0] === "F") {
      if (prevNote[0] + "s" + prevNote[1] === selectedNote) {
        return handleAnswer(note, answerStatus.CORRECT);
      }
    }
    handleAnswer(note, answerStatus.INCORRECT);
  };

  const handleResetScore = () => {
    sessionRef.update({totalNotes: 0, identifiedNotes: 0});
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
          sessionId={sessionId}
        />
        <Flex justifyContent="space-between">
          <Flex justifyContent="space-between" w="30%">
            <Heading
              as="h2"
              minWidth="5rem"
            >{`${sessionDoc?.identifiedNotes} / ${sessionDoc?.totalNotes}`}</Heading>
            <Heading as="h2" justifyContent="space-between">
              {`${
                sessionDoc?.identifiedNotes === 0 &&
                sessionDoc?.totalNotes === 0
                  ? 100
                  : Math.round(
                      (sessionDoc?.identifiedNotes / sessionDoc?.totalNotes) *
                        100
                    )
              }%`}
            </Heading>
            <Button onClick={handleResetScore}>Reset Score</Button>
          </Flex>

          <Heading as="h2" marginLeft="2rem">
            {sessionDoc?.answerStatus}
          </Heading>
        </Flex>
        <SelectedKeyboard
          notes={notes}
          selectedClef={sessionDoc?.selectedClef}
          selectedNote={sessionDoc?.answer}
          setSelectedNote={handleSelectNote}
          displayingNotes={displayingNotes}
          isStudentKeyboard={true}
          sessionId={sessionId}
        />
      </Flex>
    </div>
  );
}

export default GuestNoteTester;
