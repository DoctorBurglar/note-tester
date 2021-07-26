import * as React from "react";
import {BlackKey} from "../styles";
import {blackKeyWidth, answerStatusOptions} from "../constants";
import CheckMark from "./CheckMark";
import {determineBlackKeyBackgroundColor} from "../helpers";

type BlackKeyCompProps = {
  note: string;
  ind: number;
  thisBlackKeyIsSelected: (note: string, ind: number) => boolean;
  setSelectedNote: (note: string) => void;
  isGuestKeyboard: boolean;
  notes: string[];
  selectedNote: string;
  answer: string;
  answerStatus: string;
};

const BlackKeyComp: React.FC<BlackKeyCompProps> = ({
  thisBlackKeyIsSelected,
  note,
  ind,
  isGuestKeyboard,
  setSelectedNote,
  notes,
  children,
  selectedNote,
  answer,
  answerStatus,
}) => {
  // const determineBlackKeyBackgroundColor = () => {
  //   let nextNote = "";
  //   if (ind < notes.length - 1) {
  //     nextNote = notes[notes.indexOf(note) + 1];
  //   }

  //   let backgroundColor = "";
  //   if (isGuestKeyboard) {
  //     if (
  //       thisBlackKeyIsSelected(note, ind) &&
  //       answerStatus === answerStatusOptions.CORRECT
  //     ) {
  //       backgroundColor = "var(--main-color)";
  //     } else if (
  //       answerStatus !== "" &&
  //       (note[0] + "s" + note[1] === selectedNote ||
  //         nextNote[0] + "b" + nextNote[1] === selectedNote)
  //     ) {
  //       backgroundColor = "var(--main-color)";
  //     } else if (
  //       thisBlackKeyIsSelected(note, ind) &&
  //       answerStatus === answerStatusOptions.INCORRECT
  //     ) {
  //       backgroundColor = "var(--wrong-note-color)";
  //     }
  //   } else if (
  //     note[0] + "s" + note[1] === answer &&
  //     thisBlackKeyIsSelected(note, ind)
  //   ) {
  //     backgroundColor = "var(--main-color)";
  //   } else if (thisBlackKeyIsSelected(note, ind)) {
  //     backgroundColor = "var(--main-color)";
  //   } else if (
  //     note[0] + "s" + note[1] === answer &&
  //     answerStatus === answerStatusOptions.INCORRECT
  //   ) {
  //     backgroundColor = "var(--wrong-note-color)";
  //   }
  //   return backgroundColor;
  // };

  const handleClick = () => {
    setSelectedNote(note[0] + "s" + note[1]);
  };

  return (
    <BlackKey
      style={{
        backgroundColor: determineBlackKeyBackgroundColor(
          notes,
          note,
          ind,
          selectedNote,
          answer,
          answerStatus,
          isGuestKeyboard,
          thisBlackKeyIsSelected
        ),
      }}
      left={`calc(100% - (${blackKeyWidth}) / 2) `}
      onClick={isGuestKeyboard ? handleClick : () => {}}
    >
      {children}
      {!isGuestKeyboard &&
      thisBlackKeyIsSelected(note, ind) &&
      answerStatus === answerStatusOptions.CORRECT ? (
        <CheckMark />
      ) : null}
    </BlackKey>
  );
};

export default BlackKeyComp;
