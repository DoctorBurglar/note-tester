import * as React from "react";
import {Flex, Box} from "@chakra-ui/react";
import {WhiteKeyComp} from "./WhiteKeyComp";
import {BlackKeyComp} from "./BlackKeyComp";
import {LowestBlackKey} from "./LowestBlackKey";
import {Flat} from "./Flat";
import {Sharp} from "./Sharp";
import {BlackKeyOverlay} from "./BlackKeyOverlay";
import {WhiteKeyOverlay} from "./WhiteKeyOverlay";
import {LowestBlackKeyOverlay} from "./LowestBlackKeyOverlay";
import {KeyboardScrollModel} from "./KeyboardScrollModel";

type KeyboardProps = {
  notes: string[];
  isGuestKeyboard: boolean;
  selectedClef: string;
  setSelectedNote: (note: string) => void;
  selectedNote: string;
  answer: string;
  answerStatus: string;
  displayingNotes: boolean;
};

const Keyboard: React.FC<KeyboardProps> = ({
  notes,
  setSelectedNote,
  isGuestKeyboard,
  selectedNote,
  answer,
  answerStatus,
  displayingNotes,
}) => {
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const keyboardRef = React.useRef<HTMLDivElement>(null)!;

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

  return (
    <>
      <KeyboardScrollModel
        answer={answer}
        answerStatus={answerStatus}
        isGuestKeyboard={isGuestKeyboard}
        notes={notes}
        selectedNote={selectedNote}
        thisBlackKeyIsSelected={thisBlackKeyIsSelected}
        thisWhiteKeyIsSelected={thisWhiteKeyIsSelected}
        scrollLeft={scrollLeft}
        keyboardRef={keyboardRef}
      />

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

export {Keyboard};
