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

const StyledLedger = styled(Box)`
  min-height: ${lineHeight};
  border-bottom: 0.3rem solid black;
  width: 7.5rem;
  transform: translateX(3rem);
`;

const StyledLine = styled(Box)`
  min-height: ${lineHeight};
  border-bottom: 0.3rem solid black;
  width: 100%;
  position: relative;
`;

const StaffLineMnemonic = styled(Heading)`
  position: absolute;
  font-size: ${lineHeightInt * 1.32 + "rem"};
  top: ${lineHeightInt * 0.05 + "rem"};
  @media (min-width: 1px) {
    font-size: ${lineHeightInt * 0.9 + "rem"};
    top: ${lineHeightInt * 0.33 + "rem"};
  }
  @media (min-width: 30em) {
    font-size: ${lineHeightInt * 1.32 + "rem"};
    top: ${lineHeightInt * 0.05 + "rem"};
  }
`;

const StaffSpaceMnemonic = styled(Heading)`
  position: absolute;
  font-size: ${lineHeightInt * 1.32 + "rem"};
  top: ${lineHeightInt * 0.63 + "rem"};
  @media (min-width: 1px) {
    font-size: ${lineHeightInt * 0.9 + "rem"};
    top: ${lineHeightInt * 0.91 + "rem"};
  }
  @media (min-width: 30em) {
    font-size: ${lineHeightInt * 1.32 + "rem"};
    top: ${lineHeightInt * 0.63 + "rem"};
  }
`;

const Staff: React.FC<{
  selectedNote: string;
  selectedClef: string;
  showLinesOnStaff: boolean;
  showSpacesOnStaff: boolean;
}> = ({selectedNote, selectedClef, showLinesOnStaff, showSpacesOnStaff}) => {
  // This is the translateY value that positions the note

  let notePosition = determineNotePosition(selectedNote, selectedClef);

  // This value determines if ledger lines are needed
  const ledgerValue = Number.parseFloat(notePosition);

  const determineBorderBottom = (
    offset: number,
    position: "UPPER" | "LOWER"
  ) => {
    if (position === "UPPER") {
      return ledgerValue < -(offset * lineHeightInt + positionAdjustment)
        ? ".3rem solid black"
        : "none";
    } else if (position === "LOWER") {
      return ledgerValue > -(offset * lineHeightInt + positionAdjustment)
        ? ".3rem solid black"
        : "none";
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      w="90%"
      maxWidth="var(--max-width)"
      position="relative"
      margin="2.5rem auto 0 auto"
    >
      <StyledLedger
        style={{
          borderBottom: determineBorderBottom(12, "UPPER"),
        }}
      ></StyledLedger>

      <StyledLedger
        style={{
          borderBottom: determineBorderBottom(11, "UPPER"),
        }}
      />

      <StyledLedger
        style={{
          borderBottom: determineBorderBottom(10, "UPPER"),
        }}
      />

      <StyledLedger
        style={{
          borderBottom: determineBorderBottom(9, "UPPER"),
        }}
      />

      <StyledLine>
        {showLinesOnStaff ? (
          <StaffLineMnemonic
            as="h2"
            left={{base: "24%", sm: "22%", md: "28%"}}
            lineHeight="1.25"
          >
            {selectedClef === "TREBLE" ? "Fine" : "Always"}
          </StaffLineMnemonic>
        ) : null}
        {showSpacesOnStaff ? (
          <StaffSpaceMnemonic
            as="h2"
            left={{base: "74%", md: "76%"}}
            lineHeight="1.25"
          >
            {selectedClef === "TREBLE" ? "E" : "Grass"}
          </StaffSpaceMnemonic>
        ) : null}
      </StyledLine>

      <StyledLine>
        {showLinesOnStaff ? (
          <StaffLineMnemonic
            as="h2"
            left={{base: "24%", sm: "22%", md: "26%"}}
            lineHeight="1.25"
          >
            {selectedClef === "TREBLE" ? "Does" : "Fine"}
          </StaffLineMnemonic>
        ) : null}
        {showSpacesOnStaff ? (
          <StaffSpaceMnemonic
            as="h2"
            left={{base: "74%", md: "74%"}}
            lineHeight="1.25"
          >
            {selectedClef === "TREBLE" ? "C" : "Eat"}
          </StaffSpaceMnemonic>
        ) : null}
      </StyledLine>

      <StyledLine>
        {showLinesOnStaff ? (
          <StaffLineMnemonic
            as="h2"
            left={{base: "24%", sm: "22%", md: "24%"}}
            lineHeight="1.25"
          >
            {selectedClef === "TREBLE" ? "Boy" : "Do"}
          </StaffLineMnemonic>
        ) : null}
        {showSpacesOnStaff ? (
          <StaffSpaceMnemonic
            as="h2"
            left={{base: "74%", md: "72%"}}
            lineHeight="1.25"
          >
            {selectedClef === "TREBLE" ? "A" : "Cows"}
          </StaffSpaceMnemonic>
        ) : null}
      </StyledLine>

      <StyledLine>
        {showLinesOnStaff ? (
          <StaffLineMnemonic
            as="h2"
            left={{base: "24%", sm: "22%", md: "22%"}}
            lineHeight="1.25"
          >
            {selectedClef === "TREBLE" ? "Good" : "Boys"}
          </StaffLineMnemonic>
        ) : null}
        {showSpacesOnStaff ? (
          <StaffSpaceMnemonic
            as="h2"
            left={{base: "74%", md: "70%"}}
            lineHeight="1.25"
          >
            {selectedClef === "TREBLE" ? "F" : "All"}
          </StaffSpaceMnemonic>
        ) : null}
      </StyledLine>

      <StyledLine>
        {showLinesOnStaff ? (
          <StaffLineMnemonic
            as="h2"
            left={{base: "24%", sm: "22%", md: "20%"}}
            lineHeight="1.25"
          >
            {selectedClef === "TREBLE" ? "Every" : "Good"}
          </StaffLineMnemonic>
        ) : null}
      </StyledLine>

      <StyledLedger
        style={{
          borderBottom: determineBorderBottom(4, "LOWER"),
        }}
      />

      <StyledLedger
        style={{
          borderBottom: determineBorderBottom(3, "LOWER"),
        }}
      />

      <StyledLedger
        style={{
          borderBottom: determineBorderBottom(2, "LOWER"),
        }}
      />

      <StyledLedger
        style={{
          borderBottom: determineBorderBottom(1, "LOWER"),
        }}
      />

      {/* This is the note*/}
      <Flex
        transform={`translateY(${notePosition}) translateX(3rem)`}
        position="relative"
      >
        <Box
          maxWidth="5rem"
          objectFit="contain"
          position="absolute"
          top={-1.2 * lineHeightInt + "rem"}
          left={-1.1 * lineHeightInt + "rem"}
          display={selectedNote && selectedNote[1] === "b" ? "block" : "none"}
        >
          {/* <img src={flat} alt="flat sign" /> */}
          <Flat width={0.9 * lineHeightInt} fill="black" />
        </Box>
        <Box
          position="absolute"
          top={-0.77 * lineHeightInt + "rem"}
          left={-1.9 * lineHeightInt + "rem"}
          display={selectedNote && selectedNote[1] === "s" ? "block" : "none"}
        >
          {/* <img src={sharp} alt="sharp sign" /> */}
          <Sharp
            width={2.4 * lineHeightInt}
            fill="black"
            height={2.6 * lineHeightInt}
          />{" "}
          ;
        </Box>

        <Box
          border={!notePosition ? "none" : ".4rem solid black"}
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
