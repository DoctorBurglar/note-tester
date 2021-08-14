import * as React from "react";
import {Box, Flex, Heading} from "@chakra-ui/react";
import {standardTuningGuitar} from "../helpers";
import {useUser, useFirestore, useFirestoreDocData} from "reactfire";
import {IGuitarNote, IUser} from "../interfacesAndTypes";
import {fretHeight, fretBoardHeight, answerStatusOptions} from "../constants";
import {ScrollModel} from "./ScrollModel";

type GuitarProps = {
  isGuestGuitar?: boolean;
  handleSelectNote: (note: IGuitarNote) => void;
  selectedNote: string;
  answer: string;
  answerStatus: string;
  displayingNotes: boolean;
  fretNumber: number;
  selectedString: number;
  displayingFretNumbers: boolean;
  noteRangeAllowsDuplicates: boolean;
  setAnswerStatus: React.Dispatch<React.SetStateAction<string>>;
};

const Guitar: React.FC<GuitarProps> = ({
  handleSelectNote,
  selectedNote,
  answer,
  answerStatus,
  displayingNotes,
  fretNumber,
  selectedString,
  displayingFretNumbers,
  noteRangeAllowsDuplicates,
  setAnswerStatus,
}) => {
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const guitarRef = React.useRef<HTMLDivElement>(null)!;

  const {data} = useUser();

  const userRef = useFirestore().collection("users").doc(data.uid);

  const userDoc = useFirestoreDocData<IUser>(userRef).data;

  const fretIsInRange = (outerInd: number, innerInd: number) => {
    return (
      outerInd + 1 <= userDoc?.guitarSettings.lowString &&
      outerInd + 1 >= userDoc?.guitarSettings.highString &&
      innerInd >= userDoc?.guitarSettings.lowFret &&
      innerInd <= userDoc?.guitarSettings.highFret
    );
  };

  console.log(standardTuningGuitar);

  const handleScroll = (event: React.SyntheticEvent) => {
    setScrollLeft(event.currentTarget.scrollLeft);
  };

  const handleOutOfRangeAnswer = () => {
    console.log("whee");
    setAnswerStatus(answerStatusOptions.OUT_OF_RANGE);
    setTimeout(() => {
      setAnswerStatus("");
    }, 1000);
  };

  const handleWrongStringAnswer = () => {
    console.log("whee");
    setAnswerStatus(answerStatusOptions.WRONG_STRING);
    setTimeout(() => {
      setAnswerStatus("");
    }, 1000);
  };

  return (
    <>
      <ScrollModel
        originalComponentWidthInRem={80}
        scrollLeft={scrollLeft}
        componentRef={guitarRef}
      >
        <Flex
          minWidth="100%"
          maxWidth="100%"
          minHeight="70px"
          margin=".5rem auto"
        >
          <Flex w="100vw" position="relative" className="noHighlightOnClick">
            <Box
              position="absolute"
              h={`${fretBoardHeight - 15}rem`}
              minWidth="100%"
              w="100%"
              bg="var(--guitar-brown)"
              top="1.8rem"
              zIndex="-20"
            ></Box>
            <Flex direction="column" w="100%" minWidth="100%">
              <Box
                w="10%"
                minHeight=".7rem"
                bg="var(--guitar-brown)"
                clipPath="polygon(0% 0%, 0% 100%, 100% 100%, 90% 95%, 78% 92%, 69% 87%, 60% 80%, 53% 73%, 43% 64%, 36% 54%, 25% 44%, 20% 35%, 15% 27%, 9% 19%, 5% 10%)"
                transform="translateY(.53rem)"
                position="relative"
                zIndex="-1"
              />
              <Box
                w="94%"
                alignSelf="flex-end"
                minHeight=".5rem"
                bg="var(--guitar-brown)"
                transform="rotate(-.2deg) translateY(.3rem)"
                boxShadow="inset .5px 3px rgb(0, 0, 0 , 0.2)"
              />
              {standardTuningGuitar.map((string, outerInd) => {
                return (
                  <Flex
                    key={string[0].name}
                    position="relative"
                    bg="var(--guitar-brown)"
                    backgroundImage="linear-gradient(to right, var(--guitar-brown) 5%, rgb(255, 255, 255, 0.3) 8%,var(--guitar-brown) 8.9%, var(--guitar-brown) 10%)"
                  >
                    <Box
                      w="100%"
                      h={0.03 + 0.025 * outerInd + "rem"}
                      position="absolute"
                      top="45%"
                      transform="translateY(-50%)"
                      bg="grey"
                      backgroundImage={
                        selectedString === outerInd + 1 &&
                        noteRangeAllowsDuplicates
                          ? "linear-gradient(to left, var(--main-color-very-dark) 40%, var(--main-color) 70%, var(--main-color-very-dark) 90%)"
                          : "linear-gradient(to left, var(--guitar-string-grey) 40%, var(--guitar-shine) 70%, var(--guitar-string-grey) 90%)"
                      }
                      filter="drop-shadow(0px 1px 2px black)"
                      zIndex="5"
                    >
                      <Box
                        w="100%"
                        h="100%"
                        backgroundImage={
                          selectedString === outerInd + 1 &&
                          noteRangeAllowsDuplicates
                            ? "linear-gradient(to top, transparent 15%, var(--main-color) 50%, transparent 85%)"
                            : "linear-gradient(to top, transparent 15%, white 50%, transparent 85%)"
                        }
                        opacity=".3"
                      ></Box>
                    </Box>
                    {string.map((note, innerInd) => {
                      return (
                        <Box
                          key={note.name}
                          position="relative"
                          cursor={
                            !fretIsInRange(outerInd, innerInd) ? "" : "pointer"
                          }
                          w={15 - 0.6 * innerInd + "%"}
                        >
                          <Flex>
                            <Box
                              key={note.name + innerInd}
                              h={`${fretHeight - 2}rem`}
                              w="100%"
                              display="inline-block"
                              position="relative"
                              zIndex="7"
                              boxSizing="border-box"
                            ></Box>
                            {innerInd === 0 && outerInd === 0 ? (
                              <Box
                                minHeight={`${fretBoardHeight - 12}rem`}
                                position="absolute"
                                minWidth=".5rem"
                                bg="var(--guitar-nut)"
                                zIndex="2"
                                borderRadius="1px"
                                boxShadow="2px 1px 6px rgb(0,0,0,0.4)"
                                right="0"
                              />
                            ) : (
                              <Box
                                minHeight={
                                  outerInd === 0 && innerInd > 0
                                    ? `${fretBoardHeight - 12}rem`
                                    : ""
                                }
                                position="absolute"
                                right="0"
                                minWidth=".2rem"
                                bg="var(--guitar-fret-silver)"
                                zIndex="2"
                                borderRadius="3px"
                                backgroundImage="linear-gradient(to right, transparent, var(--guitar-fret-shine-2), transparent), linear-gradient(to top, var(--guitar-fret-silver) 65%, var(--guitar-fret-shine) 83%, var(--guitar-fret-silver) 100%)"
                                boxShadow="1px .5px 3px rgb(0,0,0,0.4)"
                              />
                            )}
                          </Flex>

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
                              backgroundImage="linear-gradient(300deg, var(--guitar-dot) 0%, var(--guitar-dot) 60%,  var(--guitar-dot-shine) 90%, var(--guitar-dot) 100%)"
                              h=".6rem"
                              w=".6rem"
                              borderRadius="50%"
                              position="absolute"
                              top="0"
                              left="50%"
                              transform="translateY(-50%) translateX(-50%)"
                              zIndex="2"
                            ></Box>
                          ) : null}
                          {(outerInd === 2 || outerInd === 4) &&
                          innerInd === 12 ? (
                            <Box
                              border="3px solid black"
                              bg="black"
                              backgroundImage="linear-gradient(300deg, black, black, black,black,  var(--guitar-dot-shine), black)"
                              h=".6rem"
                              w=".6rem"
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
                      );
                    })}{" "}
                  </Flex>
                );
              })}

              <Box
                w="93%"
                alignSelf="flex-end"
                minHeight=".5rem"
                bg="var(--guitar-brown)"
                transform="rotate(.2deg) translateY(-.25rem)"
                boxShadow="inset 1px -4px rgb(0, 0, 0 , 0.1)"
                position="relative"
                zIndex="-10"
              />
              <Box
                w="10%"
                minHeight="1rem"
                bg="var(--guitar-brown)"
                clipPath="polygon(100% 0%, 0% 0%, 0% 100%, 6% 91%, 10% 83%, 17% 74%, 26% 65%, 33% 56%, 37% 49%, 43% 43%, 47% 38%, 54% 30%, 63% 24%, 70% 18%, 78% 12%, 86% 6%, 91% 3%)"
                transform="translateY(-.5rem)"
                position="relative"
                zIndex="-1"
              />
            </Flex>
          </Flex>
        </Flex>
      </ScrollModel>
      <Flex
        w="100vw"
        overflowX="scroll"
        overflowY="visible"
        position="relative"
        className="noHighlightOnClick"
        marginTop="-1rem"
        ref={guitarRef}
        onScroll={handleScroll}
      >
        <Box
          position="absolute"
          h={`${fretBoardHeight - 1}rem`}
          minWidth="80rem"
          w="100%"
          bg="var(--guitar-brown)"
          top="1.8rem"
          zIndex="-20"
        ></Box>
        <Flex direction="column" w="100%" minWidth="80rem">
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
            w="94%"
            alignSelf="flex-end"
            minHeight=".5rem"
            bg="var(--guitar-brown)"
            transform="rotate(-.2deg) translateY(.3rem)"
            boxShadow="inset .5px 3px rgb(0, 0, 0 , 0.2)"
          />
          {standardTuningGuitar.map((string, outerInd) => {
            return (
              <Flex
                key={string[0].name}
                position="relative"
                bg="var(--guitar-brown)"
                backgroundImage="linear-gradient(to right, var(--guitar-brown) 5%, rgb(255, 255, 255, 0.3) 8%,var(--guitar-brown) 8.9%, var(--guitar-brown) 10%)"
              >
                <Box
                  w="100%"
                  h={0.15 + 0.04 * outerInd + "rem"}
                  position="absolute"
                  top="45%"
                  transform="translateY(-50%)"
                  bg="grey"
                  backgroundImage={
                    selectedString === outerInd + 1 && noteRangeAllowsDuplicates
                      ? "linear-gradient(to left, var(--main-color-very-dark) 40%, var(--main-color) 70%, var(--main-color-very-dark) 90%)"
                      : "linear-gradient(to left, var(--guitar-string-grey) 40%, var(--guitar-shine) 70%, var(--guitar-string-grey) 90%)"
                  }
                  filter="drop-shadow(0px 2px 4px black)"
                  zIndex="5"
                >
                  <Box
                    w="100%"
                    h="100%"
                    backgroundImage={
                      selectedString === outerInd + 1 &&
                      noteRangeAllowsDuplicates
                        ? "linear-gradient(to top, transparent 15%, var(--main-color) 50%, transparent 85%)"
                        : "linear-gradient(to top, transparent 15%, white 50%, transparent 85%)"
                    }
                    opacity=".3"
                  ></Box>
                </Box>
                {string.map((note, innerInd) => {
                  return (
                    <Box
                      key={note.name}
                      position="relative"
                      cursor={
                        !fretIsInRange(outerInd, innerInd) ? "" : "pointer"
                      }
                      w={15 - 0.6 * innerInd + "rem"}
                    >
                      <Flex>
                        <Box
                          onClick={
                            fretIsInRange(outerInd, innerInd) &&
                            (outerInd + 1 === selectedString ||
                              !noteRangeAllowsDuplicates)
                              ? () => {
                                  handleSelectNote(note);
                                }
                              : fretIsInRange(outerInd, innerInd) &&
                                outerInd + 1 !== selectedString
                              ? handleWrongStringAnswer
                              : handleOutOfRangeAnswer
                          }
                          key={note.name + innerInd}
                          h={`${fretHeight}rem`}
                          w="100%"
                          display="inline-block"
                          position="relative"
                          zIndex="7"
                          boxSizing="border-box"
                          _hover={
                            fretIsInRange(outerInd, innerInd) &&
                            (outerInd + 1 === selectedString ||
                              !noteRangeAllowsDuplicates)
                              ? {
                                  border: "4px solid var(--main-color-dark)",
                                  borderRadius: "5px",
                                }
                              : {}
                          }
                        >
                          {displayingNotes && note.name[1] !== "s" ? (
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
                                note.name[0] === "C" && note.name[1] === "4"
                                  ? "var(--main-color)"
                                  : "white"
                              }
                              borderRadius="50%"
                              opacity=".6"
                            >
                              {note.name[0]}
                            </Heading>
                          ) : null}
                        </Box>
                        {innerInd === 0 && outerInd === 0 ? (
                          <Box
                            minHeight={`${fretBoardHeight}rem`}
                            position="absolute"
                            minWidth="1rem"
                            bg="var(--guitar-nut)"
                            zIndex="2"
                            borderRadius="1px"
                            boxShadow="2px 1px 6px rgb(0,0,0,0.4)"
                            right="0"
                          />
                        ) : (
                          <Box
                            minHeight={
                              outerInd === 0 && innerInd > 0
                                ? `${fretBoardHeight}rem`
                                : ""
                            }
                            position="absolute"
                            right="0"
                            minWidth=".4rem"
                            bg="var(--guitar-fret-silver)"
                            zIndex="2"
                            borderRadius="3px"
                            backgroundImage="linear-gradient(to right, transparent, var(--guitar-fret-shine-2), transparent), linear-gradient(to top, var(--guitar-fret-silver) 65%, var(--guitar-fret-shine) 83%, var(--guitar-fret-silver) 100%)"
                            boxShadow="2px 1px 6px rgb(0,0,0,0.4)"
                          />
                        )}
                      </Flex>

                      {outerInd === 3 &&
                      (innerInd === 3 ||
                        innerInd === 5 ||
                        innerInd === 7 ||
                        innerInd === 9 ||
                        innerInd === 15 ||
                        innerInd === 17 ||
                        innerInd === 19 ||
                        innerInd === 21) ? (
                        <Flex
                          border="3px solid black"
                          bg="black"
                          backgroundImage="linear-gradient(300deg, var(--guitar-dot) 0%, var(--guitar-dot) 60%,  var(--guitar-dot-shine) 90%, var(--guitar-dot) 100%)"
                          h="2rem"
                          w="2rem"
                          borderRadius="50%"
                          position="absolute"
                          top="0"
                          left="50%"
                          transform="translateY(-50%) translateX(-50%)"
                          zIndex="2"
                          color="white"
                          textAlign="center"
                          justify="center"
                          align="center"
                        >
                          {displayingFretNumbers ? (
                            <Heading as="h5" fontSize="1.8rem" fontWeight="800">
                              {innerInd}
                            </Heading>
                          ) : null}
                        </Flex>
                      ) : null}
                      {(outerInd === 2 || outerInd === 4) && innerInd === 12 ? (
                        <Flex
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
                          justify="center"
                          align="center"
                        >
                          {displayingFretNumbers ? (
                            <Heading
                              as="h5"
                              fontSize="1.8rem"
                              fontWeight="800"
                              color="white"
                            >
                              {innerInd}
                            </Heading>
                          ) : null}
                        </Flex>
                      ) : null}
                    </Box>
                  );
                })}{" "}
              </Flex>
            );
          })}

          <Box
            w="93%"
            alignSelf="flex-end"
            minHeight=".5rem"
            bg="var(--guitar-brown)"
            transform="rotate(.2deg) translateY(-.25rem)"
            boxShadow="inset 1px -4px rgb(0, 0, 0 , 0.1)"
            position="relative"
            zIndex="-10"
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
      </Flex>
    </>
  );
};

export {Guitar};
