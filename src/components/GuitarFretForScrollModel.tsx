import * as React from "react";
import {Box, Flex, Heading} from "@chakra-ui/react";
import {IGuitarNote} from "../interfacesAndTypes";

type GuitarFretForScrollModelProps = {
  note: IGuitarNote;
  outerInd: number;
  innerInd: number;
  fretHeight: number;
  fretBoardHeight: number;
  displayingFretNumbers: boolean;
  fretIsInRange: (outerInd: number, innerInd: number) => boolean;
};

const GuitarFretForScrollModel: React.FC<GuitarFretForScrollModelProps> = ({
  note,
  outerInd,
  innerInd,
  fretHeight,
  fretBoardHeight,
  displayingFretNumbers,
  fretIsInRange,
}) => {
  return (
    <Box
      position="relative"
      cursor={!fretIsInRange(outerInd, innerInd) ? "" : "pointer"}
      w={15 - 0.6 * innerInd + "%"}
    >
      <Flex>
        <Box
          key={note.name + innerInd}
          h={`${fretHeight - 2}rem`}
          w="100%"
          display="inline-block"
          position="relative"
          zIndex="7"
          boxSizing="border-box"
        ></Box>
        {innerInd === 0 && outerInd === 0 ? (
          <Box
            minHeight={`${fretBoardHeight - 12}rem`}
            position="absolute"
            minWidth=".5rem"
            bg="var(--guitar-nut)"
            zIndex="2"
            borderRadius="1px"
            boxShadow="2px 1px 6px rgb(0,0,0,0.4)"
            right="0"
          />
        ) : (
          <Box
            minHeight={
              outerInd === 0 && innerInd > 0 ? `${fretBoardHeight - 12}rem` : ""
            }
            position="absolute"
            right="0"
            minWidth=".2rem"
            bg="var(--guitar-fret-silver)"
            zIndex="2"
            borderRadius="3px"
            backgroundImage="linear-gradient(to right, transparent, var(--guitar-fret-shine-2), transparent), linear-gradient(to top, var(--guitar-fret-silver) 65%, var(--guitar-fret-shine) 83%, var(--guitar-fret-silver) 100%)"
            boxShadow="1px .5px 3px rgb(0,0,0,0.4)"
          />
        )}
      </Flex>

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
          h=".6rem"
          w=".6rem"
          borderRadius="50%"
          position="absolute"
          top="0"
          left="50%"
          transform="translateY(-50%) translateX(-50%)"
          zIndex="2"
          justify="center"
          align="center"
        >
          {displayingFretNumbers ? (
            <Heading as="h5" fontSize=".8rem" fontWeight="800" color="white">
              {innerInd}
            </Heading>
          ) : null}
        </Flex>
      ) : null}
      {(outerInd === 2 || outerInd === 4) && innerInd === 12 ? (
        <Flex
          border="3px solid black"
          bg="black"
          backgroundImage="linear-gradient(300deg, black, black, black,black,  var(--guitar-dot-shine), black)"
          h=".6rem"
          w=".6rem"
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
            <Heading as="h5" fontSize=".8rem" fontWeight="800" color="white">
              {innerInd}
            </Heading>
          ) : null}
        </Flex>
      ) : null}
    </Box>
  );
};
export {GuitarFretForScrollModel};
