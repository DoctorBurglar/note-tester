import * as React from "react";
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuDivider,
  Button,
  MenuItem,
} from "@chakra-ui/react";

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
  console.log(showSpacesOnStaff, showLinesOnStaff, displayingNotes);

  return (
    <Flex
      justify="flex-start"
      align={{base: "flex-start", md: "center"}}
      direction={{base: "column", md: "row"}}
      marginBottom="1rem"
    >
      <Menu closeOnSelect={false} placement="right">
        <MenuButton as={Button} fontSize="1.5rem" w="100%">
          Options
        </MenuButton>
        <MenuList
          minWidth="180px"
          position="relative"
          zIndex="15"
          fontSize="1.5rem"
        >
          <MenuOptionGroup
            title="Staff"
            type="checkbox"
            fontSize="1.5rem"
            value={["lines", "spaces"]}
          >
            <MenuItem onClick={setShowLinesOnStaff}>
              {showLinesOnStaff ? (
                <span style={{width: "2.5rem"}}>&#10003;</span>
              ) : (
                <span style={{width: "2.5rem"}}></span>
              )}{" "}
              Line Mnemonic
            </MenuItem>

            <MenuItem onClick={setShowSpacesOnStaff}>
              {showSpacesOnStaff ? (
                <span style={{width: "2.5rem"}}>&#10003;</span>
              ) : (
                <span style={{width: "2.5rem"}}></span>
              )}{" "}
              Space Mnemonic
            </MenuItem>
          </MenuOptionGroup>
          <MenuDivider />
          <MenuOptionGroup title="Keyboard" type="checkbox" fontSize="1.5rem">
            <MenuItem onClick={setDisplayingNotes}>
              {displayingNotes ? (
                <span style={{width: "2.5rem"}}>&#10003;</span>
              ) : (
                <span style={{width: "2.5rem"}}></span>
              )}{" "}
              Note Names
            </MenuItem>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default HelperButtons;
