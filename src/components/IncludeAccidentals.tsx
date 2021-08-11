import * as React from "react";
import {Flex, Checkbox, Heading} from "@chakra-ui/react";

type IncludeAccidentalsProps = {
  setIncludeSharps: React.Dispatch<React.SetStateAction<boolean>>;
  setIncludeFlats: React.Dispatch<React.SetStateAction<boolean>>;
  inlcudeFlats: boolean;
  includeSharps: boolean;
};

const IncludeAccidentals: React.FC<IncludeAccidentalsProps> = ({
  setIncludeSharps,
  setIncludeFlats,
  inlcudeFlats,
  includeSharps,
}) => {
  return (
    <Flex justify="center" marginTop="1.5rem">
      <Checkbox
        marginRight="3rem"
        onChange={() => setIncludeSharps((prevBool) => !prevBool)}
        defaultChecked={includeSharps}
      >
        <Heading as="h5" fontSize="1.5rem" fontWeight="500">
          {" "}
          Sharps
        </Heading>
      </Checkbox>
      <Checkbox
        onChange={() => setIncludeFlats((prevBool) => !prevBool)}
        defaultChecked={inlcudeFlats}
      >
        <Heading as="h5" fontSize="1.5rem" fontWeight="500">
          {" "}
          Flats
        </Heading>
      </Checkbox>
    </Flex>
  );
};

export {IncludeAccidentals};
