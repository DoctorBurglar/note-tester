import * as React from "react";
import {WhiteKey} from "../styles";
import {Flex, Heading} from "@chakra-ui/react";

type WhiteKeyCompProps = {
  note: string;
  ind: number;
  setSelectedNote: (note: string) => void;
  thisWhiteKeyIsSelected: (note: string, ind: number) => boolean;
  displayingNotes: boolean;
};

const WhiteKeyComp: React.FC<WhiteKeyCompProps> = ({
  children,
  note,
  ind,
  thisWhiteKeyIsSelected,
  setSelectedNote,
  displayingNotes,
}) => {
  return (
    <>
      <WhiteKey
        onClick={() => setSelectedNote(note)}
        style={{
          backgroundColor: thisWhiteKeyIsSelected(note, ind) ? "lightblue" : "",
        }}
      >
        {children}
        <Flex flex="1" direction="column" justify="flex-end">
          <Heading as="h1" textAlign="center">
            {displayingNotes ? note[0] : ""}
          </Heading>
        </Flex>
      </WhiteKey>
      {note === "C4" ? (
        <Heading as="h1" textAlign="center" marginTop=".5rem">
          M
        </Heading>
      ) : null}
    </>
  );
};

export default WhiteKeyComp;
