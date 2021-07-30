import * as React from "react";
import {lineHeight, lineHeightInt} from "../constants";
import styled from "@emotion/styled";
import {Box, Heading} from "@chakra-ui/react";

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
  line-height: 1.25;
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
  line-height: 1.25;
  @media (min-width: 1px) {
    font-size: ${lineHeightInt * 0.9 + "rem"};
    top: ${lineHeightInt * 0.91 + "rem"};
  }
  @media (min-width: 30em) {
    font-size: ${lineHeightInt * 1.32 + "rem"};
    top: ${lineHeightInt * 0.63 + "rem"};
  }
`;

interface IStaffLineObject {
  trebleLineMnemonic: string;
  bassLineMnemonic: string;
  trebleSpaceMnemonic: string;
  bassSpaceMnemonic: string;
  staffLineNumber: number;
}

type StaffLineProps = {
  showLinesOnStaff: boolean;
  showSpacesOnStaff: boolean;
  staffLine: IStaffLineObject;
  selectedClef: string;
};

const StaffLine: React.FC<StaffLineProps> = ({
  showLinesOnStaff,
  staffLine: {
    staffLineNumber,
    trebleSpaceMnemonic,
    bassLineMnemonic,
    bassSpaceMnemonic,
    trebleLineMnemonic,
  },
  selectedClef,
  showSpacesOnStaff,
}) => {
  return (
    <StyledLine>
      {showLinesOnStaff ? (
        <StaffLineMnemonic
          as="h2"
          left={{
            base: "24%",
            sm: "22%",
            md: 18 + staffLineNumber * 2 + "%",
          }}
        >
          {selectedClef === "TREBLE" ? trebleLineMnemonic : bassLineMnemonic}
        </StaffLineMnemonic>
      ) : null}
      {showSpacesOnStaff ? (
        <StaffSpaceMnemonic
          as="h2"
          left={{
            base: "74%",
            md: 68 + staffLineNumber * 2 + "%",
          }}
        >
          {selectedClef === "TREBLE" ? trebleSpaceMnemonic : bassSpaceMnemonic}
        </StaffSpaceMnemonic>
      ) : null}
    </StyledLine>
  );
};

export {StaffLine};
