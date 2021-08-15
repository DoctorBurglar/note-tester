import * as React from "react";
import {Box, Flex} from "@chakra-ui/react";
import {IGuitarNote} from "../interfacesAndTypes";

type GuitarStringForScrollModelProps = {
  string: IGuitarNote[];
  outerInd: number;
  selectedString: number;
  noteRangeAllowsDuplicates: boolean;
};

const GuitarStringForScrollModel: React.FC<GuitarStringForScrollModelProps> = ({
  string,
  outerInd,
  selectedString,
  noteRangeAllowsDuplicates,
  children,
}) => {
  return (
    <Flex
      position="relative"
      bg="var(--guitar-brown)"
      backgroundImage="linear-gradient(to right, var(--guitar-brown) 5%, rgb(255, 255, 255, 0.3) 8%,var(--guitar-brown) 8.9%, var(--guitar-brown) 10%)"
    >
      <Box
        w="100%"
        h={0.03 + 0.025 * outerInd + "rem"}
        position="absolute"
        top="45%"
        transform="translateY(-50%)"
        bg="grey"
        backgroundImage={
          selectedString === outerInd + 1 && noteRangeAllowsDuplicates
            ? "linear-gradient(to left, var(--main-color-very-dark) 40%, var(--main-color) 70%, var(--main-color-very-dark) 90%)"
            : "linear-gradient(to left, var(--guitar-string-grey) 40%, var(--guitar-shine) 70%, var(--guitar-string-grey) 90%)"
        }
        filter="drop-shadow(0px 1px 2px black)"
        zIndex="5"
      >
        <Box
          w="100%"
          h="100%"
          backgroundImage={
            selectedString === outerInd + 1 && noteRangeAllowsDuplicates
              ? "linear-gradient(to top, transparent 15%, var(--main-color) 50%, transparent 85%)"
              : "linear-gradient(to top, transparent 15%, white 50%, transparent 85%)"
          }
          opacity=".3"
        ></Box>
      </Box>
      {children}
    </Flex>
  );
};

export {GuitarStringForScrollModel};
