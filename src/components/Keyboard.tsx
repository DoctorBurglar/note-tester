import * as React from "react";
import {Flex, Box, Heading} from "@chakra-ui/react";
import WhiteKeyComp from "./WhiteKeyComp";
import BlackKeyComp from "./BlackKeyComp";
import LowestBlackKey from "./LowestBlackKey";
import Flat from "./Flat";
import Sharp from "./Sharp";
import BlackKeyOverlay from "./BlackKeyOverlay";
import WhiteKeyOverlay from "./WhiteKeyOverlay";
import LowestBlackKeyOverlay from "./LowestBlackKeyOverlay";
import {whiteKeyMinWidth} from "../constants";
import {
  determineWhiteKeyBackgroundColor,
  determineBlackKeyBackgroundColor,
} from "../helpers";
import {useWindowSize} from "../hooks";

interface IKeyboardProps {
  notes: string[];
  isGuestKeyboard: boolean;
  selectedClef: string;
  setSelectedNote: (note: string) => void;
  selectedNote: string;
  answer: string;
  answerStatus: string;
  displayingNotes: boolean;
}

// Hook

const Keyboard: React.FC<IKeyboardProps> = ({
  notes,
  setSelectedNote,
  isGuestKeyboard,
  selectedNote,
  answer,
  answerStatus,
  displayingNotes,
}) => {
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const size = useWindowSize();

  const keyboardRef = React.useRef<HTMLDivElement>(null)!;

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

  const handleFlat = (ind: number) => {
    if (notes.length - 1 <= ind) {
      return;
    } else setSelectedNote(notes[ind + 1][0] + "b" + notes[ind + 1][1]);
  };

  const thisWhiteKeyIsSelected = (note: string, ind: number) => {
    let compareNote = selectedNote;
    if (isGuestKeyboard) {
      compareNote = answer;
    }
    let keyIsSelected = false;
    // if natural white key
    if (note === compareNote) {
      keyIsSelected = true;
    }
    // if Cb or Fb
    if (note[0] === "B" || (note[0] === "E" && ind < notes.length - 1)) {
      if (notes[ind + 1][0] + "b" + notes[ind + 1][1] === compareNote) {
        keyIsSelected = true;
      }
    }
    // if B# or E#
    if (note[0] === "C" || (note[0] === "F" && ind > 0)) {
      if (
        ind > 0 &&
        notes[ind - 1][0] + "s" + notes[ind - 1][1] === compareNote
      ) {
        keyIsSelected = true;
      }
    }
    return keyIsSelected;
  };

  const thisBlackKeyIsSelected = (note: string, ind: number) => {
    let compareNote = selectedNote;
    if (isGuestKeyboard) {
      compareNote = answer;
    }
    let keyIsSelected = false;
    // if note is a selected sharp
    if (note[0] + "s" + note[1] === compareNote) {
      keyIsSelected = true;
    }
    // if note is the lowest key and a flat
    if (ind === 0 && note[0] + "b" + note[1] === compareNote) {
      keyIsSelected = true;
    }
    // if the note is any other black key flat
    if (
      ind < notes.length - 1 &&
      !thisWhiteKeyIsSelected(note, ind) &&
      notes[ind + 1][0] + "b" + notes[ind + 1][1] === compareNote
    ) {
      keyIsSelected = true;
    }
    return keyIsSelected;
  };

  const handleWhiteFlat = (event: React.SyntheticEvent, ind: number) => {
    event.stopPropagation();
    setSelectedNote(notes[ind + 1][0] + "b" + notes[ind + 1][1]);
  };

  const handleWhiteSharp = (event: React.SyntheticEvent, ind: number) => {
    event.stopPropagation();
    if (ind > 0) {
      setSelectedNote(notes[ind - 1][0] + "s" + notes[ind - 1][1]);
    }
  };

  const handleScroll = (event: React.SyntheticEvent) => {
    setScrollLeft(event.currentTarget.scrollLeft);
  };

  // console.log(
  //   "view port width",
  //   size.width,
  //   "scrollLeft",
  //   scrollLeft,
  //   "maxScroll:",
  //   maxScrollLeft,
  //   "scroll perecentage:",
  //   scrollPercentage,
  //   "view box width:",
  //   viewBoxWidth,
  //   "scroll diff:",
  //   scrollDiff
  // );

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
      <Flex
        w="100vw"
        h="17rem"
        justify="flex-start"
        direction="column"
        align="center"
        overflowX="scroll"
        overFlowY="visible"
        onScroll={handleScroll}
        position="relative"
        ref={keyboardRef}
      >
        <Flex
          width={["95%", null, null, null, "90%"]}
          maxWidth="var(--max-width)"
          minHeight="13rem"
          alignItems="stretch"
          position="relative"
          cursor="pointer"
          overFlowY="visible"
          className="noHighlightOnClick"
        >
          {notes.map((note, ind) => {
            return (
              <Box position="relative" key={note} w="100%">
                <WhiteKeyComp
                  note={note}
                  ind={ind}
                  thisWhiteKeyIsSelected={thisWhiteKeyIsSelected}
                  setSelectedNote={setSelectedNote}
                  notes={notes}
                  isGuestKeyboard={isGuestKeyboard}
                  displayingNotes={displayingNotes}
                  answer={answer}
                  answerStatus={answerStatus}
                  selectedNote={selectedNote}
                >
                  {!isGuestKeyboard ? (
                    <WhiteKeyOverlay
                      handleWhiteAccidental={
                        note[0] === "B" || note[0] === "E"
                          ? handleWhiteFlat
                          : handleWhiteSharp
                      }
                      displayingNotes={displayingNotes}
                      ind={ind}
                      note={note}
                      selectedNote={selectedNote}
                      thisWhiteKeyIsSelected={thisWhiteKeyIsSelected}
                    >
                      {" "}
                      {note[0] === "B" || note[0] === "E" ? (
                        <Flat width={1} fill="black" />
                      ) : (
                        <Sharp fill="black" width={1.3} height={2.8} />
                      )}
                    </WhiteKeyOverlay>
                  ) : null}
                </WhiteKeyComp>

                {note[0] !== "B" && note[0] !== "E" ? (
                  <BlackKeyComp
                    thisBlackKeyIsSelected={thisBlackKeyIsSelected}
                    note={note}
                    ind={ind}
                    setSelectedNote={setSelectedNote}
                    isGuestKeyboard={isGuestKeyboard}
                    notes={notes}
                    answer={answer}
                    answerStatus={answerStatus}
                    selectedNote={selectedNote}
                  >
                    {!isGuestKeyboard ? (
                      <BlackKeyOverlay
                        handleFlat={handleFlat}
                        ind={ind}
                        note={note}
                        thisBlackKeyIsSelected={thisBlackKeyIsSelected}
                        notes={notes}
                        selectedNote={selectedNote}
                        setSelectedNote={setSelectedNote}
                      />
                    ) : null}
                  </BlackKeyComp>
                ) : null}

                {/*Special case lowest black key */}
                {note[0] !== "C" && note[0] !== "F" && ind === 0 ? (
                  <LowestBlackKey
                    ind={ind}
                    note={note}
                    setSelectedNote={setSelectedNote}
                    selectedNote={selectedNote}
                    thisBlackKeyIsSelected={thisBlackKeyIsSelected}
                    isGuestKeyboard={isGuestKeyboard}
                    answer={answer}
                    answerStatus={answerStatus}
                  >
                    {!isGuestKeyboard ? (
                      <LowestBlackKeyOverlay
                        ind={ind}
                        note={note}
                        selectedNote={selectedNote}
                        thisBlackKeyIsSelected={thisBlackKeyIsSelected}
                      />
                    ) : null}
                  </LowestBlackKey>
                ) : null}
              </Box>
            );
          })}
        </Flex>
      </Flex>
    </>
  );
};

export default Keyboard;
