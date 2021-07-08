import * as React from "react";
import {Flex, Box} from "@chakra-ui/react";
import {keyboardWidth} from "../constants";
import WhiteKeyComp from "./WhiteKeyComp";
import BlackKeyComp from "./BlackKeyComp";
import LowestBlackKey from "./LowestBlackKey";
import Flat from "./Flat";
import Sharp from "./Sharp";
import BlackKeyOverlay from "./BlackKeyOverlay";
import WhiteKeyOverlay from "./WhiteKeyOverlay";
import {useSession} from "../hooks";

interface IKeyboardProps {
  notes: string[];
  isGuestKeyboard: boolean;
  sessionId: string;
  selectedClef: string;
  setSelectedNote: (note: string) => void;
}

const Keyboard: React.FC<IKeyboardProps> = ({
  notes,
  setSelectedNote,
  isGuestKeyboard,
  sessionId,
}) => {
  const {sessionDoc} = useSession(sessionId);

  const handleFlat = (ind: number) => {
    console.log("made it here");
    if (notes.length - 1 <= ind) {
      return;
    } else setSelectedNote(notes[ind + 1][0] + "b" + notes[ind + 1][1]);
  };

  const thisWhiteKeyIsSelected = (note: string, ind: number) => {
    let compareNote = sessionDoc?.selectedNote;
    if (isGuestKeyboard) {
      compareNote = sessionDoc?.answer;
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
    let compareNote = sessionDoc?.selectedNote;
    if (isGuestKeyboard) {
      compareNote = sessionDoc?.answer;
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

  return (
    <Flex
      w={keyboardWidth}
      h="13rem"
      alignItems="stretch"
      position="relative"
      cursor="pointer"
    >
      {notes.map((note, ind) => {
        return (
          <Box position="relative" key={note}>
            <WhiteKeyComp
              note={note}
              ind={ind}
              thisWhiteKeyIsSelected={thisWhiteKeyIsSelected}
              setSelectedNote={setSelectedNote}
              notes={notes}
              isGuestKeyboard={isGuestKeyboard}
              sessionId={sessionId}
            >
              {!isGuestKeyboard ? (
                <WhiteKeyOverlay
                  handleWhiteAccidental={
                    note[0] === "B" || note[0] === "E"
                      ? handleWhiteFlat
                      : handleWhiteSharp
                  }
                  displayingNotes={sessionDoc?.displayingNotes}
                  ind={ind}
                  note={note}
                  selectedNote={sessionDoc?.selectedNote}
                  thisWhiteKeyIsSelected={thisWhiteKeyIsSelected}
                >
                  {" "}
                  {note[0] === "B" || note[0] === "E" ? (
                    <Flat width={13} fill="black" />
                  ) : (
                    <Sharp fill="black" width={17} height={30} />
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
                sessionId={sessionId}
                notes={notes}
              >
                {!isGuestKeyboard ? (
                  <BlackKeyOverlay
                    handleFlat={handleFlat}
                    ind={ind}
                    note={note}
                    thisBlackKeyIsSelected={thisBlackKeyIsSelected}
                    notes={notes}
                    selectedNote={sessionDoc?.selectedNote}
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
                selectedNote={sessionDoc?.selectedNote}
                thisBlackKeyIsSelected={thisBlackKeyIsSelected}
              />
            ) : null}
          </Box>
        );
      })}
    </Flex>
  );
};

export default Keyboard;
