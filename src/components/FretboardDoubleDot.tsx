import * as React from "react";
import {Flex, Heading} from "@chakra-ui/react";

type FretboardDoubleDotProps = {
  innerInd: number;
  outerInd: number;
  displayingFretNumbers: boolean;
};

const FretboardDoubleDot: React.FC<FretboardDoubleDotProps> = ({
  innerInd,
  outerInd,
  displayingFretNumbers,
}) => {
  return (
    <>
      {(outerInd === 2 || outerInd === 4) && innerInd === 12 ? (
        <Flex
          border="3px solid black"
          bg="black"
          backgroundImage="linear-gradient(300deg, black, black, black,black,  var(--guitar-dot-shine), black)"
          h="2rem"
          w="2rem"
          borderRadius="50%"
          position="absolute"
          top="0"
          left="50%"
          transform={
            outerInd === 2
              ? "translateY(-75%) translateX(-50%)"
              : "translateY(-25%) translateX(-50%)"
          }
          justify="center"
          align="center"
        >
          {displayingFretNumbers ? (
            <Heading as="h5" fontSize="1.8rem" fontWeight="800" color="white">
              {innerInd}
            </Heading>
          ) : null}
        </Flex>
      ) : null}
    </>
  );
};

export {FretboardDoubleDot};
