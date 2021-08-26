import * as React from "react";
import {Flex} from "@chakra-ui/react";
import {useWindowSize} from "../hooks";
import {BoxSliderForScrollModel} from "./BoxSliderForScrollModel";

type ScrollModelProps = {
  originalComponentWidthInRem: number;
  scrollLeft: number;
  componentRef: React.RefObject<HTMLDivElement>;
  instrumentPercentageOfScreen: number;
};

const ScrollModel: React.FC<ScrollModelProps> = ({
  originalComponentWidthInRem,
  scrollLeft,
  componentRef,
  instrumentPercentageOfScreen,
  children,
}) => {
  const {width: windowWidth} = useWindowSize();

  const remInPixels = Number.parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  console.log(
    scrollLeft,
    originalComponentWidthInRem,
    componentRef,
    remInPixels,
    windowWidth
  );

  const viewBoxWidth =
    ((windowWidth * (instrumentPercentageOfScreen / 100)) /
      (originalComponentWidthInRem * remInPixels)) *
      100 +
    "%";
  const viewBoxWidthInverse = 100 - Number.parseFloat(viewBoxWidth) + "%";

  let maxScrollLeft = 0;
  let scrollPercentage = 0;
  if (componentRef.current) {
    maxScrollLeft =
      componentRef.current?.scrollWidth - componentRef.current?.clientWidth;
    scrollPercentage = scrollLeft / maxScrollLeft;
  }

  return (
    <>
      {maxScrollLeft === 0 ? null : (
        <>
          <Flex
            w="100vw"
            maxWidth="60rem"
            boxSizing="border-box"
            margin="-1rem auto"
            position="relative"
            marginBottom="1rem"
          >
            <BoxSliderForScrollModel
              scrollPercentage={scrollPercentage}
              viewBoxWidth={viewBoxWidth}
              viewBoxWidthInverse={viewBoxWidthInverse}
            />
            {children}
          </Flex>
        </>
      )}
    </>
  );
};

export {ScrollModel};
