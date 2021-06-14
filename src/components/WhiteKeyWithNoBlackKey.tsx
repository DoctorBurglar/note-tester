import * as React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { WhiteKey } from "../styles";
import { whiteKeyWidth } from "../constants";
import Flat from "../components/Flat";
import LowestBlackKey from "./LowestBlackKey";

type WhiteKeyWithNoBlackKeyProps = {
  note: string;
  ind: number;
  selectedNote: string;
  setSelectedNote: React.Dispatch<React.SetStateAction<string>>;
  thisWhiteKeyIsSelected: (note: string, ind: number) => boolean;
  thisBlackKeyIsSelected: (note: string, ind: number) => boolean;
  handleWhiteFlat: (event: React.SyntheticEvent, ind: number) => void;
};

const WhiteKeyWithNoBlackKey: React.FC<WhiteKeyWithNoBlackKeyProps> = ({
  note,
  ind,
  selectedNote,
  setSelectedNote,
  thisWhiteKeyIsSelected,
  thisBlackKeyIsSelected,
  handleWhiteFlat,
}) => {
  return (
    <>
      <WhiteKey
        onClick={() => setSelectedNote(note)}
        style={{
          backgroundColor: thisWhiteKeyIsSelected(note, ind) ? "lightblue" : "",
        }}
      >
        <Flex
          position="relative"
          h="60%"
          justify="flex-end"
          align="center"
          onClick={() => setSelectedNote(note[0] + "b" + note[1])}
          overflow="hidden"
          borderRadius="0 0 5px 5px"
        >
          <Box
            marginRight={`calc(0.11 * ${whiteKeyWidth})`}
            onClick={(event) => handleWhiteFlat(event, ind)}
            borderBottom={
              thisWhiteKeyIsSelected(note, ind) && selectedNote[1] === "b"
                ? "2px solid black"
                : ""
            }
          >
            <Flat width={13} fill="black" />
          </Box>
        </Flex>
      </WhiteKey>
      {ind === 0 ? (
        <LowestBlackKey
          ind={ind}
          note={note}
          setSelectedNote={setSelectedNote}
          selectedNote={selectedNote}
          thisBlackKeyIsSelected={thisBlackKeyIsSelected}
        />
      ) : null}
    </>
  );
};

export default WhiteKeyWithNoBlackKey;
