import * as React from "react";
import {Flex, Box} from "@chakra-ui/react";
import {GuitarDecorativeTopForScrollModel} from "./GuitarDecorativeTopForScrollModel";
import {GuitarDecorativeBottomForScrollModel} from "./GuitarDecorativeBottomForScrollModel";
import {GuitarStringForScrollModel} from "./GuitarStringForScrollModel";
import {GuitarFretForScrollModel} from "./GuitarFretForScrollModel";
import {fretHeight, fretBoardHeight} from "../constants";
import {standardTuningGuitar} from "../helpers";

type GuitarForScrollModelProps = {
  noteRangeAllowsDuplicates: boolean;
  selectedString: number;
  displayingFretNumbers: boolean;
  fretIsInRange: (outerInd: number, innerInd: number) => boolean;
  answer: string;
  answerStatus: string;
  selectedNote: string;
  userClickedOutOfRange: boolean;
};

const GuitarForScrollModel: React.FC<GuitarForScrollModelProps> = ({
  noteRangeAllowsDuplicates,
  selectedString,
  displayingFretNumbers,
  fretIsInRange,
  answer,
  answerStatus,
  selectedNote,
  userClickedOutOfRange,
}) => {
  return (
    <Flex
      minWidth="100%"
      maxWidth="100%"
      minHeight="70px"
      margin=".5rem auto"
      paddingTop=".3rem"
    >
      <Flex w="100vw" position="relative" className="noHighlightOnClick">
        <Box
          position="absolute"
          h={`${fretBoardHeight - 15}rem`}
          minWidth="100%"
          w="100%"
          bg="var(--guitar-brown)"
          top="1.8rem"
          zIndex="-20"
        ></Box>
        <Flex direction="column" w="100%" minWidth="100%">
          <GuitarDecorativeTopForScrollModel />
          {standardTuningGuitar.map((string, outerInd) => {
            return (
              <GuitarStringForScrollModel
                key={string[0].name}
                noteRangeAllowsDuplicates={noteRangeAllowsDuplicates}
                outerInd={outerInd}
                selectedString={selectedString}
                string={string}
              >
                {string.map((note, innerInd) => {
                  return (
                    <GuitarFretForScrollModel
                      key={note.name}
                      displayingFretNumbers={displayingFretNumbers}
                      fretBoardHeight={fretBoardHeight}
                      fretHeight={fretHeight}
                      fretIsInRange={fretIsInRange}
                      innerInd={innerInd}
                      note={note}
                      outerInd={outerInd}
                      answer={answer}
                      answerStatus={answerStatus}
                      selectedNote={selectedNote}
                      selectedString={selectedString}
                      noteRangeAllowsDuplicates={noteRangeAllowsDuplicates}
                      userClickedOutOfRange={userClickedOutOfRange}
                    />
                  );
                })}
              </GuitarStringForScrollModel>
            );
          })}

          <GuitarDecorativeBottomForScrollModel />
        </Flex>
      </Flex>
    </Flex>
  );
};

export {GuitarForScrollModel};
