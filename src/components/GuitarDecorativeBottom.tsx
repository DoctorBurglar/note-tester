import * as React from "react";
import {Box} from "@chakra-ui/react";

const GuitarDecorativeBottom = () => {
  return (
    <>
      <Box
        w="93%"
        alignSelf="flex-end"
        minHeight=".5rem"
        bg="var(--guitar-brown)"
        transform="rotate(.2deg) translateY(-.25rem)"
        boxShadow="inset 1px -4px rgb(0, 0, 0 , 0.1)"
        position="relative"
        zIndex="-10"
      />
      <Box
        w="10%"
        minHeight="2rem"
        bg="var(--guitar-brown)"
        clipPath="polygon(100% 0%, 0% 0%, 0% 100%, 6% 91%, 10% 83%, 17% 74%, 26% 65%, 33% 56%, 37% 49%, 43% 43%, 47% 38%, 54% 30%, 63% 24%, 70% 18%, 78% 12%, 86% 6%, 91% 3%)"
        transform="translateY(-.6rem)"
        position="relative"
        zIndex="-1"
      />
    </>
  );
};

export {GuitarDecorativeBottom};
