import * as React from "react";
import styled from "@emotion/styled";
import { Flex, Box } from "@chakra-ui/react";
import { determineNotePosition } from "../helpers";
import TrebleClef from "../assets/TrebleClef.svg";
import BassClef from "../assets/BassClef.svg";
import {
  clefs,
  lineHeightInt,
  lineHeight,
  positionAdjustment,
} from "../constants";

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

const Staff: React.FC<{ selectedNote: string; selectedClef: string }> = ({
  selectedNote,
  selectedClef,
}) => {
  // This is the translateY value that positions the note

  let notePosition = determineNotePosition(selectedNote, selectedClef);

  // This value determines if ledger lines are needed
  const ledgerValue = Number.parseFloat(notePosition);

  console.log(ledgerValue);

  return (
    <Flex
      direction="column"
      align="center"
      w="100%"
      position="relative"
      marginTop="1rem"
    >
      <StyledLedger
        style={{
          borderBottom:
            ledgerValue < -(12 * lineHeightInt + positionAdjustment)
              ? "5px solid black"
              : "none",
        }}
      />

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

      <StyledLine />

      <StyledLine />

      <StyledLine />

      <StyledLine />

      <StyledLine />

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
          position="absolute"
          top="-1.4rem"
          left="-3.5rem"
          transform="skewY(-10deg)"
          display={selectedNote[1] === "#" ? "block" : "none"}
        >
          <Box
            borderRight="8px solid black"
            borderLeft="8px solid black"
            w={0.65 * lineHeightInt + "rem"}
            h={2 * lineHeightInt + "rem"}
          ></Box>
          <Box
            w={1.3 * lineHeightInt + "rem"}
            h={0.9 * lineHeightInt + "rem"}
            position="absolute"
            top="1.6rem"
            left="-.9rem"
            borderTop="12px solid black"
            borderBottom="12px solid black"
          ></Box>
        </Box>
        <Box
          border={!notePosition ? "none" : "7px solid black"}
          w={1.6 * lineHeightInt + "rem"}
          height={lineHeight}
          borderRadius="50%"
        />
      </Flex>

      {selectedClef === clefs.TREBLE ? (
        <Box position="absolute" top="9.6rem" left="-1.5rem">
          <img src={TrebleClef} alt="Treble Clef" />
        </Box>
      ) : selectedClef === clefs.BASS ? (
        <Box position="absolute" top="9.8rem" left="-1.5rem">
          <img src={BassClef} alt="Bass Clef" />
        </Box>
      ) : null}
    </Flex>
  );
};

export default Staff;
