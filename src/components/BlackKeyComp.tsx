import * as React from "react";
import {BlackKey} from "../styles";
import {whiteKeyWidth, blackKeyWidth, answerStatus} from "../constants";
import {useSession} from "../hooks";

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
      console.log(isGuestKeyboard);
      if (
        thisBlackKeyIsSelected(note, ind) &&
        sessionDoc?.answerStatus === answerStatus.CORRECT
      ) {
        backgroundColor = "lightblue";
      } else if (
        sessionDoc?.answerStatus !== "" &&
        (note[0] + "s" + note[1] === sessionDoc?.selectedNote ||
          nextNote[0] + "b" + nextNote[1] === sessionDoc?.selectedNote)
      ) {
        console.log("2");
        backgroundColor = "lightblue";
      } else if (
        thisBlackKeyIsSelected(note, ind) &&
        sessionDoc?.answerStatus === answerStatus.INCORRECT
      ) {
        console.log("3");
        backgroundColor = "red";
      }
    } else if (
      note[0] + "s" + note[1] === sessionDoc?.answer &&
      thisBlackKeyIsSelected(note, ind)
    ) {
      backgroundColor = "green";
    } else if (thisBlackKeyIsSelected(note, ind)) {
      backgroundColor = "lightblue";
    } else if (
      note[0] + "s" + note[1] === sessionDoc?.answer &&
      sessionDoc?.answerStatus === answerStatus.INCORRECT
    ) {
      backgroundColor = "red";
    }
    return backgroundColor;
  };

  const handleClick = () => {
    setSelectedNote(note[0] + "s" + note[1]);
    console.log(thisBlackKeyIsSelected(note, ind));
  };

  return (
    <BlackKey
      style={{
        backgroundColor: determineBackgroundColor(),
      }}
      left={`calc(${whiteKeyWidth} - (${blackKeyWidth} / 2))`}
      onClick={isGuestKeyboard ? handleClick : () => {}}
    >
      {children}
    </BlackKey>
  );
};

export default BlackKeyComp;
