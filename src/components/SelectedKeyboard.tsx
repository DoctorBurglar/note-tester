import * as React from "react";
import { Flex, Box } from "@chakra-ui/react";
import { keyboardWidth } from "../constants";
import { IKeyboardProps } from "../interfacesAndTypes";
import WhiteKeyWithNoBlackKey from "./WhiteKeyWithNoBlackKey";
import WhiteKeyWithBlackKey from "./WhiteKeyWithBlackKey";

interface ISelectedKeyboardProps extends IKeyboardProps {
  notes: string[];
}

const SelectedKeyboard: React.FC<ISelectedKeyboardProps> = ({
  notes,
  selectedNote,
  setSelectedNote,
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
            {note[0] === "B" || note[0] === "E" ? (
              <WhiteKeyWithNoBlackKey
                handleWhiteFlat={handleWhiteFlat}
                ind={ind}
                note={note}
                selectedNote={selectedNote}
                setSelectedNote={setSelectedNote}
                thisBlackKeyIsSelected={thisBlackKeyIsSelected}
                thisWhiteKeyIsSelected={thisWhiteKeyIsSelected}
              />
            ) : (
              <WhiteKeyWithBlackKey
                handleWhiteFlat={handleWhiteFlat}
                ind={ind}
                note={note}
                selectedNote={selectedNote}
                setSelectedNote={setSelectedNote}
                thisBlackKeyIsSelected={thisBlackKeyIsSelected}
                thisWhiteKeyIsSelected={thisWhiteKeyIsSelected}
                handleFlat={handleFlat}
                handleWhiteSharp={handleWhiteSharp}
                notes={notes}
              />
            )}
          </Box>
        );
      })}
    </Flex>
  );
};

export default SelectedKeyboard;
