import * as React from "react";
import {WhiteKey} from "../styles";
import {Flex, Heading} from "@chakra-ui/react";
import {useSession} from "../hooks";
import {answerStatus} from "../constants";
import CheckMark from "./CheckMark";

type WhiteKeyCompProps = {
  note: string;
  ind: number;
  setSelectedNote: (note: string) => void;
  thisWhiteKeyIsSelected: (note: string, ind: number) => boolean;
  sessionId: string;
  notes: string[];
  isGuestKeyboard: boolean;
};

const WhiteKeyComp: React.FC<WhiteKeyCompProps> = ({
  children,
  note,
  ind,
  thisWhiteKeyIsSelected,
  setSelectedNote,
  sessionId,
  notes,
  isGuestKeyboard,
}) => {
  const {sessionDoc} = useSession(sessionId);

  const determineBackgroundColor = () => {
    let nextNote = "";
    let prevNote = "";
    if (ind < notes.length - 1) {
      nextNote = notes[notes.indexOf(note) + 1];
    }
    if (ind > 0) {
      prevNote = notes[notes.indexOf(note) - 1];
    }

    let backgroundColor = "";
    if (isGuestKeyboard) {
      if (
        thisWhiteKeyIsSelected(note, ind) &&
        sessionDoc?.answerStatus === answerStatus.CORRECT
      ) {
        backgroundColor = "var(--main-color)";
      } else if (
        sessionDoc?.answerStatus !== "" &&
        (note[0] === "B" || note[0] === "E") &&
        nextNote[0] + "b" + nextNote[1] === sessionDoc?.selectedNote
      ) {
        backgroundColor = "var(--main-color)";
      } else if (
        sessionDoc?.answerStatus !== "" &&
        (note[0] === "C" || note[0] === "F") &&
        prevNote[0] + "s" + prevNote[1] === sessionDoc?.selectedNote
      ) {
        backgroundColor = "var(--main-color)";
      } else if (
        sessionDoc?.answerStatus !== "" &&
        note === sessionDoc?.selectedNote
      ) {
        backgroundColor = "var(--main-color)";
      } else if (
        thisWhiteKeyIsSelected(note, ind) &&
        sessionDoc?.answerStatus === answerStatus.INCORRECT
      ) {
        backgroundColor = "var(--wrong-note-color)";
      }
    } else if (
      note === sessionDoc?.answer &&
      thisWhiteKeyIsSelected(note, ind)
    ) {
      backgroundColor = "var(--main-color)";
    } else if (thisWhiteKeyIsSelected(note, ind)) {
      backgroundColor = "var(--main-color)";
    } else if (
      note === sessionDoc?.answer &&
      sessionDoc?.answerStatus === answerStatus.INCORRECT
    ) {
      backgroundColor = "var(--wrong-note-color)";
    }
    return backgroundColor;
  };

  return (
    <>
      <WhiteKey
        onClick={() => setSelectedNote(note)}
        style={{
          backgroundColor: determineBackgroundColor(),
        }}
      >
        {children}
        {!isGuestKeyboard &&
        thisWhiteKeyIsSelected(note, ind) &&
        sessionDoc?.answerStatus === answerStatus.CORRECT ? (
          <CheckMark />
        ) : null}
        <Flex flex="1" direction="column" justify="flex-end">
          <Heading as="h1" textAlign="center" marginBottom=".5rem">
            {sessionDoc?.displayingNotes ? note[0] : ""}
          </Heading>
        </Flex>
      </WhiteKey>
      <Flex w="100%" justify="center">
        {note === "C4" ? (
          <Heading as="h1" textAlign="center" marginTop=".5rem">
            M
          </Heading>
        ) : null}
      </Flex>
    </>
  );
};

export default WhiteKeyComp;
