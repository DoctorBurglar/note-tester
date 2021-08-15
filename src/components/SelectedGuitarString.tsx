import * as React from "react";
import {Flex} from "@chakra-ui/react";

type SelectedGuitarStringProps = {
  selectedString: number;
  noteRangeAllowsDuplicates: boolean;
};

const SelectedGuitarString: React.FC<SelectedGuitarStringProps> = ({
  selectedString,
  noteRangeAllowsDuplicates,
}) => {
  return (
    <>
      {noteRangeAllowsDuplicates ? (
        <Flex
          w="90%"
          position="absolute"
          bottom="8rem"
          justify="flex-start"
          fontSize={{base: "1.3rem", md: "2rem"}}
          fontWeight="700"
          marginLeft={{base: "9rem", sm: "10rem", md: "15rem"}}
        >{`String ${selectedString}`}</Flex>
      ) : null}
    </>
  );
};

export {SelectedGuitarString};
