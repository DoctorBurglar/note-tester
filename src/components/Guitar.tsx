import * as React from "react";
import {Box, Flex, Heading} from "@chakra-ui/react";

type GuitarProps = {
  isGuestGuitar?: boolean;
  setSelectedNote: (note: string) => void;
  selectedNote: string;
  answer: string;
  answerStatus: string;
  displayingNotes: boolean;
};

const Guitar: React.FC<GuitarProps> = ({
  setSelectedNote,
  selectedNote,
  answer,
  answerStatus,
  displayingNotes,
}) => {
  const standardTuning = ["E5", "B4", "G4", "D4", "A3", "E3"];

  const createGuitarFromOpenStrings = (
    openStrings: string[],
    toFret: number
  ) => {
    const noteOrder = ["A", "B", "C", "D", "E", "F", "G", "A"];
    const guitarStringArray: string[][] = [];
    openStrings.forEach((openString, ind) => {
      let currentNote = openString;
      const currentStringArray = [];
      for (let i = 0; i <= toFret; i++) {
        currentStringArray.push(currentNote);
        let letter = currentNote[0];
        let octave;
        if (letter === "B" || letter === "E") {
          if (letter === "B") {
            octave = +currentNote[1] + 1;
          } else {
            octave = currentNote[1];
          }
          currentNote = noteOrder[noteOrder.indexOf(letter) + 1] + octave;
        } else if (currentNote[1] === "s") {
          octave = currentNote[2];
          currentNote = noteOrder[noteOrder.indexOf(letter) + 1] + octave;
        } else {
          octave = currentNote[1];
          currentNote = letter + "s" + octave;
        }
      }
      guitarStringArray.push(currentStringArray);
    });
    return guitarStringArray;
  };

  const constructedStrings = createGuitarFromOpenStrings(standardTuning, 13);

  console.log(constructedStrings);

  return (
    <Flex direction="column" marginTop="-1.5rem" cursor="pointer" w="100vw">
      <Box
        w="10%"
        minHeight="1.2rem"
        bg="var(--guitar-brown)"
        clipPath="polygon(0% 0%, 0% 100%, 100% 100%, 90% 95%, 78% 92%, 69% 87%, 60% 80%, 53% 73%, 43% 64%, 36% 54%, 25% 44%, 20% 35%, 15% 27%, 9% 19%, 5% 10%)"
        transform="translateY(.6rem)"
        position="relative"
        zIndex="-1"
      />
      <Box
        w="100%"
        minHeight=".5rem"
        bg="var(--guitar-brown)"
        clipPath="polygon(100% 0, 0 100%, 100% 100%)"
        transform="translateY(.2rem)"
      />
      {constructedStrings.map((string, outerInd) => {
        return (
          <Flex
            key={string[0] + outerInd}
            position="relative"
            bg="var(--guitar-brown)"
            backgroundImage="linear-gradient(to right, var(--guitar-brown) 5%, rgb(255, 255, 255, 0.3) 8%,var(--guitar-brown) 8.9%, var(--guitar-brown) 10%)"
            // zIndex="5"
          >
            <Box
              w="100%"
              h={0.15 + 0.04 * outerInd + "rem"}
              position="absolute"
              top="45%"
              transform="translateY(-50%)"
              bg="grey"
              backgroundImage="linear-gradient(to left, var(--guitar-string-grey) 40%, var(--guitar-shine) 70%, var(--guitar-string-grey) 90%)"
              filter="drop-shadow(0px 2px 4px black)"
              zIndex="5"
            >
              <Box
                w="100%"
                h="100%"
                backgroundImage="linear-gradient(to top, transparent 15%, white 50%, transparent 85%)"
                opacity=".3"
              ></Box>
            </Box>
            {string.map((note, innerInd) => {
              return (
                <>
                  <Box position="relative" w={15 - 0.6 * innerInd + "rem"}>
                    <Box
                      onClick={() => {
                        setSelectedNote(note);
                      }}
                      key={note + innerInd}
                      h="2.4rem"
                      // border="1px solid black"
                      w="100%"
                      display="inline-block"
                      position="relative"
                      zIndex="7"
                      boxSizing="border-box"
                      _hover={{
                        // backgroundColor: "var(--main-color)",
                        border: "4px solid var(--main-color-dark)",
                        borderRadius: "5px",
                      }}
                    >
                      {displayingNotes && note[1] !== "s" ? (
                        <Heading
                          as="h3"
                          position="absolute"
                          top="58%"
                          left="50%"
                          transform="translate(-50%, -50%)"
                          fontSize="2rem"
                          w="2.5rem"
                          h="2.5rem"
                          textAlign="center"
                          className="note-name"
                          bg={
                            note[0] === "C" && note[1] === "4"
                              ? "var(--main-color)"
                              : "white"
                          }
                          borderRadius="50%"
                          opacity=".6"
                          // color="var(--main-color-very-dark)"
                        >
                          {note[0]}
                        </Heading>
                      ) : null}
                    </Box>
                    {outerInd === 3 &&
                    (innerInd === 3 ||
                      innerInd === 5 ||
                      innerInd === 7 ||
                      innerInd === 9 ||
                      innerInd === 15 ||
                      innerInd === 17 ||
                      innerInd === 19 ||
                      innerInd === 21) ? (
                      <Box
                        border="3px solid black"
                        bg="black"
                        backgroundImage="linear-gradient(300deg, black, black, black,black,  var(--guitar-dot-shine), black)"
                        h="2rem"
                        w="2rem"
                        borderRadius="50%"
                        position="absolute"
                        top="0"
                        left="50%"
                        transform="translateY(-50%) translateX(-50%)"
                        zIndex="2"
                      ></Box>
                    ) : null}
                    {(outerInd === 2 || outerInd === 4) && innerInd === 12 ? (
                      <Box
                        border="3px solid black"
                        bg="black"
                        backgroundImage="linear-gradient(300deg, black, black, black,black,  var(--guitar-dot-shine), black)"
                        h="2rem"
                        w="2rem"
                        borderRadius="50%"
                        position="absolute"
                        top="0"
                        left="50%"
                        transform={
                          outerInd === 2
                            ? "translateY(-75%) translateX(-50%)"
                            : "translateY(-25%) translateX(-50%)"
                        }
                      ></Box>
                    ) : null}
                  </Box>

                  <Box
                    minHeight="100%"
                    minWidth={innerInd === 0 ? "1rem" : ".4rem"}
                    bg={
                      innerInd === 0
                        ? "var(--white)"
                        : "var(--guitar-fret-silver)"
                    }
                    backgroundImage={
                      outerInd === 0 && innerInd > 0
                        ? "linear-gradient(to top, var(--guitar-fret-shine) , var(--guitar-fret-silver))"
                        : outerInd === 1 && innerInd > 0
                        ? "linear-gradient(to top,  var(--guitar-fret-silver), var(--guitar-fret-shine) )"
                        : ""
                    }
                  >
                    <Box
                      w="100%"
                      h="100%"
                      backgroundImage="linear-gradient(to right, transparent, var(--guitar-fret-shine), transparent)"
                      opacity=".5"
                    />
                  </Box>
                </>
              );
            })}{" "}
          </Flex>
        );
      })}
      <Box
        w="100%"
        minHeight=".5rem"
        bg="var(--guitar-brown)"
        clipPath="polygon(100% 0, 0 0, 100% 100%)"
        transform="translateY(-.2rem)"
      />
      <Box
        w="10%"
        minHeight="2rem"
        bg="var(--guitar-brown)"
        clipPath="polygon(100% 0%, 0% 0%, 0% 100%, 6% 91%, 10% 83%, 17% 74%, 26% 65%, 33% 56%, 37% 49%, 43% 43%, 47% 38%, 54% 30%, 63% 24%, 70% 18%, 78% 12%, 86% 6%, 91% 3%)"
        transform="translateY(-.6rem)"
        position="relative"
        zIndex="-1"
      />
    </Flex>
  );
};

export {Guitar};
