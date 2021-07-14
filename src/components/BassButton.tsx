import {Button} from "@chakra-ui/react";
import * as React from "react";
import {clefs} from "../constants";
import BassClef from "./BassClef";
import {useSession} from "../hooks";

const BassButton: React.FC<{
  handleSelectedClef: (clef: string) => void;
  sessionId: string;
}> = ({handleSelectedClef, sessionId}) => {
  const {sessionDoc} = useSession(sessionId);

  return (
    <Button
      h="5rem"
      margin="0 1rem"
      onClick={() => handleSelectedClef(clefs.BASS)}
      backgroundColor={
        sessionDoc?.selectedClef === clefs.BASS
          ? "var(--main-color)"
          : undefined
      }
    >
      <BassClef width="3rem" fill="var(--main-color-dark)" />
    </Button>
  );
};

export default BassButton;
