import {Button} from "@chakra-ui/react";
import * as React from "react";
import {TrebleClef} from "./TrebleClef";
import {BassClef} from "./BassClef";
import {clefs} from "../constants";

type ClefButtonProps = {
  handleSelectedClef: (clef: clefs) => void;
  selectedClef: string;
};

const ClefButton: React.FC<ClefButtonProps> = ({
  handleSelectedClef,
  selectedClef,
}) => {
  const handleSwitchClef = () => {
    if (selectedClef === clefs.TREBLE) {
      handleSelectedClef(clefs.BASS);
    } else if (selectedClef === clefs.BASS) {
      handleSelectedClef(clefs.TREBLE);
    }
  };

  return (
    <Button h="5rem" onClick={handleSwitchClef}>
      {selectedClef === clefs.TREBLE ? (
        <BassClef width="3rem" fill="var(--main-color-dark)" />
      ) : (
        <TrebleClef width="3rem" fill="var(--main-color-dark)" />
      )}
    </Button>
  );
};

export {ClefButton};
