import * as React from "react";
import {Flex, Button} from "@chakra-ui/react";
import {clefs} from "../constants";
import styled from "@emotion/styled";
import {useSession} from "../hooks";
import GuestScore from "./GuestScore";

const StyledButtonLarge = styled(Button)`
  font-size: 2rem;
  margin: 0 1rem;
  border-radius: 5px;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
`;

const StyledButtonSmall = styled(Button)`
  font-size: 1rem;
  margin: 0 0.3rem;
  border-radius: 5px;
  padding: 0.3rem 1rem;
  cursor: pointer;
`;

interface teacherControlsProps {
  setSelectedNote: (note: string) => void;
  setSelectedClef: (clef: string) => void;
  selectedClef: string;
  selectedNote: string;
  setDisplayingNotes: React.Dispatch<React.SetStateAction<boolean>>;
  sessionId: string;
}

const TeacherControls: React.FC<teacherControlsProps> = ({
  setSelectedClef,
  selectedClef,
  selectedNote,
  setDisplayingNotes,
  sessionId,
}) => {
  console.log(selectedNote);

  const {sessionRef, sessionDoc} = useSession(sessionId);

  const handleCheck = (e: React.SyntheticEvent) => {
    setDisplayingNotes((prevState) => !prevState);
  };

  const handleLineMnemonic = () => {
    sessionRef.update({
      mnemonics: {
        ...sessionDoc.mnemonics,
        showLinesOnStaff: !sessionDoc.mnemonics.showLinesOnStaff,
      },
    });
  };

  const handleSpaceMnemonic = () => {
    sessionRef.update({
      mnemonics: {
        ...sessionDoc.mnemonics,
        showSpacesOnStaff: !sessionDoc.mnemonics.showSpacesOnStaff,
      },
    });
  };

  const handleResetScore = () => {
    sessionRef.update({
      identifiedNotes: 0,
      totalNotes: 0,
    });
  };

  return (
    <>
      <GuestScore sessionId={sessionId} />
      <Flex justifyContent="center" marginBottom="1rem" w="40%">
        <StyledButtonLarge
          onClick={() => setSelectedClef(clefs.TREBLE)}
          backgroundColor={
            selectedClef === clefs.TREBLE ? "lightblue" : undefined
          }
        >
          Treble Clef
        </StyledButtonLarge>
        <StyledButtonLarge
          onClick={() => setSelectedClef(clefs.BASS)}
          backgroundColor={
            selectedClef === clefs.BASS ? "lightblue" : undefined
          }
        >
          Bass Clef
        </StyledButtonLarge>
      </Flex>
      <Flex justify="flex-end" align="center" w="28%">
        <StyledButtonSmall alignSelf="center" onClick={handleCheck}>
          Note Names
        </StyledButtonSmall>
        <StyledButtonSmall
          onClick={handleLineMnemonic}
          bg={sessionDoc.mnemonics.showLinesOnStaff ? "lightblue" : ""}
        >
          Lines
        </StyledButtonSmall>
        <StyledButtonSmall
          onClick={handleSpaceMnemonic}
          bg={sessionDoc.mnemonics.showSpacesOnStaff ? "lightblue" : ""}
        >
          Spaces
        </StyledButtonSmall>
        <StyledButtonSmall onClick={handleResetScore}>Reset</StyledButtonSmall>
      </Flex>
    </>
  );
};

export default TeacherControls;
