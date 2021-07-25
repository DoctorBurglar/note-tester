import {Button} from "@chakra-ui/react";
import * as React from "react";

const ClefButton: React.FC<{
  handleSelectedClef: (clef: string) => void;
  clefType: string;
  selectedClef: string;
}> = ({handleSelectedClef, clefType, children, selectedClef}) => {
  return (
    <Button
      h="5rem"
      margin="0 1rem"
      onClick={() => handleSelectedClef(clefType)}
      backgroundColor={
        selectedClef === clefType ? "var(--main-color)" : undefined
      }
    >
      {children}
    </Button>
  );
};

export default ClefButton;
