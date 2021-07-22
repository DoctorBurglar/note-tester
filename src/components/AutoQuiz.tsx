import * as React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Select,
  Checkbox,
  FormControl,
  FormLabel,
  Flex,
  Heading,
} from "@chakra-ui/react";
import {useSession} from "../hooks";
import {trebleNotes, bassNotes} from "../constants";
import {getRandomNote} from "../helpers";
import {presets} from "../constants";

const AutoQuiz: React.FC<{sessionId: string}> = ({sessionId}) => {
  const [lowTrebleNoteOfRange, setLowTrebleNoteOfRange] = React.useState<
    trebleNotes | string
  >(trebleNotes.C3);
  const [highTrebleNoteOfRange, setHighTrebleNoteOfRange] = React.useState<
    trebleNotes | string
  >(trebleNotes.A6);
  const [lowBassNoteOfRange, setLowBassNoteOfRange] = React.useState<
    bassNotes | string
  >(bassNotes.E1);
  const [highBassNoteOfRange, setHighBassNoteOfRange] = React.useState<
    bassNotes | string
  >(bassNotes.C5);
  const [includeSharps, setIncludeSharps] = React.useState(true);
  const [includeFlats, setIncludeFlats] = React.useState(true);
  const [includeTreble, setIncludeTreble] = React.useState(true);
  const [includeBass, setIncludeBass] = React.useState(true);
  const [treblePreset, setTreblePreset] = React.useState<presets | string>(
    presets.CUSTOM
  );
  const [bassPreset, setBassPreset] = React.useState<presets | string>(
    presets.CUSTOM
  );

  const {sessionDoc, sessionRef} = useSession(sessionId);

  const {isOpen, onOpen, onClose} = useDisclosure();

  React.useEffect(() => {
    switch (treblePreset) {
      case presets.CUSTOM:
        setLowTrebleNoteOfRange(trebleNotes.C3);
        setHighTrebleNoteOfRange(trebleNotes.A6);
        break;
      case presets.CPOSITION:
        setLowTrebleNoteOfRange(trebleNotes.C4);
        setHighTrebleNoteOfRange(trebleNotes.G4);
        break;
      case presets.MIDDLECPOSITION:
        setLowTrebleNoteOfRange(trebleNotes.C4);
        setHighTrebleNoteOfRange(trebleNotes.G4);
        break;
      case presets.GPOSITION:
        setLowTrebleNoteOfRange(trebleNotes.G4);
        setHighTrebleNoteOfRange(trebleNotes.D5);
        break;
      case presets.NOTESONSTAFF:
        setLowTrebleNoteOfRange(trebleNotes.E4);
        setHighTrebleNoteOfRange(trebleNotes.F5);
        break;
      case presets.NOTERSBELOWSTAFF:
        setLowTrebleNoteOfRange(trebleNotes.C3);
        setHighTrebleNoteOfRange(trebleNotes.D4);
        break;
      case presets.NOTESABOVESTAFF:
        setLowTrebleNoteOfRange(trebleNotes.G5);
        setHighTrebleNoteOfRange(trebleNotes.A6);
        break;
      default:
        setLowTrebleNoteOfRange(trebleNotes.C3);
        setHighTrebleNoteOfRange(trebleNotes.A6);
    }
  }, [treblePreset]);

  React.useEffect(() => {
    switch (bassPreset) {
      case "Custom":
        setLowBassNoteOfRange(bassNotes.E1);
        setHighBassNoteOfRange(bassNotes.C5);
        break;
      case "C position":
        setLowBassNoteOfRange(bassNotes.C3);
        setHighBassNoteOfRange(bassNotes.G3);
        break;
      case "Middle C position":
        setLowBassNoteOfRange(bassNotes.C4);
        setHighBassNoteOfRange(bassNotes.G4);
        break;
      case "G position":
        setLowBassNoteOfRange(bassNotes.G2);
        setHighBassNoteOfRange(bassNotes.D3);
        break;
      case "Notes on staff":
        setLowBassNoteOfRange(bassNotes.G2);
        setHighBassNoteOfRange(bassNotes.A3);
        break;
      case "Notes above staff":
        setLowBassNoteOfRange(bassNotes.B3);
        setHighBassNoteOfRange(bassNotes.C5);
        break;
      case "Notes below staff":
        setLowBassNoteOfRange(bassNotes.E1);
        setHighBassNoteOfRange(bassNotes.G2);
        break;
      default:
        setLowBassNoteOfRange(bassNotes.E1);
        setHighBassNoteOfRange(bassNotes.C2);
    }
  }, [bassPreset]);

  const resetAutoQuizFields = () => {
    setLowTrebleNoteOfRange(trebleNotes.C3);
    setHighTrebleNoteOfRange(trebleNotes.A6);
    setLowBassNoteOfRange(bassNotes.E1);
    setHighBassNoteOfRange(bassNotes.C5);
    setIncludeTreble(true);
    setIncludeBass(true);
    setIncludeSharps(true);
    setIncludeFlats(true);
    setBassPreset(presets.CUSTOM);
    setTreblePreset(presets.CUSTOM);
  };

  const handleModalClose = () => {
    resetAutoQuizFields();
    onClose();
  };

  const handleModalOpen = async () => {
    resetAutoQuizFields();
    try {
      if (sessionDoc?.autoQuiz.on) {
        await sessionRef.update({
          autoQuiz: {...sessionDoc.autoQuiz, on: false},
        });
        return;
      }
      onOpen();
    } catch (err) {
      console.log(err);
    }
  };

  const handleQuiz = async () => {
    if (!includeBass && !includeTreble) {
      return;
    }
    const result = getRandomNote({
      on: true,
      includeFlats,
      includeSharps,
      includeTreble,
      includeBass,
      lowTrebleNote: lowTrebleNoteOfRange,
      highTrebleNote: highTrebleNoteOfRange,
      lowBassNote: lowBassNoteOfRange,
      highBassNote: highBassNoteOfRange,
    });
    const randomNote = result?.randomNote;
    const randomClef = result?.randomClef;
    console.log(sessionDoc?.autoQuiz?.on, randomNote);
    try {
      await sessionRef.update({
        autoQuiz: {
          includeSharps,
          includeFlats,
          includeTreble,
          includeBass,
          lowTrebleNote: lowTrebleNoteOfRange,
          highTrebleNote: highTrebleNoteOfRange,
          lowBassNote: lowBassNoteOfRange,
          highBassNote: highBassNoteOfRange,
          on: sessionDoc?.autoQuiz.on ? true : !sessionDoc?.autoQuiz.on,
        },
        selectedNote: randomNote,
        selectedClef: randomClef,
        answer: "",
        answerStatus: "",
      });
      onClose();
    } catch (err) {
      console.log(err);
    }
  };
  console.log(lowBassNoteOfRange, includeFlats, includeSharps);

  const trebleNotesArray = Object.keys(trebleNotes);
  const bassNotesArray = Object.keys(bassNotes);

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Auto Quiz</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <Flex direction="column" padding="1rem">
                <Checkbox
                  marginRight="3rem"
                  marginBottom="1rem"
                  onChange={() => setIncludeTreble((prevBool) => !prevBool)}
                  defaultChecked
                >
                  <Heading as="h3" fontSize="1.5rem" fontWeight="400">
                    Treble Clef
                  </Heading>
                </Checkbox>
                <FormControl
                  isDisabled={!includeTreble}
                  w="80%"
                  alignSelf="center"
                >
                  <Flex align="center">
                    <FormLabel htmlFor="presets">Presets:</FormLabel>
                    <Select
                      onChange={(e) => setTreblePreset(e.target.value)}
                      id="presets"
                      value={treblePreset}
                    >
                      {Object.values(presets).map((preset) => {
                        return (
                          <option key={preset} value={preset}>
                            {preset}
                          </option>
                        );
                      })}
                    </Select>
                  </Flex>
                </FormControl>
                <Flex justify="space-between" padding="0 1rem ">
                  <FormControl
                    isDisabled={!includeTreble || treblePreset !== "Custom"}
                    w="45%"
                  >
                    <FormLabel htmlFor="lowNote">Low Note</FormLabel>
                    <Select
                      onChange={(e) => setLowTrebleNoteOfRange(e.target.value)}
                      id="lowNote"
                      value={lowTrebleNoteOfRange}
                    >
                      {trebleNotesArray.map((note) => {
                        return (
                          <option key={note} value={note}>
                            {note}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl
                    isDisabled={!includeTreble || treblePreset !== "Custom"}
                    w="45%"
                  >
                    <FormLabel htmlFor="highNote">High Note</FormLabel>
                    <Select
                      id="highNote"
                      onChange={(e) => setHighTrebleNoteOfRange(e.target.value)}
                      value={highTrebleNoteOfRange}
                    >
                      {trebleNotesArray
                        .slice(trebleNotesArray.indexOf(lowTrebleNoteOfRange))
                        .map((note) => {
                          return (
                            <option key={note} value={note}>
                              {note}
                            </option>
                          );
                        })}
                    </Select>
                  </FormControl>
                </Flex>
              </Flex>
              <Flex direction="column" padding="1rem">
                <Checkbox
                  marginBottom="1rem"
                  onChange={() => setIncludeBass((prevBool) => !prevBool)}
                  defaultChecked
                >
                  <Heading as="h3" fontSize="1.5rem" fontWeight="400">
                    Bass Clef
                  </Heading>
                </Checkbox>

                <FormControl
                  isDisabled={!includeTreble}
                  w="80%"
                  alignSelf="center"
                >
                  <Flex align="center">
                    <FormLabel htmlFor="presets">Presets:</FormLabel>
                    <Select
                      onChange={(e) => setBassPreset(e.target.value)}
                      id="presets"
                      value={bassPreset}
                    >
                      {Object.values(presets).map((preset) => {
                        return (
                          <option key={preset} value={preset}>
                            {preset}
                          </option>
                        );
                      })}
                    </Select>
                  </Flex>
                </FormControl>

                <Flex justify="space-between" padding="0 1rem">
                  <FormControl
                    isDisabled={!includeBass || bassPreset !== presets.CUSTOM}
                    w="45%"
                  >
                    <FormLabel htmlFor="lowNote">Low Note</FormLabel>
                    <Select
                      onChange={(e) => setLowBassNoteOfRange(e.target.value)}
                      id="lowNote"
                      value={lowBassNoteOfRange}
                    >
                      {bassNotesArray.map((note) => {
                        return (
                          <option key={note} value={note}>
                            {note}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl
                    isDisabled={!includeBass || bassPreset !== presets.CUSTOM}
                    w="45%"
                  >
                    <FormLabel htmlFor="hignNote">High Note</FormLabel>
                    <Select
                      id="highNote"
                      onChange={(e) => setHighBassNoteOfRange(e.target.value)}
                      value={highBassNoteOfRange}
                    >
                      {bassNotesArray
                        .slice(bassNotesArray.indexOf(lowBassNoteOfRange))
                        .map((note) => {
                          return (
                            <option key={note} value={note}>
                              {note}
                            </option>
                          );
                        })}
                    </Select>
                  </FormControl>
                </Flex>
              </Flex>

              <Flex justify="center" marginTop="1.5rem">
                <Checkbox
                  marginRight="3rem"
                  onChange={() => setIncludeSharps((prevBool) => !prevBool)}
                  defaultChecked
                >
                  Sharps
                </Checkbox>
                <Checkbox
                  onChange={() => setIncludeFlats((prevBool) => !prevBool)}
                  defaultChecked
                >
                  Flats
                </Checkbox>
              </Flex>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleModalClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleQuiz}>
              Start
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button
        onClick={handleModalOpen}
        zIndex="5"
        position="relative"
        marginLeft="2rem"
      >
        {sessionDoc?.autoQuiz?.on ? "Stop auto quiz" : "Start auto quiz"}
      </Button>
    </>
  );
};

export default AutoQuiz;
