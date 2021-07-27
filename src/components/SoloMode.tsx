import * as React from "react";
import Staff from "./Staff";
import Keyboard from "./Keyboard";
import Header from "./Header";
import SoloScore from "./SoloScore";
import {answerStatusOptions, bassNotes, clefs, trebleNotes} from "../constants";
import {useDisclosure, Button, Heading, Flex} from "@chakra-ui/react";
import AutoQuiz from "./AutoQuiz";
import {IAutoQuiz, IUser} from "../interfacesAndTypes";
import {useUser, useFirestore, useFirestoreDocData} from "reactfire";
import {getRandomNote} from "../helpers";
import HelperButtons from "./HelperButtons";

const SoloMode = () => {
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
      const result = getRandomNote(userDoc?.soloSettings, "");
      if (result) {
        setSelectedClef(result.randomClef);
        setSelectedNote(result.randomNote);
      }
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
    let nextNote;

    if (note[1] === "s") {
      if (notes.indexOf(note[0] + note[2]) !== notes.length - 1) {
        nextNote = notes[notes.indexOf(note[0] + note[2]) + 1];
      }
    } else {
      if (notes.indexOf(note) !== notes.length - 1) {
        nextNote = notes[notes.indexOf(note) + 1];
      }
    }

    if (note === selectedNote) {
      setTotal((prevTotal) => prevTotal + 1);
      setCorrect((prevCorrect) => prevCorrect + 1);
      return setAnswerStatus(answerStatusOptions.CORRECT);
    } else if (note[1] === "s") {
      if (nextNote && nextNote[0] + "b" + nextNote[1] === selectedNote) {
        setTotal((prevTotal) => prevTotal + 1);
        setCorrect((prevCorrect) => prevCorrect + 1);
        return setAnswerStatus(answerStatusOptions.CORRECT);
      }
    } else if (note[0] === "E" || note[0] === "B") {
      if (nextNote && nextNote[0] + "b" + nextNote[1] === selectedNote) {
        setTotal((prevTotal) => prevTotal + 1);
        setCorrect((prevCorrect) => prevCorrect + 1);
        return setAnswerStatus(answerStatusOptions.CORRECT);
      }
    } else if (note[0] === "C" || note[0] === "F") {
      if (notes.indexOf(note) > 0) {
        const prevNote = notes[notes.indexOf(note) - 1];
        if (prevNote[0] + "s" + prevNote[1] === selectedNote) {
          setTotal((prevTotal) => prevTotal + 1);
          setCorrect((prevCorrect) => prevCorrect + 1);
          return setAnswerStatus(answerStatusOptions.CORRECT);
        }
      }
    }
    setTotal((prevTotal) => prevTotal + 1);
    setAnswerStatus(answerStatusOptions.INCORRECT);
  };

  const handleSelectNote = (note: string) => {
    const result = getRandomNote(userDoc?.soloSettings, selectedNote);
    if (!result) {
      const err = new Error();
      throw err;
    }
    setAnswer(note);

    handleAnswer(note);

    setTimeout(() => {
      setSelectedNote(result.randomNote);
      setSelectedClef(result.randomClef);
      setAnswer("");
      setAnswerStatus("");
    }, 1000);
  };

  return (
    <>
      <Header />

      <Flex
        position="relative"
        height="0"
        w="90%"
        margin="1rem auto"
        justify="space-between"
      >
        <SoloScore
          total={total}
          setTotal={setTotal}
          correct={correct}
          setCorrect={setCorrect}
        />
        <Button onClick={onOpen}>Settings</Button>
      </Flex>

      <Staff
        selectedClef={selectedClef}
        selectedNote={selectedNote}
        showLinesOnStaff={showLinesOnStaff}
        showSpacesOnStaff={showSpacesOnStaff}
      />
      <Flex
        marginBottom="1rem"
        justify="space-between"
        w="90%"
        margin="0 auto"
        maxWidth="var(--max-width)"
        marginTop={{base: "-6rem", md: "-.5rem"}}
      >
        <HelperButtons
          displayingNotes={displayingNotes}
          showLinesOnStaff={showLinesOnStaff}
          setDisplayingNotes={() => setDisplayingNotes((prevBool) => !prevBool)}
          setShowLinesOnStaff={() =>
            setShowLinesOnStaff((prevBool) => !prevBool)
          }
          setShowSpacesOnStaff={() =>
            setShowSpacesOnStaff((prevBool) => !prevBool)
          }
          showSpacesOnStaff={showSpacesOnStaff}
        />
        <Heading as="h2" marginRight="1rem" alignSelf="flex-end">
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
      <AutoQuiz
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

export default SoloMode;
