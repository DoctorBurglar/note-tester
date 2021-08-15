import * as React from "react";
import {Box} from "@chakra-ui/react";
import {IGuitarNote} from "../interfacesAndTypes";
import {answerStatusOptions, fretHeight, guitarNotes} from "../constants";

type GuitarSpaceBetweenFretsProps = {
  note: IGuitarNote;
  innerInd: number;
  outerInd: number;
  fretIsInRange: (outerInd: number, innerInd: number) => boolean;
  handleFretAreaClick: () => void;
  selectedString: number;
  noteRangeAllowsDuplicates: boolean;
  selectedNote: string;
  answer: string;
  answerStatus: string;
};

const GuitarSpaceBetweenFrets: React.FC<GuitarSpaceBetweenFretsProps> = ({
  noteRangeAllowsDuplicates,
  selectedString,
  handleFretAreaClick,
  outerInd,
  fretIsInRange,
  innerInd,
  note,
  selectedNote,
  answer,
  answerStatus,
  children,
}) => {
  const thisNoteIsSelected =
    answer === note.name && selectedString === note.stringNumber;

  const determineFretStatus = ():
    | "PICKED_CORRECT"
    | "WRONG"
    | "UNPICKED_CORRECT"
    | "" => {
    const guitarNotesArray = Object.keys(guitarNotes);

    if (thisNoteIsSelected && answerStatus === answerStatusOptions.CORRECT) {
      return "PICKED_CORRECT";
    } else if (
      thisNoteIsSelected &&
      answerStatus === answerStatusOptions.INCORRECT
    ) {
      return "WRONG";
    } else if (
      note.name === selectedNote &&
      selectedString === note.stringNumber &&
      answerStatus !== ""
    ) {
      return "UNPICKED_CORRECT";
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
      return "UNPICKED_CORRECT";
    } else {
      return "";
    }
  };

  return (
    <Box
      onClick={handleFretAreaClick}
      key={note.name + innerInd}
      h={`${fretHeight}rem`}
      w="100%"
      display="inline-block"
      position="relative"
      zIndex={answerStatus !== "" ? "0" : "7"}
      opacity=".8"
      bg={
        determineFretStatus() === "PICKED_CORRECT"
          ? "var(--main-color)"
          : determineFretStatus() === "WRONG"
          ? "var(--wrong-note-color)"
          : // TODO: add logic for flats
          determineFretStatus() === "UNPICKED_CORRECT"
          ? "var(--main-color)"
          : ""
      }
      boxSizing="border-box"
      _hover={
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
