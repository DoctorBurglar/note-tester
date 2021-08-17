import * as React from "react";
import {Box} from "@chakra-ui/react";
import {IGuitarNote} from "../interfacesAndTypes";
import {fretHeight} from "../constants";
import {determineFretColor} from "../helpers";

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
    let count = 0;
    const myInterval = setInterval(() => {
      if (count >= 2) {
        clearInterval(myInterval);
      }
      count++;
      setUserClickedOutOfRange(true);
      setTimeout(() => {
        setUserClickedOutOfRange(false);
      }, 100);
    }, 300);
  };

  const handleFretAreaClick = () => {
    if (answerStatus !== "") {
      return;
    }
    if (answerStatus === "" && !fretIsInRange(outerInd, innerInd)) {
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

  return (
    <Box
      onClick={handleFretAreaClick}
      key={note.name}
      h={`${fretHeight}rem`}
      w="100%"
      display="inline-block"
      position="relative"
      zIndex={answerStatus !== "" || userClickedOutOfRange ? "0" : "7"}
      bg={determineFretColor({
        answer,
        answerStatus,
        fretIsInRange,
        innerInd,
        note,
        noteRangeAllowsDuplicates,
        outerInd,
        selectedNote,
        selectedString,
        thisNoteIsSelected,
        userClickedOutOfRange,
      })}
      boxSizing="border-box"
      border="0 solid var(--main-color-dark)"
      transition="border .2s ease-out"
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
