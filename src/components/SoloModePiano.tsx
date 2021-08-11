import * as React from "react";
import {Staff} from "./Staff";
import {Keyboard} from "./Keyboard";
import {Header} from "./Header";
import {Score} from "./Score";
import {answerStatusOptions, bassNotes, clefs, trebleNotes} from "../constants";
import {useDisclosure, Button, Heading, Flex} from "@chakra-ui/react";
import {PianoSettings} from "./PianoSettings";
import {IAutoQuiz, IUser} from "../interfacesAndTypes";
import {useUser, useFirestore, useFirestoreDocData} from "reactfire";
import {checkAnswer, getRandomPianoNoteAndClef} from "../helpers";
import {Options} from "./Options";
import {useHistory} from "react-router-dom";

const SoloModePiano = () => {
  const [answer, setAnswer] = React.useState("");
  const [selectedClef, setSelectedClef] = React.useState<clefs | string>(
    clefs.TREBLE
  );
  const [selectedNote, setSelectedNote] = React.useState("");
  const [showLinesOnStaff, setShowLinesOnStaff] = React.useState(false);
  const [showSpacesOnStaff, setShowSpacesOnStaff] = React.useState(false);
  const [answerStatus, setAnswerStatus] = React.useState("");
  const [displayingNotes, setDisplayingNotes] = React.useState(false);

  const [total, setTotal] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);

  const {isOpen, onOpen, onClose} = useDisclosure();

  const history = useHistory();

  const {data} = useUser();

  const userRef = useFirestore().collection("users").doc(data?.uid);

  const userDoc = useFirestoreDocData<IUser>(userRef).data;

  const notes =
    selectedClef === clefs.TREBLE
      ? Object.keys(trebleNotes)
      : Object.keys(bassNotes);

  React.useEffect(() => {
    // for this component the "on" field only determines if the settings have ever been set"
    if (userDoc && !userDoc.soloSettings.on) {
      onOpen();
    }
  }, [onOpen, userDoc?.soloSettings.on, userDoc]);

  React.useEffect(() => {
    if (
      userDoc &&
      // only run this if the document has set at least one clef before
      (userDoc.soloSettings.includeTreble || userDoc.soloSettings.includeBass)
    ) {
      const {randomNote, randomClef} = getRandomPianoNoteAndClef(
        userDoc?.soloSettings,
        ""
      );

      setSelectedClef(randomClef);
      setSelectedNote(randomNote);
    }
  }, [userDoc?.soloSettings, userDoc]);

  const updateSettings = async (
    autoDoc: IAutoQuiz,
    selectedNote: string,
    selectedClef: clefs
  ) => {
    setSelectedNote(selectedNote);
    setSelectedClef(selectedClef);
    try {
      await userRef.update({soloSettings: autoDoc});
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
    const {randomNote, randomClef} = getRandomPianoNoteAndClef(
      userDoc?.soloSettings,
      selectedNote
    );
    setAnswer(note);

    handleAnswer(note);

    setTimeout(() => {
      setSelectedNote(randomNote);
      setSelectedClef(randomClef);
      setAnswer("");
      setAnswerStatus("");
    }, 1000);
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
          position="relative"
          zIndex="20"
          w="8rem"
          onClick={() => history.push("/solo-mode/guitar")}
        >
          Guitar &rarr;
        </Button>
      </Flex>

      <Staff
        selectedClef={selectedClef}
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

      <Keyboard
        answer={answer}
        answerStatus={answerStatus}
        displayingNotes={displayingNotes}
        isGuestKeyboard
        notes={
          selectedClef === clefs.TREBLE
            ? Object.keys(trebleNotes)
            : Object.keys(bassNotes)
        }
        selectedClef={selectedClef}
        selectedNote={selectedNote}
        setSelectedNote={handleSelectNote}
      />

      <PianoSettings
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={updateSettings}
        submitText="Save"
        selectedNote={selectedNote}
        currentSettings={userDoc?.soloSettings}
      />
    </>
  );
};

export {SoloModePiano};
