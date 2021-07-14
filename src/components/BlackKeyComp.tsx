import * as React from "react";
import {BlackKey} from "../styles";
import {blackKeyWidth, answerStatus} from "../constants";
import {useSession} from "../hooks";
import CheckMark from "./CheckMark";

type BlackKeyCompProps = {
  note: string;
  ind: number;
  thisBlackKeyIsSelected: (note: string, ind: number) => boolean;
  setSelectedNote: (note: string) => void;
  isGuestKeyboard: boolean;
  sessionId: string;
  notes: string[];
};

const BlackKeyComp: React.FC<BlackKeyCompProps> = ({
  thisBlackKeyIsSelected,
  note,
  ind,
  isGuestKeyboard,
  setSelectedNote,
  sessionId,
  notes,
  children,
}) => {
  const {sessionDoc} = useSession(sessionId);

  const determineBackgroundColor = () => {
    let nextNote = "";
    if (ind < notes.length - 1) {
      nextNote = notes[notes.indexOf(note) + 1];
    }

    let backgroundColor = "";
    if (isGuestKeyboard) {
      if (
        thisBlackKeyIsSelected(note, ind) &&
        sessionDoc?.answerStatus === answerStatus.CORRECT
      ) {
        backgroundColor = "var(--main-color)";
      } else if (
        sessionDoc?.answerStatus !== "" &&
        (note[0] + "s" + note[1] === sessionDoc?.selectedNote ||
          nextNote[0] + "b" + nextNote[1] === sessionDoc?.selectedNote)
      ) {
        backgroundColor = "var(--main-color)";
      } else if (
        thisBlackKeyIsSelected(note, ind) &&
        sessionDoc?.answerStatus === answerStatus.INCORRECT
      ) {
        backgroundColor = "var(--wrong-note-color)";
      }
    } else if (
      note[0] + "s" + note[1] === sessionDoc?.answer &&
      thisBlackKeyIsSelected(note, ind)
    ) {
      backgroundColor = "var(--main-color)";
    } else if (thisBlackKeyIsSelected(note, ind)) {
      backgroundColor = "var(--main-color)";
    } else if (
      note[0] + "s" + note[1] === sessionDoc?.answer &&
      sessionDoc?.answerStatus === answerStatus.INCORRECT
    ) {
      backgroundColor = "var(--wrong-note-color)";
    }
    return backgroundColor;
  };

  const handleClick = () => {
    setSelectedNote(note[0] + "s" + note[1]);
  };

  return (
    <BlackKey
      style={{
        backgroundColor: determineBackgroundColor(),
      }}
      left={`calc(100% - (${blackKeyWidth}) / 2) `}
      onClick={isGuestKeyboard ? handleClick : () => {}}
    >
      {children}
      {!isGuestKeyboard &&
      thisBlackKeyIsSelected(note, ind) &&
      sessionDoc?.answerStatus === answerStatus.CORRECT ? (
        <CheckMark />
      ) : null}
    </BlackKey>
  );
};

export default BlackKeyComp;
