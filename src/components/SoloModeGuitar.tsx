import * as React from "react";
import Staff from "./Staff";
import Header from "./Header";
import GuestScore from "./GuestScore";
import {answerStatusOptions, clefs, trebleNotes} from "../constants";
import {useDisclosure, Button, Heading, Flex} from "@chakra-ui/react";
import {IGuitarSettings, IUser} from "../interfacesAndTypes";
import {useUser, useFirestore, useFirestoreDocData} from "reactfire";
import {checkAnswer, getRandomGuitarNote} from "../helpers";
import {Options} from "./Options";
import {Guitar} from "./Guitar";
import {useHistory} from "react-router-dom";
import {GuitarSettings} from "./GuitarSettings";

const SoloModeGuitar: React.FC = () => {
  const [answer, setAnswer] = React.useState("");
  const [selectedNote, setSelectedNote] = React.useState("");
  const [showLinesOnStaff, setShowLinesOnStaff] = React.useState(false);
  const [showSpacesOnStaff, setShowSpacesOnStaff] = React.useState(false);
  const [answerStatus, setAnswerStatus] = React.useState("");
  const [displayingNotes, setDisplayingNotes] = React.useState(false);

  const [total, setTotal] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);

  // const [fretMap, setFretMap] = React.useState<IFretMap | null>(null);

  const history = useHistory();

  const {isOpen, onOpen, onClose} = useDisclosure();

  const {data} = useUser();

  const userRef = useFirestore().collection("users").doc(data?.uid);

  const userDoc = useFirestoreDocData<IUser>(userRef).data;

  const notes = Object.keys(trebleNotes);

  const fretNumber = 13;

  // const standardTuning = ["E5", "B4", "G4", "D4", "A3", "E3"];

  // const createGuitarFromOpenStrings = (
  //   openStrings: string[],
  //   toFret: number
  // ) => {
  //   const noteOrder = ["A", "B", "C", "D", "E", "F", "G", "A"];
  //   const guitarStringArray: string[][] = [];
  //   openStrings.forEach((openString, ind) => {
  //     let currentNote = openString;
  //     const currentStringArray = [];
  //     for (let i = 0; i <= toFret; i++) {
  //       currentStringArray.push(currentNote);
  //       let letter = currentNote[0];
  //       let octave;
  //       if (letter === "B" || letter === "E") {
  //         if (letter === "B") {
  //           octave = +currentNote[1] + 1;
  //         } else {
  //           octave = currentNote[1];
  //         }
  //         currentNote = noteOrder[noteOrder.indexOf(letter) + 1] + octave;
  //       } else if (currentNote[1] === "s") {
  //         octave = currentNote[2];
  //         currentNote = noteOrder[noteOrder.indexOf(letter) + 1] + octave;
  //       } else {
  //         octave = currentNote[1];
  //         currentNote = letter + "s" + octave;
  //       }
  //     }
  //     guitarStringArray.push(currentStringArray);
  //   });
  //   return guitarStringArray;
  // };

  // const constructedStrings = createGuitarFromOpenStrings(
  //   standardTuning,
  //   fretNumber
  // );

  // React.useEffect(() => {
  //   // this is an object that contains an array for each note that shows all possible frets that note can be played on
  //   const newFretMap: IFretMap = {};

  //   constructedStrings.forEach((string) => {
  //     string.forEach((note, ind) => {
  //       if (!newFretMap[note]) {
  //         newFretMap[note] = [ind];
  //       } else {
  //         newFretMap[note] = [...newFretMap[note], ind];
  //       }
  //     });
  //   });
  //   if (fretMap === null) {
  //     setFretMap(newFretMap);
  //   }

  //   console.log(fretMap);
  // }, [constructedStrings, fretMap]);

  //   React.useEffect(() => {
  //     // for this component the "on" field only determines if the settings have ever been set"
  //     if (userDoc && !userDoc.guitarSettings) {
  //       onOpen();
  //     }
  //   }, [onOpen, userDoc?.soloSettings.on, userDoc]);

  React.useEffect(() => {
    if (userDoc) {
      try {
        const randomNote = getRandomGuitarNote(userDoc?.guitarSettings, "");
        setSelectedNote(randomNote);
      } catch (err) {
        console.log(err);
      }
    }
  }, [userDoc?.guitarSettings, userDoc]);

  // will be used in the settings modal
  const updateSettings = async (
    guitarSettingsObject: IGuitarSettings,
    selectedNote: string
  ) => {
    setSelectedNote(selectedNote);
    try {
      await userRef.update({guitarSettings: guitarSettingsObject});
    } catch (err) {
      console.log(err);
    }
  };

  const handleAnswer = (note: string) => {
    const answerIsCorrect = checkAnswer(note, notes, selectedNote);

    setTotal((prevTotal) => prevTotal + 1);
    if (answerIsCorrect) {
      setAnswerStatus(answerStatusOptions.CORRECT);
      setCorrect((prevCorrect) => prevCorrect + 1);
    } else {
      setAnswerStatus(answerStatusOptions.INCORRECT);
    }
  };

  const handleSelectNote = (note: string) => {
    try {
      const randomNote = getRandomGuitarNote(
        userDoc?.guitarSettings,
        selectedNote
      );
      setAnswer(note);

      handleAnswer(note);

      setTimeout(() => {
        setSelectedNote(randomNote);
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

      <Staff
        selectedClef={clefs.TREBLE}
        selectedNote={selectedNote}
        showLinesOnStaff={showLinesOnStaff}
        showSpacesOnStaff={showSpacesOnStaff}
      />
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

          <GuestScore
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

      <Guitar
        answer={answer}
        answerStatus={answerStatus}
        displayingNotes={displayingNotes}
        selectedNote={selectedNote}
        setSelectedNote={handleSelectNote}
        fretNumber={fretNumber}
      />

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

export default SoloModeGuitar;
