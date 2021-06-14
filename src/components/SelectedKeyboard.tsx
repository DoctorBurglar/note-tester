import * as React from "react";
import { Flex, Box, Heading } from "@chakra-ui/react";
import { WhiteKey, BlackKey } from "../styles";
import {
  keyboardWidth,
  whiteKeyWidth,
  blackKeyWidth,
  trebleNotes,
} from "../constants";
import { IKeyboardProps } from "../interfacesAndTypes";
import Sharp from "../components/Sharp";
import Flat from "../components/Flat";
import WhiteKeyWithNoBlackKey from "./WhiteKeyWithNoBlackKey";
import WhiteKeyWithBlackKey from "./WhiteKeyWithBlackKey";

interface ISelectedKeyboardProps extends IKeyboardProps {
  notes: string[];
}

const SelectedKeyboard: React.FC<ISelectedKeyboardProps> = ({
  notes,
  selectedNote,
  setSelectedNote,
}) => {
  const handleFlat = (ind: number) => {
    console.log("made it here");
    if (notes.length - 1 <= ind) {
      return;
    } else setSelectedNote(notes[ind + 1][0] + "b" + notes[ind + 1][1]);
  };

  const thisWhiteKeyIsSelected = (note: string, ind: number) => {
    let keyIsSelected = false;
    // if natural white key
    if (note === selectedNote) {
      keyIsSelected = true;
    }
    // if Cb or Fb
    if (note[0] === "B" || (note[0] === "E" && ind < notes.length - 1)) {
      if (notes[ind + 1][0] + "b" + notes[ind + 1][1] === selectedNote) {
        keyIsSelected = true;
      }
    }
    // if B# or E#
    if (note[0] === "C" || (note[0] === "F" && ind > 0)) {
      if (
        ind > 0 &&
        notes[ind - 1][0] + "s" + notes[ind - 1][1] === selectedNote
      ) {
        keyIsSelected = true;
      }
    }
    return keyIsSelected;
  };

  const thisBlackKeyIsSelected = (note: string, ind: number) => {
    let keyIsSelected = false;
    // if note is a selected sharp
    if (note[0] + "s" + note[1] === selectedNote) {
      keyIsSelected = true;
    }
    // if note is the lowest key and a flat
    if (ind === 0 && note[0] + "b" + note[1] === selectedNote) {
      keyIsSelected = true;
    }
    // if the note is any other black key flat
    if (
      ind < notes.length - 1 &&
      !thisWhiteKeyIsSelected(note, ind) &&
      notes[ind + 1][0] + "b" + notes[ind + 1][1] === selectedNote
    ) {
      keyIsSelected = true;
    }
    return keyIsSelected;
  };

  const handleWhiteFlat = (event: React.SyntheticEvent, ind: number) => {
    event.stopPropagation();
    setSelectedNote(notes[ind + 1][0] + "b" + notes[ind + 1][1]);
  };

  const handleWhiteSharp = (event: React.SyntheticEvent, ind: number) => {
    event.stopPropagation();
    if (ind > 0) {
      setSelectedNote(notes[ind - 1][0] + "s" + notes[ind - 1][1]);
    }
  };

  return (
    <Flex
      w={keyboardWidth}
      h="13rem"
      alignItems="stretch"
      position="relative"
      cursor="pointer"
    >
      {notes.map((note, ind) => {
        return (
          <Box position="relative" key={note}>
            {note[0] === "B" || note[0] === "E" ? (
              // <>
              //   <WhiteKey
              //     onClick={() => setSelectedNote(note)}
              //     style={{
              //       backgroundColor: thisWhiteKeyIsSelected(note, ind)
              //         ? "lightblue"
              //         : "",
              //     }}
              //   >
              //     <Flex
              //       position="relative"
              //       h="60%"
              //       justify="flex-end"
              //       align="center"
              //       onClick={() => setSelectedNote(note[0] + "b" + note[1])}
              //       overflow="hidden"
              //       borderRadius="0 0 5px 5px"
              //     >
              //       <Box
              //         marginRight={`calc(0.11 * ${whiteKeyWidth})`}
              //         onClick={(event) => handleWhiteFlat(event, ind)}
              //         borderBottom={
              //           thisWhiteKeyIsSelected(note, ind) &&
              //           selectedNote[1] === "b"
              //             ? "2px solid black"
              //             : ""
              //         }
              //       >
              //         <Flat width={13} fill="black" />
              //       </Box>
              //     </Flex>
              //   </WhiteKey>
              //   {ind === 0 ? (
              //     <BlackKey left={`calc((-${blackKeyWidth} / 2))`}>
              //       <Flex
              //         position="relative"
              //         h="100%"
              //         zIndex="10"
              //         justify="center"
              //         align="center"
              //         onClick={() => setSelectedNote(note[0] + "b" + note[1])}
              //         overflow="hidden"
              //         borderRadius="0 0 5px 5px"
              //         style={
              //           thisBlackKeyIsSelected(note, ind)
              //             ? {
              //                 backgroundColor: "lightblue",
              //                 color: "black",
              //               }
              //             : {}
              //         }
              //       >
              //         <Heading
              //           color={
              //             thisBlackKeyIsSelected(note, ind) ? "black" : "white"
              //           }
              //           as="h1"
              //           textAlign="center"
              //           borderBottom={
              //             thisBlackKeyIsSelected(note, ind) &&
              //             selectedNote[1] === "b" &&
              //             note[0] === selectedNote[0]
              //               ? "2px solid black"
              //               : "none"
              //           }
              //         >
              //           <Flat
              //             width={13}
              //             fill={
              //               thisBlackKeyIsSelected(note, ind)
              //                 ? "black"
              //                 : "white"
              //             }
              //           />
              //         </Heading>
              //       </Flex>
              //     </BlackKey>
              //   ) : null}
              // </>
              <WhiteKeyWithNoBlackKey
                handleWhiteFlat={handleWhiteFlat}
                ind={ind}
                note={note}
                selectedNote={selectedNote}
                setSelectedNote={setSelectedNote}
                thisBlackKeyIsSelected={thisBlackKeyIsSelected}
                thisWhiteKeyIsSelected={thisWhiteKeyIsSelected}
              />
            ) : (
              <WhiteKeyWithBlackKey
                handleWhiteFlat={handleWhiteFlat}
                ind={ind}
                note={note}
                selectedNote={selectedNote}
                setSelectedNote={setSelectedNote}
                thisBlackKeyIsSelected={thisBlackKeyIsSelected}
                thisWhiteKeyIsSelected={thisWhiteKeyIsSelected}
                handleFlat={handleFlat}
                handleWhiteSharp={handleWhiteSharp}
                notes={notes}
              />
              // <>
              //   <WhiteKey
              //     onClick={() => setSelectedNote(note)}
              //     style={{
              //       border: note === trebleNotes.C4 ? "2px solid blue" : "",
              //       backgroundColor: thisWhiteKeyIsSelected(note, ind)
              //         ? "lightblue"
              //         : "",
              //     }}
              //   >
              //     {note[0] === "C" || note[0] === "F" ? (
              //       <Flex
              //         position="relative"
              //         h="60%"
              //         justify="flex-start"
              //         align="center"
              //         overflow="hidden"
              //         borderRadius="0 0 5px 5px"
              //       >
              //         {ind !== 0 ? (
              //           <Box
              //             as="h1"
              //             textAlign="center"
              //             marginLeft={`calc(0.11 * ${whiteKeyWidth})`}
              //             onClick={(event) => handleWhiteSharp(event, ind)}
              //             borderBottom={
              //               thisWhiteKeyIsSelected(note, ind) &&
              //               selectedNote[1] === "s"
              //                 ? "2px solid black"
              //                 : ""
              //             }
              //           >
              //             <Sharp fill="black" width={17} height={30} />
              //           </Box>
              //         ) : null}
              //       </Flex>
              //     ) : null}
              //   </WhiteKey>
              //   {note[0] !== "C" && note[0] !== "F" && ind === 0 ? (
              //     <BlackKey left={`calc((-${blackKeyWidth} / 2))`}>
              //       <Flex
              //         position="relative"
              //         h="100%"
              //         zIndex="10"
              //         justify="center"
              //         align="center"
              //         onClick={() => setSelectedNote(note[0] + "b" + note[1])}
              //         overflow="hidden"
              //         borderRadius="0 0 5px 5px"
              //         style={
              //           thisBlackKeyIsSelected(note, ind)
              //             ? {
              //                 backgroundColor: "lightblue",
              //                 color: "black",
              //               }
              //             : {}
              //         }
              //       >
              //         <Heading
              //           color={
              //             thisBlackKeyIsSelected(note, ind) ? "black" : "white"
              //           }
              //           as="h1"
              //           textAlign="center"
              //           borderBottom={
              //             thisBlackKeyIsSelected(note, ind) &&
              //             selectedNote[1] === "b" &&
              //             note[0] === selectedNote[0]
              //               ? "2px solid black"
              //               : "none"
              //           }
              //         >
              //           <Flat
              //             width={13}
              //             fill={
              //               thisBlackKeyIsSelected(note, ind)
              //                 ? "black"
              //                 : "white"
              //             }
              //           />
              //         </Heading>
              //       </Flex>
              //     </BlackKey>
              //   ) : null}
              //   <BlackKey
              //     style={{
              //       backgroundColor: thisBlackKeyIsSelected(note, ind)
              //         ? "lightblue"
              //         : "",
              //     }}
              //     left={`calc(${whiteKeyWidth} - (${blackKeyWidth} / 2))`}
              //   >
              //     <Flex
              //       position="absolute"
              //       h="100%"
              //       w="100%"
              //       direction="column"
              //       align="stretch"
              //     ></Flex>
              //     <Flex
              //       position="relative"
              //       h={ind === notes.length - 1 ? "100%" : "50%"}
              //       borderBottom={
              //         thisBlackKeyIsSelected(note, ind) &&
              //         ind !== notes.length - 1
              //           ? "1px solid black"
              //           : ind !== notes.length - 1
              //           ? "1px solid white"
              //           : "none"
              //       }
              //       zIndex="10"
              //       justify="center"
              //       align="center"
              //       onClick={() => setSelectedNote(note[0] + "s" + note[1])}
              //     >
              //       <Box
              //         color={
              //           thisBlackKeyIsSelected(note, ind) ? "black" : "white"
              //         }
              //         as="h1"
              //         textAlign="center"
              //         borderBottom={
              //           thisBlackKeyIsSelected(note, ind) &&
              //           selectedNote[1] === "s"
              //             ? "2px solid black"
              //             : "none"
              //         }
              //       >
              //         <Sharp
              //           fill={
              //             thisBlackKeyIsSelected(note, ind) ? "black" : "white"
              //           }
              //           width={17}
              //           height={30}
              //         />
              //       </Box>
              //     </Flex>
              //     <Flex
              //       position="relative"
              //       h={ind === notes.length - 1 ? "0" : "50%"}
              //       zIndex="10"
              //       justify="center"
              //       align="center"
              //       overflow="hidden"
              //       onClick={() => handleFlat(ind)}
              //     >
              //       <Heading
              //         color={
              //           thisBlackKeyIsSelected(note, ind) ? "black" : "white"
              //         }
              //         as="h1"
              //         textAlign="center"
              //         borderBottom={
              //           thisBlackKeyIsSelected(note, ind) &&
              //           selectedNote[1] === "b"
              //             ? "2px solid black"
              //             : "none"
              //         }
              //       >
              //         <Flat
              //           width={13}
              //           fill={
              //             thisBlackKeyIsSelected(note, ind) ? "black" : "white"
              //           }
              //         />
              //       </Heading>
              //     </Flex>
              //   </BlackKey>
              // </>
            )}
          </Box>
        );
      })}
    </Flex>
  );
};

export default SelectedKeyboard;
