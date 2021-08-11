import * as React from "react";
import {Flex} from "@chakra-ui/react";
import {ClefButton} from "./ClefButton";
import {clefs} from "../constants";

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
      marginTop={{base: "-5.5rem", md: "-rem"}}
      marginBottom="2rem"
      align="flex-end"
      padding="0 2rem"
    >
      {children}
      <Flex
        w="40%"
        justify="flex-end"
        align={{base: "flex-end", md: "flex-start"}}
        direction={{base: "column", sm: "row"}}
      >
        <ClefButton
          handleSelectedClef={setSelectedClef}
          selectedClef={selectedClef}
        />
      </Flex>
    </Flex>
  );
};

export {HostControls};
