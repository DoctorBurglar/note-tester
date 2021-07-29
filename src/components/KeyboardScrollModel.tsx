import * as React from "react";
import {Flex, Box, Heading} from "@chakra-ui/react";
import {
  determineBlackKeyBackgroundColor,
  determineWhiteKeyBackgroundColor,
} from "../helpers";
import {useWindowSize} from "../hooks";
import {whiteKeyMinWidth} from "../constants";

type KeyboardScrollModelProps = {
  notes: string[];
  selectedNote: string;
  answer: string;
  answerStatus: string;
  isGuestKeyboard: boolean;
  scrollLeft: number;
  keyboardRef: React.RefObject<HTMLDivElement>;
  thisWhiteKeyIsSelected: (note: string, ind: number) => boolean;
  thisBlackKeyIsSelected: (note: string, ind: number) => boolean;
};

const KeyboardScrollModel: React.FC<KeyboardScrollModelProps> = ({
  notes,
  selectedNote,
  answer,
  answerStatus,
  isGuestKeyboard,
  scrollLeft,
  thisWhiteKeyIsSelected,
  thisBlackKeyIsSelected,
  keyboardRef,
}) => {
  const size = useWindowSize();

  const remInPixels = Number.parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  let viewBoxWidth;
  let viewBoxWidthInverse;
  if (size.width) {
    viewBoxWidth =
      (size.width /
        (Number.parseFloat(whiteKeyMinWidth) * notes.length * remInPixels)) *
        100 +
      "%";
    viewBoxWidthInverse = 100 - Number.parseFloat(viewBoxWidth) + "%";
  }

  let maxScrollLeft;
  let scrollPercentage;
  if (keyboardRef.current && size.width) {
    maxScrollLeft =
      keyboardRef.current?.scrollWidth - keyboardRef.current?.clientWidth;
    scrollPercentage = scrollLeft / maxScrollLeft;
  }

  return (
    <>
      {maxScrollLeft === 0 ? null : (
        <>
          <Flex
            w="100vw"
            maxWidth="50rem"
            boxSizing="border-box"
            margin="-1rem auto"
            position="relative"
            marginBottom="1rem"
          >
            <Box
              w={viewBoxWidth}
              h="8rem"
              position="absolute"
              bottom="0"
              left={`calc(${scrollPercentage} * ${viewBoxWidthInverse})`}
              border="3px solid black"
              borderRadius="3px"
              zIndex="4"
            ></Box>
            <Flex w="98%" bottom="0" margin="2rem auto" position="relative">
              {notes.map((note, ind) => (
                <Box
                  key={note}
                  w={`${100 / notes.length}%`}
                  border="1px solid black"
                  borderRadius="0 0 3px 3px"
                  h="5rem"
                  position="relative"
                  bg={determineWhiteKeyBackgroundColor(
                    notes,
                    note,
                    ind,
                    selectedNote,
                    answer,
                    answerStatus,
                    isGuestKeyboard,
                    thisWhiteKeyIsSelected
                  )}
                >
                  {note[0] !== "B" && note[0] !== "E" ? (
                    <Box
                      position="absolute"
                      left="100%"
                      w="70%"
                      border="1px solid black"
                      bg={determineBlackKeyBackgroundColor(
                        notes,
                        note,
                        ind,
                        selectedNote,
                        answer,
                        answerStatus,
                        isGuestKeyboard,
                        thisBlackKeyIsSelected
                      )}
                      h="60%"
                      transform="translateX(-50%) translateY(-1px)"
                      borderRadius="0 0 3px 3px"
                      zIndex="3"
                    ></Box>
                  ) : null}
                  {note[0] !== "C" &&
                  note[0] !== "F" &&
                  notes.indexOf(note) === 0 ? (
                    <Box
                      position="absolute"
                      right="100%"
                      w="70%"
                      bg="black"
                      h="60%"
                      transform="translateX(50%) translateY(-1px)"
                      borderRadius="0 0 4px 4px"
                    ></Box>
                  ) : null}
                  {note === "C4" ? (
                    <Heading
                      as="h3"
                      position="absolute"
                      bottom="-2rem"
                      left="50%"
                      transform="translateX(-50%)"
                      fontSize="1.5rem"
                    >
                      M
                    </Heading>
                  ) : null}
                </Box>
              ))}
            </Flex>
          </Flex>
        </>
      )}
    </>
  );
};

export default KeyboardScrollModel;
