import * as React from "react";
import {Flex, Heading} from "@chakra-ui/react";

type FretboardDotProps = {
  innerInd: number;
  outerInd: number;
  displayingFretNumbers: boolean;
};

const FretboardDot: React.FC<FretboardDotProps> = ({
  innerInd,
  outerInd,
  displayingFretNumbers,
}) => {
  return (
    <>
      {outerInd === 3 &&
      (innerInd === 3 ||
        innerInd === 5 ||
        innerInd === 7 ||
        innerInd === 9 ||
        innerInd === 15 ||
        innerInd === 17 ||
        innerInd === 19 ||
        innerInd === 21) ? (
        <Flex
          border="3px solid black"
          bg="black"
          backgroundImage="linear-gradient(300deg, var(--guitar-dot) 0%, var(--guitar-dot) 60%,  var(--guitar-dot-shine) 90%, var(--guitar-dot) 100%)"
          h="2rem"
          w="2rem"
          borderRadius="50%"
          position="absolute"
          top="0"
          left="50%"
          transform="translateY(-50%) translateX(-50%)"
          zIndex="2"
          color="white"
          textAlign="center"
          justify="center"
          align="center"
        >
          {displayingFretNumbers ? (
            <Heading as="h5" fontSize="1.8rem" fontWeight="800">
              {innerInd}
            </Heading>
          ) : null}
        </Flex>
      ) : null}
    </>
  );
};

export {FretboardDot};
