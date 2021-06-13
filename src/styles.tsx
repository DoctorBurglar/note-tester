import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";
import { whiteKeyWidth, blackKeyWidth } from "./constants";

export const WhiteKey = styled(Box)`
  background-color: white;
  border: 2px solid black;
  width: ${whiteKeyWidth};
  height: 100%;
  border-radius: 0 0 8px 8px;
`;

export const BlackKey = styled(Box)`
  background-color: black;
  border: 2px solid black;
  width: ${blackKeyWidth};
  border-radius: 0 0 8px 8px;
  height: 65%;
  position: absolute;

  top: 0;
  z-index: 5;
`;
