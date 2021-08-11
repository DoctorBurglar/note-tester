import * as React from "react";
import {WhiteKey} from "../styles";
import {Flex, Heading} from "@chakra-ui/react";
import {answerStatusOptions} from "../constants";
import {CheckMark} from "./CheckMark";
import {determineWhiteKeyBackgroundColor} from "../helpers";

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

  return (
    <>
      <WhiteKey
        onClick={handleSetSelectedNote}
        style={{
          backgroundColor: determineWhiteKeyBackgroundColor(
            notes,
            note,
            ind,
            selectedNote,
            answer,
            answerStatus,
            isGuestKeyboard,
            thisWhiteKeyIsSelected
          ),
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

export {WhiteKeyComp};
