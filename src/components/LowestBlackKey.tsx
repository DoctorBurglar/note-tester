import * as React from "react";
import {blackKeyWidth, answerStatusOptions} from "../constants";
import {BlackKey} from "../styles";
import CheckMark from "./CheckMark";

type LowestBlackKeyProps = {
  selectedNote: string;
  ind: number;
  setSelectedNote: (note: string) => void;
  thisBlackKeyIsSelected: (note: string, ind: number) => boolean;
  note: string;
  isGuestKeyboard: boolean;
  answer: string;
  answerStatus: string;
};

const LowestBlackKey: React.FC<LowestBlackKeyProps> = ({
  ind,
  setSelectedNote,
  note,
  children,
  isGuestKeyboard,
  thisBlackKeyIsSelected,
  selectedNote,
  answer,
  answerStatus,
}) => {
  // TODO: fix bug where Eb is highlighted when E# is selected!
  const determineBackgroundColor = () => {
    let backgroundColor = "";
    if (isGuestKeyboard) {
      if (
        thisBlackKeyIsSelected(note, ind) &&
        answerStatus === answerStatusOptions.CORRECT
      ) {
        backgroundColor = "var(--main-color)";
      } else if (
        thisBlackKeyIsSelected(note, ind) &&
        note[0] + "b" + note[1] === selectedNote
      ) {
        backgroundColor = "var(--main-color)";
      } else if (
        thisBlackKeyIsSelected(note, ind) &&
        answerStatus === answerStatusOptions.INCORRECT
      ) {
        backgroundColor = "red";
      }
    } else {
      if (
        thisBlackKeyIsSelected(note, ind) &&
        answerStatus === answerStatusOptions.CORRECT
      ) {
        backgroundColor = "var(--main-color)";
      } else if (thisBlackKeyIsSelected(note, ind) && selectedNote[1] === "b") {
        backgroundColor = "var(--main-color)";
      } else if (
        note[0] + "b" + note[1] === answer &&
        answerStatus === answerStatusOptions.INCORRECT
      ) {
        backgroundColor = "red";
      }
    }

    return backgroundColor;
  };

  return (
    <BlackKey
      left={`calc((-${blackKeyWidth} / 2))`}
      style={{
        backgroundColor: determineBackgroundColor(),
        color: thisBlackKeyIsSelected(note, ind) ? "black" : "",
      }}
      onClick={() => setSelectedNote(note[0] + "b" + note[1])}
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

export default LowestBlackKey;
