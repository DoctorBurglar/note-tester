import * as React from "react";
import {Flex, Box} from "@chakra-ui/react";
import {keyboardWidth} from "../constants";
import {IKeyboardProps} from "../interfacesAndTypes";
import WhiteKeyComp from "./WhiteKeyComp";
import BlackKeyComp from "./BlackKeyComp";
import LowestBlackKey from "./LowestBlackKey";
import Flat from "./Flat";
import Sharp from "./Sharp";
import BlackKeyOverlay from "./BlackKeyOverlay";
import WhiteKeyOverlay from "./WhiteKeyOverlay";

interface ISelectedKeyboardProps extends IKeyboardProps {
  notes: string[];
  displayingNotes: boolean;
  isStudentKeyboard: boolean;
  answerStatus?: string;
}

const SelectedKeyboard: React.FC<ISelectedKeyboardProps> = ({
  notes,
  selectedNote,
  setSelectedNote,
  displayingNotes,
  isStudentKeyboard,
  answerStatus,
}) => {
  const handleFlat = (ind: number) => {
    console.log("made it here");
    if (notes.length - 1 <= ind) {
      return;
    } else setSelectedNote(notes[ind + 1][0] + "b" + notes[ind + 1][1]);
  };

  const thisWhiteKeyIsSelected = (note: string, ind: number) => {
    let keyIsSelected = false;
    // if natural white key
    if (note === selectedNote) {
      keyIsSelected = true;
    }
    // if Cb or Fb
    if (note[0] === "B" || (note[0] === "E" && ind < notes.length - 1)) {
      if (notes[ind + 1][0] + "b" + notes[ind + 1][1] === selectedNote) {
        keyIsSelected = true;
      }
    }
    // if B# or E#
    if (note[0] === "C" || (note[0] === "F" && ind > 0)) {
      if (
        ind > 0 &&
        notes[ind - 1][0] + "s" + notes[ind - 1][1] === selectedNote
      ) {
        keyIsSelected = true;
      }
    }
    return keyIsSelected;
  };

  const thisBlackKeyIsSelected = (note: string, ind: number) => {
    let keyIsSelected = false;
    // if note is a selected sharp
    if (note[0] + "s" + note[1] === selectedNote) {
      keyIsSelected = true;
    }
    // if note is the lowest key and a flat
    if (ind === 0 && note[0] + "b" + note[1] === selectedNote) {
      keyIsSelected = true;
    }
    // if the note is any other black key flat
    if (
      ind < notes.length - 1 &&
      !thisWhiteKeyIsSelected(note, ind) &&
      notes[ind + 1][0] + "b" + notes[ind + 1][1] === selectedNote
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
              displayingNotes={displayingNotes}
            >
              {!isStudentKeyboard ? (
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
                isStudentKeyboard={isStudentKeyboard}
                answerStatus={answerStatus}
              >
                {!isStudentKeyboard ? (
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
              />
            ) : null}
          </Box>
        );
      })}
    </Flex>
  );
};

export default SelectedKeyboard;
