import * as React from "react";
import {Flex, Button, Checkbox} from "@chakra-ui/react";
import {clefs} from "../constants";
import styled from "@emotion/styled";

const StyledButton = styled(Button)`
  font-size: 2rem;
  margin: 0 1rem;
  border-radius: 5px;
  padding: 0.5rem 1.5rem;
`;

const TeacherControls: React.FC<{
  setSelectedNote: (note: string) => void;
  setSelectedClef: (clef: string) => void;
  selectedClef: string;
  selectedNote: string;
  setDisplayingNotes: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({setSelectedClef, selectedClef, selectedNote, setDisplayingNotes}) => {
  console.log(selectedNote);

  const handleCheck = (e: React.SyntheticEvent) => {
    setDisplayingNotes((prevState) => !prevState);
  };

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
      <Checkbox alignSelf="center" onChange={handleCheck}>
        Display Note Names
      </Checkbox>
    </Flex>
  );
};

export default TeacherControls;
