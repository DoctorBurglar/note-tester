import * as React from "react";
import {WhiteKey} from "../styles";
import {Flex, Heading} from "@chakra-ui/react";
import {answerStatusOptions} from "../constants";
import CheckMark from "./CheckMark";

type WhiteKeyCompProps = {
  note: string;
  ind: number;
  setSelectedNote: (note: string) => void;
  thisWhiteKeyIsSelected: (note: string, ind: number) => boolean;
  notes: string[];
  isGuestKeyboard: boolean;
  answerStatus: string;
  selectedNote: string;
  answer: string;
  displayingNotes: boolean;
};

const WhiteKeyComp: React.FC<WhiteKeyCompProps> = ({
  children,
  note,
  ind,
  thisWhiteKeyIsSelected,
  setSelectedNote,
  notes,
  isGuestKeyboard,
  answerStatus,
  selectedNote,
  answer,
  displayingNotes,
}) => {
  const handleSetSelectedNote = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedNote(note);
  };
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
        answerStatus === answerStatusOptions.CORRECT
      ) {
        backgroundColor = "var(--main-color)";
      } else if (
        answerStatus !== "" &&
        (note[0] === "B" || note[0] === "E") &&
        nextNote[0] + "b" + nextNote[1] === selectedNote
      ) {
        backgroundColor = "var(--main-color)";
      } else if (
        answerStatus !== "" &&
        (note[0] === "C" || note[0] === "F") &&
        prevNote[0] + "s" + prevNote[1] === selectedNote
      ) {
        backgroundColor = "var(--main-color)";
      } else if (answerStatus !== "" && note === selectedNote) {
        backgroundColor = "var(--main-color)";
      } else if (
        thisWhiteKeyIsSelected(note, ind) &&
        answerStatus === answerStatusOptions.INCORRECT
      ) {
        backgroundColor = "var(--wrong-note-color)";
      }
    } else if (note === answer && thisWhiteKeyIsSelected(note, ind)) {
      backgroundColor = "var(--main-color)";
    } else if (thisWhiteKeyIsSelected(note, ind)) {
      backgroundColor = "var(--main-color)";
    } else if (
      note === answer &&
      answerStatus === answerStatusOptions.INCORRECT
    ) {
      backgroundColor = "var(--wrong-note-color)";
    }
    return backgroundColor;
  };

  return (
    <>
      <WhiteKey
        onClick={handleSetSelectedNote}
        style={{
          backgroundColor: determineBackgroundColor(),
        }}
      >
        {children}
        {!isGuestKeyboard &&
        thisWhiteKeyIsSelected(note, ind) &&
        answerStatus === answerStatusOptions.CORRECT ? (
          <CheckMark />
        ) : null}
        <Flex flex="1" direction="column" justify="flex-end">
          <Heading as="h1" textAlign="center" marginBottom=".5rem">
            {displayingNotes ? note[0] : ""}
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
