import * as React from "react";
import {Flex} from "@chakra-ui/react";
import ClefButton from "./ClefButton";
import {clefs} from "../constants";
import BassClef from "./BassClef";
import TrebleClef from "./TrebleClef";

interface hostControlsProps {
  setSelectedNote: (note: string) => void;
  setSelectedClef: (clef: clefs) => void;
  selectedClef: string;
}

const HostControls: React.FC<hostControlsProps> = ({
  setSelectedClef,
  selectedClef,
  children,
}) => {
  return (
    <Flex
      width={["98%", null, null, null, "90%"]}
      margin="0 auto"
      justify="space-between"
      maxWidth="var(--max-width)"
      marginTop={{base: "-6.5rem", md: "-3rem"}}
    >
      {children}
      <Flex
        marginBottom="1rem"
        w="40%"
        justify="flex-end"
        align={{base: "flex-end", md: "flex-start"}}
        direction={{base: "column", sm: "row"}}
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
