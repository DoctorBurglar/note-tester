import * as React from "react";
import {Button} from "@chakra-ui/react";

const SettingsButton: React.FC<{onOpen: () => void}> = ({onOpen}) => {
  return (
    <Button
      onClick={onOpen}
      marginBottom="1rem"
      position="relative"
      zIndex="20"
      minHeight="2.5rem"
      w="8rem"
    >
      Settings
    </Button>
  );
};

export {SettingsButton};
