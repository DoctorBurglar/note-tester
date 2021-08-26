import * as React from "react";
import {Flex} from "@chakra-ui/react";

type InstrumentMainContainerProps = {
  handleScroll: (event: React.SyntheticEvent) => void;
  instrumentRef: React.LegacyRef<HTMLDivElement> | undefined;
};

const KeyboardMainContainer: React.FC<InstrumentMainContainerProps> = ({
  handleScroll,
  instrumentRef,
  children,
}) => {
  return (
    <Flex
      w="100vw"
      h="18rem"
      justify="flex-start"
      direction="column"
      align="center"
      overflowX="auto"
      overflowY="visible"
      onScroll={handleScroll}
      position="relative"
      ref={instrumentRef}
    >
      <Flex
        width={{base: "95%", xl: "90%"}}
        maxWidth="var(--max-width)"
        minHeight="13rem"
        alignItems="stretch"
        position="relative"
        cursor="pointer"
        overflowY="visible"
        className="noHighlightOnClick"
      >
        {children}
      </Flex>
    </Flex>
  );
};

export {KeyboardMainContainer};
