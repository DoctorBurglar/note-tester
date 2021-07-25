import * as React from "react";
import {Flex} from "@chakra-ui/react";
import {StyledButtonSmall} from "../styles";
import ClefButton from "./ClefButton";
import {clefs} from "../constants";
import BassClef from "./BassClef";
import TrebleClef from "./TrebleClef";

interface hostControlsProps {
  setSelectedNote: (note: string) => void;
  displayingNotes: boolean;
  setDisplayingNotes: React.MouseEventHandler<HTMLButtonElement>;
  showLinesOnStaff: boolean;
  setShowLinesOnStaff: React.MouseEventHandler<HTMLButtonElement>;
  showSpacesOnStaff: boolean;
  setShowSpacesOnStaff: React.MouseEventHandler<HTMLButtonElement>;
  setSelectedClef: (clef: clefs) => void;
  selectedClef: string;
}

const HostControls: React.FC<hostControlsProps> = ({
  displayingNotes,
  setDisplayingNotes,
  showLinesOnStaff,
  setShowLinesOnStaff,
  showSpacesOnStaff,
  setShowSpacesOnStaff,
  setSelectedClef,
  selectedClef,
}) => {
  return (
    <Flex
      width={["98%", null, null, null, "90%"]}
      margin="0 auto"
      justify="space-between"
      maxWidth="var(--max-width)"
    >
      <Flex justify="flex-start" align="center" w="50%" flexWrap="wrap">
        <StyledButtonSmall
          onClick={setShowLinesOnStaff}
          bg={showLinesOnStaff ? "var(--main-color)" : ""}
        >
          Lines
        </StyledButtonSmall>
        <StyledButtonSmall
          onClick={setShowSpacesOnStaff}
          bg={showSpacesOnStaff ? "var(--main-color)" : ""}
        >
          Spaces
        </StyledButtonSmall>
        <StyledButtonSmall
          alignSelf="center"
          onClick={setDisplayingNotes}
          bg={displayingNotes ? "var(--main-color)" : ""}
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
          handleSelectedClef={() => setSelectedClef(clefs.TREBLE)}
          clefType={clefs.TREBLE}
          selectedClef={selectedClef}
        >
          <TrebleClef width="3rem" fill="var(--main-color-dark)" />
        </ClefButton>
        <ClefButton
          handleSelectedClef={() => setSelectedClef(clefs.BASS)}
          clefType={clefs.BASS}
          selectedClef={selectedClef}
        >
          <BassClef width="3rem" fill="var(--main-color-dark)" />
        </ClefButton>
      </Flex>
    </Flex>
  );
};

export default HostControls;
