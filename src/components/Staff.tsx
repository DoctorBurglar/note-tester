import * as React from "react";
import styled from "@emotion/styled";
import {Flex, Box} from "@chakra-ui/react";
import {determineNotePosition, determineBorderBottom} from "../helpers";
import {
  lineHeight,
  staffLines,
  lowerLedgerLinesOffsetValues,
  upperLedgerLinesOffsetValues,
} from "../constants";
import {Note} from "./Note";
import {Clef} from "./Clef";
import {StaffLine} from "./StaffLine";

const StyledLedger = styled(Box)`
  min-height: ${lineHeight};
  border-bottom: 0.3rem solid black;
  width: 7.5rem;
  transform: translateX(3rem);
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

  return (
    <Flex
      direction="column"
      align="center"
      w="90%"
      maxWidth="var(--max-width)"
      position="relative"
      margin="2.5rem auto 0 auto"
    >
      {upperLedgerLinesOffsetValues.map((offsetValue) => {
        return (
          <StyledLedger
            key={offsetValue}
            style={{
              borderBottom: determineBorderBottom(
                offsetValue,
                "UPPER",
                ledgerValue
              ),
            }}
          ></StyledLedger>
        );
      })}

      {staffLines.map((staffLine) => {
        return (
          <StaffLine
            selectedClef={selectedClef}
            showLinesOnStaff={showLinesOnStaff}
            showSpacesOnStaff={showSpacesOnStaff}
            staffLine={staffLine}
          />
        );
      })}

      {lowerLedgerLinesOffsetValues.map((offsetValue) => {
        return (
          <StyledLedger
            key={offsetValue}
            style={{
              borderBottom: determineBorderBottom(
                offsetValue,
                "LOWER",
                ledgerValue
              ),
            }}
          />
        );
      })}

      <Note notePosition={notePosition} selectedNote={selectedNote} />

      <Clef selectedClef={selectedClef} />
    </Flex>
  );
};

export default Staff;
