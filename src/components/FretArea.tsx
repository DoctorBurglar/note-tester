import * as React from "react";
import {Box, Flex} from "@chakra-ui/react";
import {IGuitarNote} from "../interfacesAndTypes";
import {FretboardDot} from "./FretboardDot";
import {FretboardDoubleDot} from "./FretboardDoubleDot";
import {GuitarNut} from "./GuitarNut";
import {GuitarFret} from "./GuitarFret";
import {GuitarNoteName} from "./GuitarNoteName";
import {GuitarSpaceBetweenFrets} from "./GuitarSpaceBetweenFrets";

type FretAreaProps = {
  note: IGuitarNote;
  outerInd: number;
  innerInd: number;
  fretIsInRange: (outerInd: number, innerInd: number) => boolean;
  selectedString: number;
  noteRangeAllowsDuplicates: boolean;
  handleSelectNote: (note: IGuitarNote) => void;
  setAnswerStatus: React.Dispatch<React.SetStateAction<string>>;
  displayingNotes: boolean;
  displayingFretNumbers: boolean;
  selectedNote: string;
  answer: string;
  answerStatus: string;
};

const FretArea: React.FC<FretAreaProps> = ({
  note,
  outerInd,
  innerInd,
  fretIsInRange,
  selectedString,
  noteRangeAllowsDuplicates,
  handleSelectNote,
  setAnswerStatus,
  displayingFretNumbers,
  displayingNotes,
  selectedNote,
  answerStatus,
  answer,
}) => {
  const handleOutOfRangeAnswer = () => {
    console.log("out of range");
    // setAnswerStatus(answerStatusOptions.OUT_OF_RANGE);
    // setTimeout(() => {
    //   setAnswerStatus("");
    // }, 1000);
  };

  const handleWrongStringAnswer = () => {
    console.log("wrong string");
    // setAnswerStatus(answerStatusOptions.WRONG_STRING);
    // setTimeout(() => {
    //   setAnswerStatus("");
    // }, 1000);
  };

  const handleFretAreaClick = () => {
    if (answerStatus !== "") {
      return;
    }
    if (
      fretIsInRange(outerInd, innerInd) &&
      (outerInd + 1 === selectedString || !noteRangeAllowsDuplicates)
    ) {
      handleSelectNote(note);
    } else if (
      fretIsInRange(outerInd, innerInd) &&
      outerInd + 1 !== selectedString
    ) {
      handleWrongStringAnswer();
    } else {
      handleOutOfRangeAnswer();
    }
  };

  return (
    <Box
      position="relative"
      cursor={!fretIsInRange(outerInd, innerInd) ? "" : "pointer"}
      w={15 - 0.6 * innerInd + "rem"}
    >
      <Flex>
        <GuitarSpaceBetweenFrets
          fretIsInRange={fretIsInRange}
          handleFretAreaClick={handleFretAreaClick}
          innerInd={innerInd}
          note={note}
          noteRangeAllowsDuplicates={noteRangeAllowsDuplicates}
          outerInd={outerInd}
          selectedString={selectedString}
          selectedNote={selectedNote}
          answer={answer}
          answerStatus={answerStatus}
        >
          <GuitarNoteName displayingNotes={displayingNotes} note={note} />
        </GuitarSpaceBetweenFrets>

        {innerInd === 0 && outerInd === 0 ? (
          <GuitarNut />
        ) : (
          <GuitarFret outerInd={outerInd} innerInd={innerInd} />
        )}
      </Flex>

      <FretboardDot
        innerInd={innerInd}
        outerInd={outerInd}
        displayingFretNumbers={displayingFretNumbers}
      />
      <FretboardDoubleDot
        innerInd={innerInd}
        outerInd={outerInd}
        displayingFretNumbers={displayingFretNumbers}
      />
    </Box>
  );
};

export {FretArea};
