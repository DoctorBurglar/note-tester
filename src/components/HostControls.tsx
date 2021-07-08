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

interface hostControlsProps {
  setSelectedNote: (note: string) => void;
  setSelectedClef: (clef: string) => void;
  sessionId: string;
}

const HostControls: React.FC<hostControlsProps> = ({
  setSelectedClef,
  sessionId,
}) => {
  const {sessionRef, sessionDoc} = useSession(sessionId);

  // const handleCheck = (e: React.SyntheticEvent) => {
  //   setDisplayingNotes((prevState) => !prevState);
  // };

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

  const handleDisplayNotes = () => [
    sessionRef.update({displayingNotes: !sessionDoc?.displayingNotes}),
  ];

  return (
    <>
      <GuestScore sessionId={sessionId} />
      <Flex justifyContent="center" marginBottom="1rem" w="40%">
        <StyledButtonLarge
          onClick={() => setSelectedClef(clefs.TREBLE)}
          backgroundColor={
            sessionDoc?.selectedClef === clefs.TREBLE ? "lightblue" : undefined
          }
        >
          Treble Clef
        </StyledButtonLarge>
        <StyledButtonLarge
          onClick={() => setSelectedClef(clefs.BASS)}
          backgroundColor={
            sessionDoc?.selectedClef === clefs.BASS ? "lightblue" : undefined
          }
        >
          Bass Clef
        </StyledButtonLarge>
      </Flex>
      <Flex justify="flex-end" align="center" w="28%">
        <StyledButtonSmall
          alignSelf="center"
          onClick={handleDisplayNotes}
          bg={sessionDoc?.displayingNotes ? "lightblue" : ""}
        >
          Note Names
        </StyledButtonSmall>
        <StyledButtonSmall
          onClick={handleLineMnemonic}
          bg={sessionDoc?.mnemonics.showLinesOnStaff ? "lightblue" : ""}
        >
          Lines
        </StyledButtonSmall>
        <StyledButtonSmall
          onClick={handleSpaceMnemonic}
          bg={sessionDoc?.mnemonics.showSpacesOnStaff ? "lightblue" : ""}
        >
          Spaces
        </StyledButtonSmall>
        <StyledButtonSmall onClick={handleResetScore}>Reset</StyledButtonSmall>
      </Flex>
    </>
  );
};

export default HostControls;
