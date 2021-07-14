import {Button} from "@chakra-ui/react";
import * as React from "react";
import {useSession} from "../hooks";

const ClefButton: React.FC<{
  handleSelectedClef: (clef: string) => void;
  sessionId: string;
  clefType: string;
}> = ({handleSelectedClef, sessionId, clefType, children}) => {
  const {sessionDoc} = useSession(sessionId);

  return (
    <Button
      h="5rem"
      margin="0 1rem"
      onClick={() => handleSelectedClef(clefType)}
      backgroundColor={
        sessionDoc?.selectedClef === clefType ? "var(--main-color)" : undefined
      }
    >
      {children}
    </Button>
  );
};

export default ClefButton;
