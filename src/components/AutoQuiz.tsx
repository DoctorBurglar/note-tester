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
} from "@chakra-ui/react";
import {useSession} from "../hooks";
import {trebleNotes, bassNotes} from "../constants";
import {getRandomNote} from "../helpers";

const AutoQuiz: React.FC<{sessionId: string}> = ({sessionId}) => {
  const [lowTrebleNoteOfRange, setLowTrebleNoteOfRange] = React.useState("");
  const [highTrebleNoteOfRange, setHighTrebleNoteOfRange] = React.useState("");
  const [lowBassNoteOfRange, setLowBassNoteOfRange] = React.useState("");
  const [highBassNoteOfRange, setHighBassNoteOfRange] = React.useState("");
  const [includeSharps, setIncludeSharps] = React.useState(false);
  const [includeFlats, setIncludeFlats] = React.useState(false);
  const [includeTreble, setIncludeTreble] = React.useState(false);
  const [includeBass, setIncludeBass] = React.useState(false);

  const {sessionDoc, sessionRef} = useSession(sessionId);

  const {isOpen, onOpen, onClose} = useDisclosure();

  const resetAutoQuizFields = () => {
    setLowTrebleNoteOfRange("");
    setHighTrebleNoteOfRange("");
    setLowBassNoteOfRange("");
    setHighBassNoteOfRange("");
    setIncludeTreble(false);
    setIncludeBass(false);
    setIncludeSharps(false);
    setIncludeFlats(false);
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
    const result = getRandomNote(
      includeFlats,
      includeSharps,
      includeTreble,
      includeBass,
      lowTrebleNoteOfRange,
      highTrebleNoteOfRange,
      lowBassNoteOfRange,
      highBassNoteOfRange
    );
    const randomNote = result?.randomNote;
    const randomClef = result?.randomClef;
    console.log(sessionDoc?.autoQuiz?.on);
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
              <Checkbox
                marginRight="3rem"
                marginBottom="1rem"
                onChange={() => setIncludeTreble((prevBool) => !prevBool)}
              >
                Treble Clef
              </Checkbox>
              <Flex>
                <FormControl marginBottom="2rem" isDisabled={!includeTreble}>
                  <FormLabel htmlFor="lowNote">Low Note</FormLabel>
                  <Select
                    onChange={(e) => setLowTrebleNoteOfRange(e.target.value)}
                    id="lowNote"
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
                  marginBottom="2rem"
                  isDisabled={lowTrebleNoteOfRange === "" || !includeTreble}
                >
                  <FormLabel htmlFor="hignNote">High Note</FormLabel>
                  <Select
                    id="highNote"
                    onChange={(e) => setHighTrebleNoteOfRange(e.target.value)}
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

              <Flex justify="center">
                <Checkbox
                  marginRight="3rem"
                  onChange={() => setIncludeSharps((prevBool) => !prevBool)}
                  isDisabled={!includeTreble}
                >
                  Sharps
                </Checkbox>
                <Checkbox
                  onChange={() => setIncludeFlats((prevBool) => !prevBool)}
                  isDisabled={!includeTreble}
                >
                  Flats
                </Checkbox>
              </Flex>
              <Checkbox
                marginRight="3rem"
                marginBottom="1rem"
                onChange={() => setIncludeBass((prevBool) => !prevBool)}
              >
                Bass Clef
              </Checkbox>
              <Flex>
                <FormControl marginBottom="2rem" isDisabled={!includeBass}>
                  <FormLabel htmlFor="lowNote">Low Note</FormLabel>
                  <Select
                    onChange={(e) => setLowBassNoteOfRange(e.target.value)}
                    id="lowNote"
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
                  marginBottom="2rem"
                  isDisabled={lowBassNoteOfRange === "" || !includeBass}
                >
                  <FormLabel htmlFor="hignNote">High Note</FormLabel>
                  <Select
                    id="highNote"
                    onChange={(e) => setHighBassNoteOfRange(e.target.value)}
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

              <Flex justify="center">
                <Checkbox
                  marginRight="3rem"
                  onChange={() => setIncludeSharps((prevBool) => !prevBool)}
                  isDisabled={!includeBass}
                >
                  Sharps
                </Checkbox>
                <Checkbox
                  onChange={() => setIncludeFlats((prevBool) => !prevBool)}
                  isDisabled={!includeBass}
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
