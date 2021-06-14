import * as React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { WhiteKey, BlackKey } from "../styles";
import { trebleNotes, blackKeyWidth, whiteKeyWidth } from "../constants";
import Sharp from "../components/Sharp";
import Flat from "../components/Flat";
import LowestBlackKey from "../components/LowestBlackKey";

type WhiteKeyWithBlackKeyProps = {
  note: string;
  notes: string[];
  ind: number;
  selectedNote: string;
  setSelectedNote: React.Dispatch<React.SetStateAction<string>>;
  thisWhiteKeyIsSelected: (note: string, ind: number) => boolean;
  thisBlackKeyIsSelected: (note: string, ind: number) => boolean;
  handleWhiteFlat: (event: React.SyntheticEvent, ind: number) => void;
  handleWhiteSharp: (event: React.SyntheticEvent, ind: number) => void;
  handleFlat: (ind: number) => void;
};

const WhiteKeyWithBlackKey: React.FC<WhiteKeyWithBlackKeyProps> = ({
  note,
  notes,
  ind,
  selectedNote,
  setSelectedNote,
  thisBlackKeyIsSelected,
  thisWhiteKeyIsSelected,
  handleWhiteSharp,
  handleFlat,
}) => {
  return (
    <>
      <WhiteKey
        onClick={() => setSelectedNote(note)}
        style={{
          border: note === trebleNotes.C4 ? "2px solid blue" : "",
          backgroundColor: thisWhiteKeyIsSelected(note, ind) ? "lightblue" : "",
        }}
      >
        {note[0] === "C" || note[0] === "F" ? (
          <Flex
            position="relative"
            h="60%"
            justify="flex-start"
            align="center"
            overflow="hidden"
            borderRadius="0 0 5px 5px"
          >
            {ind !== 0 ? (
              <Box
                as="h1"
                textAlign="center"
                marginLeft={`calc(0.11 * ${whiteKeyWidth})`}
                onClick={(event) => handleWhiteSharp(event, ind)}
                borderBottom={
                  thisWhiteKeyIsSelected(note, ind) && selectedNote[1] === "s"
                    ? "2px solid black"
                    : ""
                }
              >
                <Sharp fill="black" width={17} height={30} />
              </Box>
            ) : null}
          </Flex>
        ) : null}
      </WhiteKey>

      {note[0] !== "C" && note[0] !== "F" && ind === 0 ? (
        <LowestBlackKey
          ind={ind}
          note={note}
          setSelectedNote={setSelectedNote}
          selectedNote={selectedNote}
          thisBlackKeyIsSelected={thisBlackKeyIsSelected}
        />
      ) : null}
      <BlackKey
        style={{
          backgroundColor: thisBlackKeyIsSelected(note, ind) ? "lightblue" : "",
        }}
        left={`calc(${whiteKeyWidth} - (${blackKeyWidth} / 2))`}
      >
        <Flex
          position="absolute"
          h="100%"
          w="100%"
          direction="column"
          align="stretch"
        ></Flex>
        <Flex
          position="relative"
          h={ind === notes.length - 1 ? "100%" : "50%"}
          borderBottom={
            thisBlackKeyIsSelected(note, ind) && ind !== notes.length - 1
              ? "1px solid black"
              : ind !== notes.length - 1
              ? "1px solid white"
              : "none"
          }
          zIndex="10"
          justify="center"
          align="center"
          onClick={() => setSelectedNote(note[0] + "s" + note[1])}
        >
          <Box
            color={thisBlackKeyIsSelected(note, ind) ? "black" : "white"}
            as="h1"
            textAlign="center"
            borderBottom={
              thisBlackKeyIsSelected(note, ind) && selectedNote[1] === "s"
                ? "2px solid black"
                : "none"
            }
          >
            <Sharp
              fill={thisBlackKeyIsSelected(note, ind) ? "black" : "white"}
              width={17}
              height={30}
            />
          </Box>
        </Flex>
        <Flex
          position="relative"
          h={ind === notes.length - 1 ? "0" : "50%"}
          zIndex="10"
          justify="center"
          align="center"
          overflow="hidden"
          onClick={() => handleFlat(ind)}
        >
          <Heading
            color={thisBlackKeyIsSelected(note, ind) ? "black" : "white"}
            as="h1"
            textAlign="center"
            borderBottom={
              thisBlackKeyIsSelected(note, ind) && selectedNote[1] === "b"
                ? "2px solid black"
                : "none"
            }
          >
            <Flat
              width={13}
              fill={thisBlackKeyIsSelected(note, ind) ? "black" : "white"}
            />
          </Heading>
        </Flex>
      </BlackKey>
    </>
  );
};

export default WhiteKeyWithBlackKey;
