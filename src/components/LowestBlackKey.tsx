import * as React from "react";
import {background, Flex, Heading} from "@chakra-ui/react";
import {blackKeyWidth, answerStatus} from "../constants";
import {BlackKey} from "../styles";
import Flat from "./Flat";
import {useSession} from "../hooks";

type LowestBlackKeyProps = {
  selectedNote: string;
  ind: number;
  setSelectedNote: (note: string) => void;
  thisBlackKeyIsSelected: (note: string, ind: number) => boolean;
  note: string;
  sessionId: string;
  isGuestKeyboard: boolean;
};

const LowestBlackKey: React.FC<LowestBlackKeyProps> = ({
  ind,
  setSelectedNote,
  note,
  sessionId,
  children,
  isGuestKeyboard,
  thisBlackKeyIsSelected,
}) => {
  const {sessionDoc} = useSession(sessionId);

  const determineBackgroundColor = () => {
    console.log(
      thisBlackKeyIsSelected(note, ind),
      sessionDoc?.answerStatus,
      sessionDoc?.answer
    );
    let backgroundColor = "";
    if (isGuestKeyboard) {
      if (
        thisBlackKeyIsSelected(note, ind) &&
        sessionDoc?.answerStatus === answerStatus.CORRECT
      ) {
        backgroundColor = "lightblue";
      } else if (note[0] + "b" + note[1] === sessionDoc.selectedNote) {
        backgroundColor = "lightblue";
      } else if (
        thisBlackKeyIsSelected(note, ind) &&
        sessionDoc?.answerStatus === answerStatus.INCORRECT
      ) {
        backgroundColor = "red";
      }
    } else {
      if (
        thisBlackKeyIsSelected(note, ind) &&
        sessionDoc?.answerStatus === answerStatus.CORRECT
      ) {
        backgroundColor = "green";
      } else if (thisBlackKeyIsSelected(note, ind)) {
        backgroundColor = "lightblue";
      } else if (
        note[0] + "b" + note[1] === sessionDoc?.answer &&
        sessionDoc?.answerStatus === answerStatus.INCORRECT
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
    </BlackKey>
  );
};

export default LowestBlackKey;
