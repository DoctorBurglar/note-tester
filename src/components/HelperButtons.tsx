import * as React from "react";
import {Flex} from "@chakra-ui/react";
import {StyledButtonSmall} from "../styles";

type HelperButtonsProps = {
  setShowLinesOnStaff: React.MouseEventHandler<HTMLButtonElement>;
  showLinesOnStaff: boolean;
  setShowSpacesOnStaff: React.MouseEventHandler<HTMLButtonElement>;
  showSpacesOnStaff: boolean;
  setDisplayingNotes: React.MouseEventHandler<HTMLButtonElement>;
  displayingNotes: boolean;
};

const HelperButtons: React.FC<HelperButtonsProps> = ({
  setDisplayingNotes,
  setShowLinesOnStaff,
  setShowSpacesOnStaff,
  showLinesOnStaff,
  showSpacesOnStaff,
  displayingNotes,
}) => {
  return (
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
  );
};

export default HelperButtons;