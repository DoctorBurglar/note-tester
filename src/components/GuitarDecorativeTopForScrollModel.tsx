import * as React from "react";
import {Box} from "@chakra-ui/react";

const GuitarDecorativeTopForScrollModel = () => {
  return (
    <>
      <Box
        w="10%"
        minHeight=".7rem"
        bg="var(--guitar-brown)"
        clipPath="polygon(0% 0%, 0% 100%, 100% 100%, 90% 95%, 78% 92%, 69% 87%, 60% 80%, 53% 73%, 43% 64%, 36% 54%, 25% 44%, 20% 35%, 15% 27%, 9% 19%, 5% 10%)"
        transform="translateY(.53rem)"
        position="relative"
        zIndex="-1"
      />
      <Box
        w="94%"
        alignSelf="flex-end"
        minHeight=".5rem"
        bg="var(--guitar-brown)"
        transform="rotate(-.2deg) translateY(.3rem)"
        boxShadow="inset .5px 3px rgb(0, 0, 0 , 0.2)"
      />
    </>
  );
};

export {GuitarDecorativeTopForScrollModel};
