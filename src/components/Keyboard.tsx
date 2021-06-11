import { Flex, Box } from "@chakra-ui/react";
import * as React from "react";
import styled from "@emotion/styled";
import { trebleNotes, bassNotes, clefs } from "../constants";
import SelectedKeyboard from "./SelectedKeyboard";
import { IKeyboardProps } from "../interfacesAndTypes";

const Keyboard: React.FC<IKeyboardProps> = ({
  selectedClef,
  selectedNote,
  setSelectedNote,
}) => {
  return (
    <>
      {selectedClef === clefs.TREBLE ? (
        <SelectedKeyboard
          notes={Object.keys(trebleNotes)}
          selectedClef={selectedClef}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
        />
      ) : (
        <SelectedKeyboard
          notes={Object.keys(bassNotes)}
          selectedClef={selectedClef}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
        />
      )}
    </>
  );
};

export default Keyboard;
