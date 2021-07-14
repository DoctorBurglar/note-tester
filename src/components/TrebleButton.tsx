import {Button} from "@chakra-ui/react";
import * as React from "react";
import {clefs} from "../constants";
import TrebleClef from "./TrebleClef";
import {useSession} from "../hooks";

const TrebleButton: React.FC<{
  handleSelectedClef: (clef: string) => void;
  sessionId: string;
}> = ({handleSelectedClef, sessionId}) => {
  const {sessionDoc} = useSession(sessionId);

  return (
    <Button
      h="5rem"
      onClick={() => handleSelectedClef(clefs.TREBLE)}
      backgroundColor={
        sessionDoc?.selectedClef === clefs.TREBLE
          ? "var(--main-color)"
          : undefined
      }
    >
      <TrebleClef width="3rem" fill="var(--main-color-dark)" />
    </Button>
  );
};

export default TrebleButton;
