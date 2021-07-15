import React from "react";
import Staff from "./Staff";
import {trebleNotes, bassNotes, clefs, answerStatus} from "../constants";
import {Flex, Heading, Box} from "@chakra-ui/react";
import Keyboard from "./Keyboard";
import {useUser} from "reactfire";
import {useParams} from "react-router-dom";
import {useHistory, Redirect} from "react-router-dom";
import {useSession} from "../hooks";
import GuestScore from "./GuestScore";
import Header from "./Header";

interface IParams {
  sessionId: string;
}

function GuestNoteTester() {
  const {sessionId} = useParams<IParams>();
  const history = useHistory();

  const {data} = useUser();
  const {sessionRef, sessionDoc} = useSession(sessionId);

  const notes =
    sessionDoc?.selectedClef === clefs.TREBLE
      ? Object.keys(trebleNotes)
      : Object.keys(bassNotes);

  React.useEffect(() => {
    if (sessionDoc?.guestId && sessionDoc?.guestId !== data.uid) {
      console.log("redirecting");
      history.push("/");
    }
  }, [sessionDoc?.guestId, data, history]);

  const handleAnswer = (
    note: string,
    status: answerStatus.CORRECT | answerStatus.INCORRECT
  ) => {
    if (status === answerStatus.CORRECT) {
      sessionRef.update({
        answer: note,
        identifiedNotes: sessionDoc.identifiedNotes + 1,
        totalNotes: sessionDoc.totalNotes + 1,
        answerStatus: "CORRECT",
      });
    } else {
      sessionRef.update({
        answer: note,
        totalNotes: sessionDoc.totalNotes + 1,
        answerStatus: "INCORRECT",
      });
    }
  };

  const handleSelectNote = (note: string) => {
    console.log(note);
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

  return (
    <>
      {sessionDoc?.guestId && sessionDoc?.guestId === data.uid ? (
        <Box w="100vw">
          <Header />
          <Flex
            justifyContent="space-around"
            w="100%"
            margin="0 auto"
            direction="column"
            align="center"
          >
            <Staff
              selectedNote={sessionDoc?.selectedNote}
              selectedClef={sessionDoc?.selectedClef}
              sessionId={sessionId}
            />
            <Flex
              justifyContent="space-between"
              w="90%"
              align="flex-end"
              maxWidth="var(--max-width)"
            >
              <GuestScore sessionId={sessionId} />

              <Heading as="h2" marginLeft="2rem" marginBottom=".5rem">
                {sessionDoc?.answerStatus}
              </Heading>
            </Flex>
            <Keyboard
              notes={notes}
              selectedClef={sessionDoc?.selectedClef}
              setSelectedNote={handleSelectNote}
              isGuestKeyboard={true}
              sessionId={sessionId}
            />
          </Flex>
        </Box>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}

export default GuestNoteTester;
