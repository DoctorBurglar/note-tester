import React from "react";
import Staff from "./Staff";
import {trebleNotes, bassNotes, clefs} from "../constants";
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
  const [answerStatus, setAnswerStatus] = React.useState("");

  console.log(displayingNotes);

  const {sessionId} = useParams<IParams>();
  const history = useHistory();

  const {data} = useUser();
  const {sessionRef, sessionDoc} = useSession(sessionId);

  React.useEffect(() => {
    if (sessionDoc?.answer === "") {
      setAnswerStatus("");
    }
  }, [sessionDoc?.answer]);

  const notes =
    sessionDoc?.selectedClef === clefs.TREBLE
      ? Object.keys(trebleNotes)
      : Object.keys(bassNotes);

  React.useEffect(() => {
    if (sessionDoc?.guestId !== data.uid) {
      history.push("/");
    }
  }, [sessionDoc, data, history]);

  const handleAnswer = (note: string, status: "CORRECT" | "INCORRECT") => {
    if (status === "CORRECT") {
      setAnswerStatus("Correct");
      sessionRef.update({
        answer: note,
        identifiedNotes: sessionDoc.identifiedNotes + 1,
        totalNotes: sessionDoc.totalNotes + 1,
      });
    } else {
      setAnswerStatus("Incorrect");
      sessionRef.update({
        answer: note,
        totalNotes: sessionDoc.totalNotes + 1,
      });
    }
  };

  const handleSelectNote = (note: string) => {
    if (sessionDoc.answer !== "") {
      return console.log(note);
    }
    const noteWithoutSharp = note[1] === "s" ? note[0] + note[2] : note;
    const nextNote = notes[notes.indexOf(noteWithoutSharp) + 1];
    const prevNote = notes[notes.indexOf(noteWithoutSharp) - 1];
    const selectedNote = sessionDoc.selectedNote;

    sessionRef.update({answer: note});
    if (note === selectedNote) {
      return handleAnswer(note, "CORRECT");
    } else if (note[1] === "s") {
      if (nextNote[0] + "b" + nextNote[1] === selectedNote) {
        return handleAnswer(note, "CORRECT");
      }
    } else if (note[0] === "E" || note[0] === "B") {
      if (nextNote[0] + "b" + nextNote[1] === selectedNote) {
        return handleAnswer(note, "CORRECT");
      }
    } else if (note[0] === "C" || note[0] === "F") {
      if (prevNote[0] + "s" + prevNote[1] === selectedNote) {
        return handleAnswer(note, "CORRECT");
      }
    }
    handleAnswer(note, "INCORRECT");
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
            {answerStatus}
          </Heading>
        </Flex>
        <SelectedKeyboard
          notes={notes}
          selectedClef={sessionDoc?.selectedClef}
          selectedNote={sessionDoc?.answer}
          setSelectedNote={handleSelectNote}
          displayingNotes={displayingNotes}
          isStudentKeyboard={true}
          answerStatus={answerStatus}
        />
      </Flex>
    </div>
  );
}

export default GuestNoteTester;
