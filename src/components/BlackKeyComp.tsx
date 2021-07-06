import * as React from "react";
import {BlackKey} from "../styles";
import {whiteKeyWidth, blackKeyWidth} from "../constants";

type BlackKeyCompProps = {
  note: string;
  ind: number;
  thisBlackKeyIsSelected: (note: string, ind: number) => boolean;
  setSelectedNote: (note: string) => void;
  isStudentKeyboard: boolean;
  answerStatus?: string;
};

const BlackKeyComp: React.FC<BlackKeyCompProps> = ({
  thisBlackKeyIsSelected,
  note,
  ind,
  isStudentKeyboard,
  setSelectedNote,
  children,
}) => {
  return (
    <BlackKey
      style={{
        backgroundColor: thisBlackKeyIsSelected(note, ind) ? "lightblue" : "",
      }}
      left={`calc(${whiteKeyWidth} - (${blackKeyWidth} / 2))`}
      onClick={
        isStudentKeyboard
          ? () => setSelectedNote(note[0] + "s" + note[1])
          : undefined
      }
    >
      {children}
    </BlackKey>
  );
};

export default BlackKeyComp;
