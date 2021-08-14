import * as React from "react";
import {Staff} from "./Staff";
import {Header} from "./Header";
import {Score} from "./Score";
import {answerStatusOptions, clefs, trebleNotes} from "../constants";
import {
  useDisclosure,
  Button,
  Heading,
  Flex,
  Box,
  MenuItem,
} from "@chakra-ui/react";
import {IGuitarSettings, IUser, IGuitarNote} from "../interfacesAndTypes";
import {useUser, useFirestore, useFirestoreDocData} from "reactfire";
import {checkAnswer, getRandomGuitarNote} from "../helpers";
import {Options} from "./Options";
import {Guitar} from "./Guitar";
import {useHistory} from "react-router-dom";
import {GuitarSettings} from "./GuitarSettings";

const SoloModeGuitar = () => {
  const [answer, setAnswer] = React.useState("");
  const [selectedNote, setSelectedNote] = React.useState("");
  const [selectedString, setSelectedString] = React.useState(1);
  const [showLinesOnStaff, setShowLinesOnStaff] = React.useState(false);
  const [showSpacesOnStaff, setShowSpacesOnStaff] = React.useState(false);
  const [answerStatus, setAnswerStatus] = React.useState("");
  const [displayingNotes, setDisplayingNotes] = React.useState(false);
  const [displayingFretNumbers, setDisplayingFretNumbers] =
    React.useState(false);

  const [total, setTotal] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);

  const history = useHistory();

  const {isOpen, onOpen, onClose} = useDisclosure();

  const {data} = useUser();

  const userRef = useFirestore().collection("users").doc(data?.uid);

  const userDoc = useFirestoreDocData<IUser>(userRef).data;

  const notes = Object.keys(trebleNotes);

  const fretNumber = 13;

  React.useEffect(() => {
    if (userDoc) {
      try {
        const randomNote = getRandomGuitarNote(userDoc?.guitarSettings, "");
        setSelectedNote(randomNote.name);
        setSelectedString(randomNote.stringNumber);
      } catch (err) {
        console.log(err);
      }
    }
  }, [userDoc?.guitarSettings, userDoc]);

  // will be used in the settings modal
  const updateSettings = async (
    guitarSettingsObject: IGuitarSettings,
    selectedNote: IGuitarNote
  ) => {
    setSelectedNote(selectedNote.name);
    setSelectedString(selectedNote.stringNumber);
    try {
      await userRef.update({guitarSettings: guitarSettingsObject});
    } catch (err) {
      console.log(err);
    }
  };

  const handleAnswer = (note: IGuitarNote) => {
    const answerIsCorrect =
      checkAnswer(note.name, notes, selectedNote) &&
      note.stringNumber === selectedString;

    setTotal((prevTotal) => prevTotal + 1);
    if (answerIsCorrect) {
      setAnswerStatus(answerStatusOptions.CORRECT);
      setCorrect((prevCorrect) => prevCorrect + 1);
    } else {
      setAnswerStatus(answerStatusOptions.INCORRECT);
    }
  };

  const handleSelectNote = (note: IGuitarNote) => {
    try {
      const randomNote = getRandomGuitarNote(
        userDoc?.guitarSettings,
        selectedNote
      );
      setAnswer(note.name);

      handleAnswer(note);

      setTimeout(() => {
        setSelectedNote(randomNote.name);
        setSelectedString(randomNote.stringNumber);
        setAnswer("");
        setAnswerStatus("");
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const resetScore = () => {
    setTotal(0);
    setCorrect(0);
  };

  const noteRange =
    userDoc?.guitarSettings.highFret - userDoc?.guitarSettings.lowFret;

  const noteRangeAllowsDuplicates = noteRange > 3;

  return (
    <Flex
      maxWidth="100vw"
      direction="column"
      overflowX="hidden"
      position="relative"
    >
      <Header />

      <Flex
        position="relative"
        h="0"
        margin="1.5rem 0 -1rem 0"
        padding="0 2rem"
        direction="column"
        bg="green"
      >
        <Button
          onClick={onOpen}
          marginBottom="1rem"
          position="relative"
          zIndex="20"
          minHeight="2.5rem"
          w="8rem"
        >
          Settings
        </Button>
        <Button
          position="relative"
          zIndex="20"
          onClick={() => history.push("/solo-mode/keyboard")}
          minHeight="2.5rem"
          w="8rem"
        >
          Keyboard &rarr;
        </Button>
      </Flex>
      {/* <Flex direction="column" position="relative"> */}
      <Staff
        selectedClef={clefs.TREBLE}
        selectedNote={selectedNote}
        showLinesOnStaff={showLinesOnStaff}
        showSpacesOnStaff={showSpacesOnStaff}
      />
      {/* <Flex
          w="90%"
          position="absolute"
          bottom="8rem"
          justify="flex-start"
          fontSize={{base: "1.3rem", md: "2rem"}}
          fontWeight="700"
          marginLeft={{base: "9rem", sm: "10rem", md: "15rem"}}
        >{`String ${selectedString}`}</Flex> */}
      {/* </Flex> */}

      <Flex w="100%" justify="space-between" position="relative">
        <Flex
          marginBottom="1rem"
          marginLeft="5%"
          direction="column"
          marginTop={{base: "-4.5rem", md: "-4.5rem"}}
        >
          <Options
            displayingNotes={displayingNotes}
            showLinesOnStaff={showLinesOnStaff}
            setDisplayingNotes={setDisplayingNotes}
            setShowLinesOnStaff={setShowLinesOnStaff}
            setShowSpacesOnStaff={setShowSpacesOnStaff}
            showSpacesOnStaff={showSpacesOnStaff}
          >
            <MenuItem
              onClick={() => setDisplayingFretNumbers((prevBool) => !prevBool)}
            >
              {displayingFretNumbers ? (
                <span style={{width: "2.5rem"}}>&#10003;</span>
              ) : (
                <span style={{width: "2.5rem"}}></span>
              )}{" "}
              Fret Numbers
            </MenuItem>
          </Options>

          <Score
            totalNotes={total}
            reset={resetScore}
            identifiedNotes={correct}
            canControl
          />
        </Flex>
        <Heading
          as="h2"
          marginRight="1rem"
          alignSelf="flex-end"
          position="absolute"
          fontSize={{base: "1.5rem", md: "2rem"}}
          right={{base: "0", md: "5%"}}
          bottom={{base: "0", md: "1rem"}}
        >
          {!answerStatus
            ? null
            : answerStatus === answerStatusOptions.CORRECT
            ? "Correct!"
            : answerStatus === answerStatusOptions.OUT_OF_RANGE
            ? "Out of range"
            : answerStatus === answerStatusOptions.WRONG_STRING
            ? "Wrong string"
            : "Incorrect :("}
        </Heading>
      </Flex>
      <Box position="relative">
        <Guitar
          answer={answer}
          answerStatus={answerStatus}
          displayingNotes={displayingNotes}
          selectedNote={selectedNote}
          handleSelectNote={handleSelectNote}
          fretNumber={fretNumber}
          selectedString={selectedString}
          displayingFretNumbers={displayingFretNumbers}
          noteRangeAllowsDuplicates={noteRangeAllowsDuplicates}
          setAnswerStatus={setAnswerStatus}
        />
      </Box>

      <GuitarSettings
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={updateSettings}
        selectedNote={selectedNote}
        currentSettings={userDoc?.guitarSettings}
        fretNumber={fretNumber}
      />
    </Flex>
  );
};

export {SoloModeGuitar};
