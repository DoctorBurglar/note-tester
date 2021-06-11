import * as React from "react";
import { Flex, Box } from "@chakra-ui/react";
import { WhiteKey, BlackKey } from "../styles";
import { keyboardWidth, keyWidth, trebleNotes } from "../constants";
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
  return (
    <Flex w={keyboardWidth} h="13rem" alignItems="stretch" position="relative">
      {notes.map((note, ind) => {
        return (
          <Box position="relative" key={note}>
            {/* {ind === 0 && note[0] !== "C" && note[0] !== "F" ? (
              <BlackKey
                style={{
                  left: `calc(-((0.7 * (${keyWidth}rem) / 2))`,
                }}
              />
            ) : null} */}

            {note[0] === "B" || note[0] === "E" ? (
              <WhiteKey
                onClick={() => setSelectedNote(note)}
                style={{
                  backgroundColor: note === selectedNote ? "lightblue" : "",
                }}
              />
            ) : (
              <>
                <WhiteKey
                  onClick={() => setSelectedNote(note)}
                  style={{
                    border: note === trebleNotes.C4 ? "2px solid blue" : "",
                    backgroundColor: note === selectedNote ? "lightblue" : "",
                  }}
                />
                <BlackKey
                  onClick={() => setSelectedNote(note[0] + "s" + note[1])}
                />
              </>
            )}
          </Box>
        );
      })}
    </Flex>
  );
};

export default SelectedKeyboard;
