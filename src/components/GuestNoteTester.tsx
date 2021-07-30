import React from "react";
import Staff from "./Staff";
import {trebleNotes, bassNotes, clefs, answerStatusOptions} from "../constants";
import {Flex, Heading, Box} from "@chakra-ui/react";
import Keyboard from "./Keyboard";
import {useUser} from "reactfire";
import {useParams} from "react-router-dom";
import {useHistory, Redirect} from "react-router-dom";
import {useSession} from "../hooks";
import GuestScore from "./GuestScore";
import Header from "./Header";
import {checkAnswer, getRandomNote} from "../helpers";

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
      history.push("/");
    }
  }, [sessionDoc?.guestId, data, history]);

  const handleAnswer = (
    note: string,
    status: answerStatusOptions.CORRECT | answerStatusOptions.INCORRECT
  ) => {
    if (status === answerStatusOptions.CORRECT) {
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
    if (sessionDoc.answer !== "" || sessionDoc.selectedNote === "") {
      return;
    }
    if (sessionDoc.autoQuiz.on) {
      const {randomNote, randomClef} = getRandomNote(
        sessionDoc.autoQuiz,
        sessionDoc.selectedNote
      );
      setTimeout(
        () =>
          sessionRef.update({
            selectedNote: randomNote,
            selectedClef: randomClef,
            answer: "",
            answerStatus: "",
          }),
        1500
      );
    }

    sessionRef.update({answer: note});

    const selectedNote = sessionDoc.selectedNote;

    const answerIsCorrect = checkAnswer(note, notes, selectedNote);

    if (answerIsCorrect) {
      handleAnswer(note, answerStatusOptions.CORRECT);
    } else {
      handleAnswer(note, answerStatusOptions.INCORRECT);
    }
  };

  return (
    <>
      {!sessionDoc ||
      (sessionDoc?.guestId && sessionDoc?.guestId === data.uid) ? (
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
              showLinesOnStaff={sessionDoc?.mnemonics.showLinesOnStaff}
              showSpacesOnStaff={sessionDoc?.mnemonics.showSpacesOnStaff}
            />
            <Flex
              justifyContent="space-between"
              w="90%"
              align="flex-end"
              maxWidth="var(--max-width)"
            >
              <GuestScore sessionId={sessionId} />

              <Heading
                as="h2"
                marginLeft="2rem"
                marginBottom=".5rem"
                minHeight="2.8rem"
              >
                {sessionDoc?.answerStatus}
              </Heading>
            </Flex>
            <Keyboard
              notes={notes}
              selectedClef={sessionDoc?.selectedClef}
              setSelectedNote={handleSelectNote}
              isGuestKeyboard={true}
              selectedNote={sessionDoc?.selectedNote}
              displayingNotes={sessionDoc?.displayingNotes}
              answer={sessionDoc?.answer}
              answerStatus={sessionDoc?.answerStatus}
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
