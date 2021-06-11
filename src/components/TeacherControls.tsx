import * as React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { clefs, bassNotes, trebleNotes } from "../constants";
import styled from "@emotion/styled";

const StyledButton = styled(Button)`
  font-size: 2rem;
  margin: 0 1rem;
  border-radius: 5px;
  padding: 0.5rem 1.5rem;
`;

const TeacherControls: React.FC<{
  setSelectedNote: React.Dispatch<React.SetStateAction<string>>;
  setSelectedClef: React.Dispatch<React.SetStateAction<string>>;
  selectedClef: string;
  selectedNote: string;
}> = ({ setSelectedNote, setSelectedClef, selectedClef, selectedNote }) => {
  console.log(selectedNote);

  return (
    <Flex direction="column" width="100%" margin="2rem 0 1rem 0">
      <Flex width="100%" justifyContent="center" marginBottom="1rem">
        <StyledButton
          onClick={() => setSelectedClef(clefs.TREBLE)}
          backgroundColor={
            selectedClef === clefs.TREBLE ? "lightblue" : undefined
          }
        >
          Treble Clef
        </StyledButton>
        <StyledButton
          onClick={() => setSelectedClef(clefs.BASS)}
          backgroundColor={
            selectedClef === clefs.BASS ? "lightblue" : undefined
          }
        >
          Bass Clef
        </StyledButton>
      </Flex>
      {/* <Flex
        width="100%"
        flexWrap="wrap"
        margin="0 auto"
        flexDirection="row-reverse"
        justifyContent="flex-end"
      >
        {Object.keys(
          selectedClef === clefs.BASS
            ? bassNotes
            : selectedClef === clefs.TREBLE
            ? trebleNotes
            : []
        ).map((note) => {
          return (
            <Button
              key={note}
              padding=".5rem 1rem"
              margin="1rem"
              width="5rem"
              fontSize="2rem"
              backgroundColor={note === selectedNote ? "lightblue" : undefined}
              borderRadius="5px"
              onClick={() => setSelectedNote(note)}
            >
              {note}
            </Button>
          );
        })}
      </Flex> */}
    </Flex>
  );
};

export default TeacherControls;
