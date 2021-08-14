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

type OptionsProps = {
  setShowLinesOnStaff: React.Dispatch<React.SetStateAction<boolean>>;
  showLinesOnStaff: boolean;
  setShowSpacesOnStaff: React.Dispatch<React.SetStateAction<boolean>>;
  showSpacesOnStaff: boolean;
  setDisplayingNotes: React.Dispatch<React.SetStateAction<boolean>>;
  displayingNotes: boolean;
};

const Options: React.FC<OptionsProps> = ({
  setDisplayingNotes,
  setShowLinesOnStaff,
  setShowSpacesOnStaff,
  showLinesOnStaff,
  showSpacesOnStaff,
  displayingNotes,
  children,
}) => {
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
          zIndex="1000"
          fontSize="1.5rem"
        >
          <MenuOptionGroup
            title="Staff"
            type="checkbox"
            fontSize="1.5rem"
            value={["lines", "spaces"]}
          >
            <MenuItem
              onClick={() => setShowLinesOnStaff((prevBool) => !prevBool)}
            >
              {showLinesOnStaff ? (
                <span style={{width: "2.5rem"}}>&#10003;</span>
              ) : (
                <span style={{width: "2.5rem"}}></span>
              )}{" "}
              Line Mnemonic
            </MenuItem>

            <MenuItem
              onClick={() => setShowSpacesOnStaff((prevBool) => !prevBool)}
            >
              {showSpacesOnStaff ? (
                <span style={{width: "2.5rem"}}>&#10003;</span>
              ) : (
                <span style={{width: "2.5rem"}}></span>
              )}{" "}
              Space Mnemonic
            </MenuItem>
          </MenuOptionGroup>
          <MenuDivider />
          <MenuOptionGroup title="Instrument" type="checkbox" fontSize="1.5rem">
            <MenuItem
              onClick={() => setDisplayingNotes((prevBool) => !prevBool)}
            >
              {displayingNotes ? (
                <span style={{width: "2.5rem"}}>&#10003;</span>
              ) : (
                <span style={{width: "2.5rem"}}></span>
              )}{" "}
              Note Names
            </MenuItem>
            {children}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export {Options};
