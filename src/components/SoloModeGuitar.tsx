import * as React from "react";
import {Staff} from "./Staff";
import {Header} from "./Header";
import {Score} from "./Score";
import {
  answerStatusOptions,
  clefs,
  trebleNotes,
  lineHeightInt,
} from "../constants";
import {useDisclosure, Button, Heading, Flex, Box} from "@chakra-ui/react";
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

  const determineArrowPosition = () => {
    switch (selectedString) {
      case 1:
        return lineHeightInt * 6.2 + "rem";
      case 2:
        return lineHeightInt * 5 + "rem";
      case 3:
        return lineHeightInt * 3.8 + "rem";
      case 4:
        return lineHeightInt * 2.6 + "rem";
      case 5:
        return lineHeightInt * 1.4 + "rem";
      case 6:
        return lineHeightInt * 0.2 + "rem";
      default:
        return lineHeightInt * 0.2 + "rem";
    }
  };

  return (
    <>
      <Header />

      <Flex
        position="absolute"
        margin="1.5rem auto -1rem auto"
        justify="space-between"
        padding="0 2rem"
        direction="column"
      >
        <Button
          onClick={onOpen}
          marginBottom="1rem"
          position="relative"
          zIndex="20"
        >
          Settings
        </Button>
        <Button
          w="8rem"
          position="relative"
          zIndex="20"
          onClick={() => history.push("/solo-mode/keyboard")}
        >
          Keyboard &rarr;
        </Button>
      </Flex>
      <Flex direction="column" position="relative">
        <Staff
          selectedClef={clefs.TREBLE}
          selectedNote={selectedNote}
          showLinesOnStaff={showLinesOnStaff}
          showSpacesOnStaff={showSpacesOnStaff}
        />
        <Flex
          w="90%"
          position="absolute"
          bottom="8rem"
          justify="flex-start"
          fontSize={{base: "1.3rem", md: "2rem"}}
          fontWeight="700"
          marginLeft={{base: "9rem", sm: "10rem", md: "15rem"}}
        >{`String ${selectedString}`}</Flex>
      </Flex>

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
          />

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
          {!answer
            ? null
            : answerStatus === answerStatusOptions.CORRECT
            ? "Correct!"
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
        />
        <Box
          position="absolute"
          fontSize="5rem"
          fontWeight="900"
          bottom={determineArrowPosition()}
          zIndex="5"
          color="var(--main-color-very-dark)"
        >
          &rarr;
        </Box>
      </Box>

      <GuitarSettings
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={updateSettings}
        selectedNote={selectedNote}
        currentSettings={userDoc?.guitarSettings}
        fretNumber={fretNumber}
      />
    </>
  );
};

export {SoloModeGuitar};
