import * as React from "react";
import {Flex, Box} from "@chakra-ui/react";
import {fretBoardHeight} from "../constants";
import {standardTuningGuitar} from "../helpers";
import {IGuitarNote} from "../interfacesAndTypes";
import {GuitarDecorativeBottom} from "./GuitarDecorativeBottom";
import {GuitarDecorativeTop} from "./GuitarDecorativeTop";
import {GuitarString} from "./GuitarString";
import {FretArea} from "./FretArea";

type GuitarMainProps = {
  noteRangeAllowsDuplicates: boolean;
  selectedString: number;
  displayingNotes: boolean;
  displayingFretNumbers: boolean;
  fretIsInRange: (outerInd: number, innerInd: number) => boolean;
  handleSelectNote: (note: IGuitarNote) => void;
  setAnswerStatus: React.Dispatch<React.SetStateAction<string>>;
  handleScroll: (event: React.SyntheticEvent) => void;
  guitarRef: React.LegacyRef<HTMLDivElement> | undefined;
  selectedNote: string;
  answer: string;
  answerStatus: string;
};

const GuitarMain: React.FC<GuitarMainProps> = ({
  noteRangeAllowsDuplicates,
  selectedString,
  displayingNotes,
  displayingFretNumbers,
  fretIsInRange,
  handleSelectNote,
  setAnswerStatus,
  guitarRef,
  handleScroll,
  selectedNote,
  answer,
  answerStatus,
}) => {
  const [userClickedOutOfRange, setUserClickedOutOfRange] =
    React.useState(false);

  return (
    <Flex
      w="100vw"
      overflowX="scroll"
      overflowY="visible"
      position="relative"
      className="noHighlightOnClick"
      marginTop="-1rem"
      ref={guitarRef}
      onScroll={handleScroll}
    >
      <Box
        position="absolute"
        h={`${fretBoardHeight - 1}rem`}
        minWidth="80rem"
        w="100%"
        bg="var(--guitar-brown)"
        top="1.8rem"
        zIndex="-20"
      ></Box>
      <Flex direction="column" w="100%" minWidth="80rem">
        <GuitarDecorativeTop />
        {standardTuningGuitar.map((string, outerInd) => {
          return (
            <GuitarString
              key={string[0].name}
              noteRangeAllowsDuplicates={noteRangeAllowsDuplicates}
              outerInd={outerInd}
              selectedString={selectedString}
              string={string}
            >
              {string.map((note, innerInd) => {
                return (
                  <FretArea
                    key={note.name}
                    note={note}
                    displayingFretNumbers={displayingFretNumbers}
                    displayingNotes={displayingNotes}
                    fretIsInRange={fretIsInRange}
                    handleSelectNote={handleSelectNote}
                    innerInd={innerInd}
                    noteRangeAllowsDuplicates={noteRangeAllowsDuplicates}
                    outerInd={outerInd}
                    selectedString={selectedString}
                    setAnswerStatus={setAnswerStatus}
                    selectedNote={selectedNote}
                    answer={answer}
                    answerStatus={answerStatus}
                    userClickedOutOfRange={userClickedOutOfRange}
                    setUserClickedOutOfRange={setUserClickedOutOfRange}
                  />
                );
              })}
            </GuitarString>
          );
        })}

        <GuitarDecorativeBottom />
      </Flex>
    </Flex>
  );
};

export {GuitarMain};
