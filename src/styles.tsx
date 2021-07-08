import styled from "@emotion/styled";
import {Box, Flex, Button} from "@chakra-ui/react";
import {whiteKeyWidth, blackKeyWidth} from "./constants";

export const WhiteKey = styled(Flex)`
  flex-direction: column;
  background-color: white;
  border: 2px solid black;
  width: ${whiteKeyWidth};
  height: 100%;
  border-radius: 0 0 8px 8px;

  & > .accidentals {
    display: none !important;
  }

  &:hover > .accidentals {
    display: flex !important;
  }
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

  & > .black-accidentals {
    display: none !important;
  }

  &:hover > .black-accidentals {
    display: flex !important;
  }
`;

export const StyledButtonSmall = styled(Button)`
  font-size: 1rem;
  margin: 0 0.3rem;
  border-radius: 5px;
  padding: 0.3rem 1rem;
  cursor: pointer;
`;
