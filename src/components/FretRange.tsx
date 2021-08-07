import React from "react";
import {Flex} from "@chakra-ui/react";
import {FretRangeSelect} from "./FretRangeSelect";

type FretRangeProps = {
  preset: string;
  setLowFret: React.Dispatch<React.SetStateAction<number>>;
  setHighFret: React.Dispatch<React.SetStateAction<number>>;
  frets: number[];
  lowFret: number;
  highFret: number;
};

const FretRange: React.FC<FretRangeProps> = ({
  preset,
  setHighFret,
  setLowFret,
  frets,
  lowFret,
  highFret,
}) => {
  return (
    <Flex justify="space-between" padding="0 1rem " marginBottom="1rem">
      <FretRangeSelect
        preset={preset}
        setFret={setLowFret}
        option="low"
        frets={frets}
        lowFret={lowFret}
        highFret={highFret}
      />
      <FretRangeSelect
        preset={preset}
        setFret={setHighFret}
        option="high"
        frets={frets}
        lowFret={lowFret}
        highFret={highFret}
      />
    </Flex>
  );
};

export {FretRange};
