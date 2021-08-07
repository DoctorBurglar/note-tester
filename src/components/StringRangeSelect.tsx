import * as React from "react";
import {FormControl, FormLabel, Select} from "@chakra-ui/react";

type StringRangeSelectProps = {
  preset: string;
  setString: React.Dispatch<React.SetStateAction<number>>;
  option: "low" | "high";
  strings: number[];
  lowString: number;
  highString: number;
};

const StringRangeSelect: React.FC<StringRangeSelectProps> = ({
  preset,
  setString,
  option,
  strings,
  lowString,
  highString,
}) => {
  return (
    <FormControl isDisabled={preset !== "Custom"} w="45%">
      <FormLabel
        htmlFor={option === "low" ? "lowString" : "highString"}
        fontSize="1.3rem"
      >
        {option === "low" ? "Lowest String" : "Highest String"}
      </FormLabel>
      <Select
        onChange={(e) => setString(+e.target.value)}
        id={option === "low" ? "lowString" : "highString"}
        value={option === "low" ? lowString : highString}
      >
        {option === "low"
          ? strings.slice(0, strings.length).map((string) => {
              return (
                <option key={string} value={string}>
                  {string}
                </option>
              );
            })
          : strings.slice(0, strings.indexOf(lowString) + 1).map((string) => {
              return (
                <option key={string} value={string}>
                  {string}
                </option>
              );
            })}
      </Select>
    </FormControl>
  );
};

export {StringRangeSelect};
