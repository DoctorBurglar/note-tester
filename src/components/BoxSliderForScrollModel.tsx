import * as React from "react";
import {Box} from "@chakra-ui/react";

type BoxSliderForScrollModelProps = {
  viewBoxWidth: string;
  scrollPercentage: number;
  viewBoxWidthInverse: string;
};

const BoxSliderForScrollModel: React.FC<BoxSliderForScrollModelProps> = ({
  scrollPercentage,
  viewBoxWidth,
  viewBoxWidthInverse,
}) => {
  return (
    <Box
      w={viewBoxWidth}
      h="8rem"
      position="absolute"
      bottom="0"
      left={`calc(${scrollPercentage} * ${viewBoxWidthInverse})`}
      border="3px solid black"
      borderRadius="3px"
      zIndex="100"
    />
  );
};

export {BoxSliderForScrollModel};
