import * as React from "react";
import {Flex, Heading, Button} from "@chakra-ui/react";

type SoloScoreProps = {
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  correct: number;
  setCorrect: React.Dispatch<React.SetStateAction<number>>;
};

const SoloScore: React.FC<SoloScoreProps> = ({
  setTotal,
  total,
  setCorrect,
  correct,
}) => {
  const handleReset = () => {
    setTotal(0);
    setCorrect(0);
  };
  return (
    <Flex
      direction={{base: "column", md: "row"}}
      alignItems={{base: "flex-start", md: "center"}}
      minWidth="13rem"
      w="30%"
      padding={{base: "none", md: "1.3rem"}}
    >
      <Heading
        as="h2"
        minWidth="13rem"
        marginRight="2rem"
      >{`Score: ${correct} / ${total}`}</Heading>
      <Button
        onClick={handleReset}
        position="relative"
        zIndex="5"
        minWidth="5rem"
        minHeight="2.5rem"
        marginTop={{base: "1rem", md: "0"}}
      >
        Reset
      </Button>
    </Flex>
  );
};

export default SoloScore;
