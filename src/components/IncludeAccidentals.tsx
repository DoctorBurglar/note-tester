import * as React from "react";
import {Flex, Checkbox} from "@chakra-ui/react";

type IncludeAccidentalsProps = {
  setIncludeSharps: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setIncludeFlats: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const IncludeAccidentals: React.FC<IncludeAccidentalsProps> = ({
  setIncludeSharps,
  setIncludeFlats,
}) => {
  return (
    <Flex justify="center" marginTop="1.5rem">
      <Checkbox marginRight="3rem" onChange={setIncludeSharps} defaultChecked>
        Sharps
      </Checkbox>
      <Checkbox onChange={setIncludeFlats} defaultChecked>
        Flats
      </Checkbox>
    </Flex>
  );
};

export default IncludeAccidentals;
