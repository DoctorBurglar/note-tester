import * as React from "react";
import {Flex, Box} from "@chakra-ui/react";
import {IGuitarNote} from "../interfacesAndTypes";

type GuitarStringProps = {
  string: IGuitarNote[];
  outerInd: number;
  selectedString: number;
  noteRangeAllowsDuplicates: boolean;
};

const GuitarString: React.FC<GuitarStringProps> = ({
  string,
  outerInd,
  selectedString,
  noteRangeAllowsDuplicates,
  children,
}) => {
  return (
    <Flex
      key={string[0].name}
      position="relative"
      bg="var(--guitar-brown)"
      backgroundImage="linear-gradient(to right, var(--guitar-brown) 5%, rgb(255, 255, 255, 0.3) 8%,var(--guitar-brown) 8.9%, var(--guitar-brown) 10%)"
    >
      <Box
        w="100%"
        h={0.15 + 0.04 * outerInd + "rem"}
        position="absolute"
        top="45%"
        transform="translateY(-50%)"
        bg="grey"
        backgroundImage={
          selectedString === outerInd + 1 && noteRangeAllowsDuplicates
            ? "linear-gradient(to left, var(--wild-pink) 40%, var(--wild-pink-brighter) 70%, var(--wild-pink) 90%)"
            : "linear-gradient(to left, var(--guitar-string-grey) 40%, var(--guitar-shine) 70%, var(--guitar-string-grey) 90%)"
        }
        filter={
          selectedString === outerInd + 1 && noteRangeAllowsDuplicates
            ? "drop-shadow(0px 4px 8px var(--wild-pink-dark))"
            : "drop-shadow(0px 2px 4px black)"
        }
        zIndex="5"
      >
        <Box
          w="100%"
          h="100%"
          backgroundImage={
            selectedString === outerInd + 1 && noteRangeAllowsDuplicates
              ? "linear-gradient(to top, transparent 15%, var(--wild-pink-brighter) 50%, transparent 85%)"
              : "linear-gradient(to top, transparent 15%, white 50%, transparent 85%)"
          }
          opacity=".3"
        ></Box>
      </Box>
      {children}
    </Flex>
  );
};

export {GuitarString};
