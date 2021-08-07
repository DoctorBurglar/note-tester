import React from "react";
import {Flex} from "@chakra-ui/react";
import {StringRangeSelect} from "./StringRangeSelect";

type StringRangeProps = {
  preset: string;
  setLowString: React.Dispatch<React.SetStateAction<number>>;
  setHighString: React.Dispatch<React.SetStateAction<number>>;
  stringNumber: number;
  lowString: number;
  highString: number;
};

const StringRange: React.FC<StringRangeProps> = ({
  preset,
  setHighString,
  setLowString,
  stringNumber,
  lowString,
  highString,
}) => {
  const [strings, setStrings] = React.useState([1]);

  React.useEffect(() => {
    const guitarStringArray: number[] = [];
    for (let i = 1; i <= stringNumber; i++) {
      guitarStringArray.push(i);
    }
    setStrings(guitarStringArray);
  }, [stringNumber]);

  return (
    <Flex justify="space-between" padding="0 1rem " marginBottom="1rem">
      <StringRangeSelect
        preset={preset}
        setString={setLowString}
        option="low"
        strings={strings}
        lowString={lowString}
        highString={highString}
      />
      <StringRangeSelect
        preset={preset}
        setString={setHighString}
        option="high"
        strings={strings}
        lowString={lowString}
        highString={highString}
      />
    </Flex>
  );
};

export {StringRange};
