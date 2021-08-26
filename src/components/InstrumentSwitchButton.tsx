import * as React from "react";
import {Button} from "@chakra-ui/react";
import {useHistory} from "react-router";

const InstrumentSwitchButton: React.FC<{target: string}> = ({
  children,
  target,
}) => {
  const history = useHistory();

  return (
    <Button
      position="relative"
      zIndex="20"
      onClick={() => history.push(`/solo-mode/${target}`)}
      minHeight="2.5rem"
      w="8rem"
    >
      {children} &rarr;
    </Button>
  );
};

export {InstrumentSwitchButton};
