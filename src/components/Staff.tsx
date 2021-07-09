import * as React from "react";
import styled from "@emotion/styled";
import {Flex, Box, Heading} from "@chakra-ui/react";
import {determineNotePosition} from "../helpers";
import {
  clefs,
  lineHeightInt,
  lineHeight,
  positionAdjustment,
} from "../constants";
import TrebleClef from "../components/TrebleClef";
import BassClef from "../components/BassClef";
import Flat from "../components/Flat";
import Sharp from "../components/Sharp";
import {useSession} from "../hooks";

const StyledLedger = styled(Box)`
  min-height: ${lineHeight};
  border-bottom: 5px solid black;
  width: 7.5rem;
`;

const StyledLine = styled(Box)`
  min-height: ${lineHeight};
  border-bottom: 5px solid black;
  width: 100%;
`;

const StaffLineMnemonic = styled(Heading)`
  position: absolute;
  font-size: ${lineHeightInt * 1.32 + "rem"};
  top: ${lineHeightInt * -1.05 + "rem"};
`;

const StaffSpaceMnemonic = styled(Heading)`
  position: absolute;
  font-size: ${lineHeightInt * 1.32 + "rem"};
  top: ${lineHeightInt * -0.45 + "rem"};
`;

const Staff: React.FC<{
  selectedNote: string;
  selectedClef: string;
  sessionId: string;
}> = ({selectedNote, selectedClef, sessionId}) => {
  // This is the translateY value that positions the note

  let notePosition = determineNotePosition(selectedNote, selectedClef);

  // This value determines if ledger lines are needed
  const ledgerValue = Number.parseFloat(notePosition);

  const {sessionDoc} = useSession(sessionId);

  return (
    <Flex
      direction="column"
      align="center"
      w="90%"
      position="relative"
      margin="2.5rem auto 0 auto"
    >
      <StyledLedger
        style={{
          borderBottom:
            ledgerValue < -(12 * lineHeightInt + positionAdjustment)
              ? "5px solid black"
              : "none",
        }}
      ></StyledLedger>

      <StyledLedger
        style={{
          borderBottom:
            ledgerValue < -(11 * lineHeightInt + positionAdjustment)
              ? "5px solid black"
              : "none",
        }}
      />

      <StyledLedger
        style={{
          borderBottom:
            ledgerValue < -(10 * lineHeightInt + positionAdjustment)
              ? "5px solid black"
              : "none",
        }}
      />

      <StyledLedger
        style={{
          borderBottom:
            ledgerValue < -(9 * lineHeightInt + positionAdjustment)
              ? "5px solid black"
              : "none",
        }}
      />

      <StyledLine position="relative">
        {sessionDoc?.mnemonics?.showLinesOnStaff ? (
          <StaffLineMnemonic as="h2" left="26%">
            {selectedClef === "TREBLE" ? "Fine" : "Always"}
          </StaffLineMnemonic>
        ) : null}
        {sessionDoc?.mnemonics?.showSpacesOnStaff ? (
          <StaffSpaceMnemonic as="h2" left="77%">
            {selectedClef === "TREBLE" ? "E" : "Grass"}
          </StaffSpaceMnemonic>
        ) : null}
      </StyledLine>

      <StyledLine position="relative">
        {sessionDoc?.mnemonics?.showLinesOnStaff ? (
          <StaffLineMnemonic as="h2" left="22%">
            {selectedClef === "TREBLE" ? "Does" : "Fine"}
          </StaffLineMnemonic>
        ) : null}
        {sessionDoc?.mnemonics?.showSpacesOnStaff ? (
          <StaffSpaceMnemonic as="h2" left="73%">
            {selectedClef === "TREBLE" ? "C" : "Eat"}
          </StaffSpaceMnemonic>
        ) : null}
      </StyledLine>

      <StyledLine position="relative">
        {sessionDoc?.mnemonics?.showLinesOnStaff ? (
          <StaffLineMnemonic as="h2" left="18%">
            {selectedClef === "TREBLE" ? "Boy" : "Do"}
          </StaffLineMnemonic>
        ) : null}
        {sessionDoc?.mnemonics?.showSpacesOnStaff ? (
          <StaffSpaceMnemonic as="h2" left="69%">
            {selectedClef === "TREBLE" ? "A" : "Cows"}
          </StaffSpaceMnemonic>
        ) : null}
      </StyledLine>

      <StyledLine position="relative">
        {sessionDoc?.mnemonics?.showLinesOnStaff ? (
          <StaffLineMnemonic as="h2" left="14%">
            {selectedClef === "TREBLE" ? "Good" : "Boys"}
          </StaffLineMnemonic>
        ) : null}
        {sessionDoc?.mnemonics?.showSpacesOnStaff ? (
          <StaffSpaceMnemonic as="h2" left="65%">
            {selectedClef === "TREBLE" ? "F" : "All"}
          </StaffSpaceMnemonic>
        ) : null}
      </StyledLine>

      <StyledLine position="relative">
        {sessionDoc?.mnemonics?.showLinesOnStaff ? (
          <StaffLineMnemonic as="h2" left="10%">
            {selectedClef === "TREBLE" ? "Every" : "Good"}
          </StaffLineMnemonic>
        ) : null}
      </StyledLine>

      <StyledLedger
        style={{
          borderBottom:
            ledgerValue > -(4 * lineHeightInt + positionAdjustment)
              ? "5px solid black"
              : "none",
        }}
      />

      <StyledLedger
        style={{
          borderBottom:
            ledgerValue > -(3 * lineHeightInt + positionAdjustment)
              ? "5px solid black"
              : "none",
        }}
      />

      <StyledLedger
        style={{
          borderBottom:
            ledgerValue > -(2 * lineHeightInt + positionAdjustment)
              ? "5px solid black"
              : "none",
        }}
      />

      <StyledLedger
        style={{
          borderBottom:
            ledgerValue > -(lineHeightInt + positionAdjustment)
              ? "5px solid black"
              : "none",
        }}
      />

      {/* This is the note*/}
      <Flex transform={`translateY(${notePosition}) `} position="relative">
        <Box
          maxWidth="5rem"
          objectFit="contain"
          position="absolute"
          top={-0.9 * lineHeightInt + "rem"}
          left={-0.9 * lineHeightInt + "rem"}
          display={selectedNote && selectedNote[1] === "b" ? "block" : "none"}
        >
          {/* <img src={flat} alt="flat sign" /> */}
          <Flat width={11 * lineHeightInt} fill="black" />
        </Box>
        <Box
          position="absolute"
          top={-0.65 * lineHeightInt + "rem"}
          left={-1.26 * lineHeightInt + "rem"}
          display={selectedNote && selectedNote[1] === "s" ? "block" : "none"}
        >
          {/* <img src={sharp} alt="sharp sign" /> */}
          <Sharp
            width={18 * lineHeightInt}
            fill="black"
            height={37 * lineHeightInt}
          />{" "}
          ;
        </Box>

        <Box
          border={!notePosition ? "none" : "7px solid black"}
          w={1.6 * lineHeightInt + "rem"}
          height={lineHeight}
          borderRadius="50%"
        />
      </Flex>

      {selectedClef === clefs.TREBLE ? (
        <Box
          position="absolute"
          top={3.35 * lineHeightInt + "rem"}
          left="-1.5rem"
        >
          <TrebleClef
            width={4.6666666667 * lineHeightInt + "rem"}
            fill="black"
          />
        </Box>
      ) : selectedClef === clefs.BASS ? (
        <Box
          position="absolute"
          top={3.1666666667 * lineHeightInt + "rem"}
          left="-1.5rem"
        >
          <BassClef width={4.8 * lineHeightInt + "rem"} fill="black" />
        </Box>
      ) : null}
    </Flex>
  );
};

export default Staff;
