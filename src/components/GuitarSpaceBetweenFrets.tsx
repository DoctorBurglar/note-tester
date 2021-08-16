import * as React from "react";
import {Box} from "@chakra-ui/react";
import {IGuitarNote} from "../interfacesAndTypes";
import {answerStatusOptions, fretHeight, guitarNotes} from "../constants";

type GuitarSpaceBetweenFretsProps = {
  note: IGuitarNote;
  innerInd: number;
  outerInd: number;
  fretIsInRange: (outerInd: number, innerInd: number) => boolean;
  selectedString: number;
  noteRangeAllowsDuplicates: boolean;
  selectedNote: string;
  answer: string;
  answerStatus: string;
  handleSelectNote: (note: IGuitarNote) => void;
  userClickedOutOfRange: boolean;
  setUserClickedOutOfRange: React.Dispatch<React.SetStateAction<boolean>>;
};

const GuitarSpaceBetweenFrets: React.FC<GuitarSpaceBetweenFretsProps> = ({
  noteRangeAllowsDuplicates,
  selectedString,
  outerInd,
  fretIsInRange,
  innerInd,
  note,
  selectedNote,
  answer,
  answerStatus,
  handleSelectNote,
  userClickedOutOfRange,
  setUserClickedOutOfRange,
  children,
}) => {
  const thisNoteIsSelected =
    answer === note.name && selectedString === note.stringNumber;

  const handleInvalidFret = () => {
    setUserClickedOutOfRange(true);
    setTimeout(() => {
      setUserClickedOutOfRange(false);
    }, 1000);
  };

  const handleFretAreaClick = () => {
    if (answerStatus !== "") {
      return;
    }
    if (answerStatus === "" && !fretIsInRange(outerInd, innerInd)) {
      console.log("whoop");
      handleInvalidFret();
      return;
    }
    if (
      fretIsInRange(outerInd, innerInd) &&
      (outerInd + 1 === selectedString || !noteRangeAllowsDuplicates)
    ) {
      handleSelectNote(note);
    } else {
      return;
    }
  };

  const determineFretColor = () => {
    const guitarNotesArray = Object.keys(guitarNotes);
    if (userClickedOutOfRange && fretIsInRange(outerInd, innerInd)) {
      return "var(--wild-pink)";
    }

    if (!noteRangeAllowsDuplicates) {
      if (
        answer === note.name &&
        fretIsInRange(outerInd, innerInd) &&
        answerStatus === answerStatusOptions.INCORRECT
      ) {
        return "var(--wrong-note-color)";
      } else if (!fretIsInRange(outerInd, innerInd)) {
        return "";
      }
    }
    if (thisNoteIsSelected && answerStatus === answerStatusOptions.CORRECT) {
      return "var(--main-color)";
    } else if (
      thisNoteIsSelected &&
      answerStatus === answerStatusOptions.INCORRECT
    ) {
      return "var(--wrong-note-color)";
    } else if (
      note.name === selectedNote &&
      selectedString === note.stringNumber &&
      answerStatus !== ""
    ) {
      return "var(--main-color)";
    } else if (
      answerStatus !== "" &&
      selectedString === note.stringNumber &&
      note.name[1] === "s" &&
      guitarNotesArray.indexOf(note.name[0] + note.name[2]) <
        guitarNotesArray.length - 1 &&
      guitarNotesArray[
        guitarNotesArray.indexOf(note.name[0] + note.name[2]) + 1
      ][0] +
        "b" +
        guitarNotesArray[
          guitarNotesArray.indexOf(note.name[0] + note.name[2]) + 1
        ][1] ===
        selectedNote
    ) {
      return "var(--main-color)";
    } else {
      return "";
    }
  };

  return (
    <Box
      onClick={handleFretAreaClick}
      key={note.name}
      h={`${fretHeight}rem`}
      w="100%"
      display="inline-block"
      position="relative"
      zIndex={answerStatus !== "" || userClickedOutOfRange ? "0" : "7"}
      bg={determineFretColor()}
      boxSizing="border-box"
      _hover={
        answer === "" &&
        fretIsInRange(outerInd, innerInd) &&
        (outerInd + 1 === selectedString || !noteRangeAllowsDuplicates)
          ? {
              border: "4px solid var(--main-color-dark)",
              borderRadius: "5px",
            }
          : {}
      }
    >
      {children}
    </Box>
  );
};

export {GuitarSpaceBetweenFrets};
