import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";
import { keyWidth } from "./constants";

export const WhiteKey = styled(Box)`
  background-color: white;
  border: 2px solid black;
  width: ${keyWidth}rem;
  height: 100%;
  border-radius: 0 0 8px 8px;
`;

export const BlackKey = styled(Box)`
  background-color: black;
  border: 2px solid black;
  width: calc(0.7 * ${keyWidth}rem);
  border-radius: 0 0 8px 8px;
  height: 65%;
  position: absolute;

  top: 0;
  z-index: 5;
`;
