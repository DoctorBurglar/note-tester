import * as React from "react";
import {Flex} from "@chakra-ui/react";
import {useSession} from "../hooks";
import {StyledButtonSmall} from "../styles";
import ClefButton from "./ClefButton";
import {clefs} from "../constants";
import BassClef from "./BassClef";
import TrebleClef from "./TrebleClef";

interface hostControlsProps {
  setSelectedNote: (note: string) => void;
  sessionId: string;
}

const HostControls: React.FC<hostControlsProps> = ({sessionId}) => {
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
      <Flex justify="flex-start" align="center" w="50%" flexWrap="wrap">
        <StyledButtonSmall
          onClick={handleLineMnemonic}
          bg={
            sessionDoc && sessionDoc?.mnemonics?.showLinesOnStaff
              ? "var(--main-color)"
              : ""
          }
        >
          Lines
        </StyledButtonSmall>
        <StyledButtonSmall
          onClick={handleSpaceMnemonic}
          bg={
            sessionDoc && sessionDoc?.mnemonics?.showSpacesOnStaff
              ? "var(--main-color)"
              : ""
          }
        >
          Spaces
        </StyledButtonSmall>
        <StyledButtonSmall
          alignSelf="center"
          onClick={handleDisplayNotes}
          bg={sessionDoc?.displayingNotes ? "var(--main-color)" : ""}
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
        <ClefButton
          handleSelectedClef={handleSelectClef}
          sessionId={sessionId}
          clefType={clefs.TREBLE}
        >
          <TrebleClef width="3rem" fill="var(--main-color-dark)" />
        </ClefButton>
        <ClefButton
          handleSelectedClef={handleSelectClef}
          sessionId={sessionId}
          clefType={clefs.BASS}
        >
          <BassClef width="3rem" fill="var(--main-color-dark)" />
        </ClefButton>
      </Flex>
    </Flex>
  );
};

export default HostControls;
