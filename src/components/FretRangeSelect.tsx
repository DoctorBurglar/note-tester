import * as React from "react";
import {FormControl, FormLabel, Select} from "@chakra-ui/react";

type FretRangeSelectProps = {
  preset: string;
  setFret: React.Dispatch<React.SetStateAction<number>>;
  option: "low" | "high";
  frets: number[];
  lowFret: number;
  highFret: number;
};

const FretRangeSelect: React.FC<FretRangeSelectProps> = ({
  preset,
  setFret,
  option,
  frets,
  lowFret,
  highFret,
}) => {
  return (
    <FormControl isDisabled={preset !== "Custom"} w="45%">
      <FormLabel
        htmlFor={option === "low" ? "lowFret" : "highFret"}
        fontSize="1.3rem"
      >
        {option === "low" ? "Lowest Fret" : "Highest Fret"}
      </FormLabel>
      <Select
        onChange={(e) => setFret(+e.target.value)}
        id={option === "low" ? "lowFret" : "highFret"}
        value={option === "low" ? lowFret : highFret}
      >
        {option === "low"
          ? frets.slice(0, frets.length - 1).map((fret) => {
              return (
                <option key={fret} value={fret}>
                  {fret}
                </option>
              );
            })
          : frets.slice(frets.indexOf(lowFret)).map((fret) => {
              return (
                <option key={fret} value={fret}>
                  {fret}
                </option>
              );
            })}
      </Select>
    </FormControl>
  );
};

export {FretRangeSelect};
