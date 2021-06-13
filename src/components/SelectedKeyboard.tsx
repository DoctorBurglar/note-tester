import * as React from "react";
import { Flex, Box, Heading } from "@chakra-ui/react";
import { WhiteKey, BlackKey } from "../styles";
import {
  keyboardWidth,
  whiteKeyWidth,
  blackKeyWidth,
  trebleNotes,
} from "../constants";
import { IKeyboardProps } from "../interfacesAndTypes";

interface ISelectedKeyboardProps extends IKeyboardProps {
  notes: string[];
}

const SelectedKeyboard: React.FC<ISelectedKeyboardProps> = ({
  notes,
  selectedClef,
  selectedNote,
  setSelectedNote,
}) => {
  const handleFlat = (ind: number) => {
    console.log("made it here");
    if (notes.length - 1 <= ind) {
      return;
    } else setSelectedNote(notes[ind + 1][0] + "b" + notes[ind + 1][1]);
  };

  const noteIsSelected = (note: string, ind: number) => {
    // for first black key (if it exists)
    if (ind === 0) {
      return note[0] + "b" + note[1] === selectedNote;
    }
    return (
      note[0] + "s" + note[1] === selectedNote ||
      (ind < notes.length - 1 &&
        notes[ind + 1][0] + "b" + notes[ind + 1][1] === selectedNote)
    );
  };

  return (
    <Flex w={keyboardWidth} h="13rem" alignItems="stretch" position="relative">
      {notes.map((note, ind) => {
        return (
          <Box position="relative" key={note}>
            {note[0] === "B" || note[0] === "E" ? (
              <>
                <WhiteKey
                  cursor="pointer"
                  onClick={() => setSelectedNote(note)}
                  style={{
                    backgroundColor: note === selectedNote ? "lightblue" : "",
                  }}
                />
                {ind === 0 ? (
                  <BlackKey left={`calc((-${blackKeyWidth} / 2))`}>
                    <Flex
                      position="relative"
                      h="100%"
                      zIndex="10"
                      justify="center"
                      align="center"
                      onClick={() => setSelectedNote(note[0] + "b" + note[1])}
                      overflow="hidden"
                      borderRadius="0 0 5px 5px"
                      style={
                        noteIsSelected(note, ind)
                          ? {
                              backgroundColor: "lightblue",
                              color: "black",
                            }
                          : {}
                      }
                    >
                      <Heading
                        color={noteIsSelected(note, ind) ? "black" : "white"}
                        as="h1"
                        textAlign="center"
                      >
                        b
                      </Heading>
                    </Flex>
                  </BlackKey>
                ) : null}
              </>
            ) : (
              <>
                <WhiteKey
                  cursor="pointer"
                  onClick={() => setSelectedNote(note)}
                  style={{
                    border: note === trebleNotes.C4 ? "2px solid blue" : "",
                    backgroundColor: note === selectedNote ? "lightblue" : "",
                  }}
                />
                {note[0] !== "C" && note[0] !== "F" && ind === 0 ? (
                  <BlackKey left="-5rem" />
                ) : null}
                <BlackKey
                  cursor="pointer"
                  style={{
                    backgroundColor: noteIsSelected(note, ind)
                      ? "lightblue"
                      : "",
                  }}
                  left={`calc(${whiteKeyWidth} - (${blackKeyWidth} / 2))`}
                >
                  <Flex
                    position="absolute"
                    h="100%"
                    w="100%"
                    direction="column"
                    align="stretch"
                  ></Flex>
                  <Flex
                    position="relative"
                    h={ind === notes.length - 1 ? "100%" : "50%"}
                    borderBottom={
                      noteIsSelected(note, ind) && ind !== notes.length - 1
                        ? "1px solid black"
                        : ind !== notes.length - 1
                        ? "1px solid white"
                        : "none"
                    }
                    zIndex="10"
                    justify="center"
                    align="center"
                    onClick={() => setSelectedNote(note[0] + "s" + note[1])}
                  >
                    <Heading
                      color={noteIsSelected(note, ind) ? "black" : "white"}
                      as="h1"
                      textAlign="center"
                    >
                      #
                    </Heading>
                  </Flex>
                  <Flex
                    position="relative"
                    h={ind === notes.length - 1 ? "0" : "50%"}
                    zIndex="10"
                    justify="center"
                    align="center"
                    overflow="hidden"
                    onClick={() => handleFlat(ind)}
                  >
                    <Heading
                      color={noteIsSelected(note, ind) ? "black" : "white"}
                      as="h1"
                      textAlign="center"
                    >
                      b
                    </Heading>
                  </Flex>
                </BlackKey>
              </>
            )}
          </Box>
        );
      })}
    </Flex>
  );
};

export default SelectedKeyboard;
