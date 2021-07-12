import * as React from "react";
import {Flex} from "@chakra-ui/react";
import {useSession} from "../hooks";
import {StyledButtonSmall} from "../styles";
import TrebleButton from "./TrebleButton";
import BassButton from "./BassButton";

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

  const handleDisplayNotes = () => [
    sessionRef.update({displayingNotes: !sessionDoc?.displayingNotes}),
  ];

  const handleSelectClef = (clef: string) => {
    sessionRef.update({selectedClef: clef, selectedNote: "", answer: ""});
  };

  return (
    <Flex
      width={["98%", null, null, null, "90%"]}
      margin="0 auto"
      justify="space-between"
      maxWidth="var(--max-width)"
    >
      {/* <GuestScore sessionId={sessionId} isHost /> */}

      <Flex justify="flex-start" align="center" w="50%" flexWrap="wrap">
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
        <StyledButtonSmall
          alignSelf="center"
          onClick={handleDisplayNotes}
          bg={sessionDoc?.displayingNotes ? "lightblue" : ""}
        >
          Keys
        </StyledButtonSmall>
      </Flex>
      <Flex
        marginBottom="1rem"
        w="40%"
        justify="flex-end"
        align={{base: "flex-end", md: "flex-start"}}
      >
        <TrebleButton
          handleSelectedClef={handleSelectClef}
          sessionId={sessionId}
        />
        <BassButton
          handleSelectedClef={handleSelectClef}
          sessionId={sessionId}
        />
        {/* <StyledButtonLarge
          onClick={() => setSelectedClef(clefs.TREBLE)}
          backgroundColor={
            sessionDoc?.selectedClef === clefs.TREBLE ? "lightblue" : undefined
          }
        >
          Treble
        </StyledButtonLarge>
        <StyledButtonLarge
          onClick={() => setSelectedClef(clefs.BASS)}
          backgroundColor={
            sessionDoc?.selectedClef === clefs.BASS ? "lightblue" : undefined
          }
        >
          Bass
        </StyledButtonLarge> */}
      </Flex>
    </Flex>
  );
};

export default HostControls;
