import * as React from "react";
import Staff from "./Staff";
import Keyboard from "./Keyboard";
import Header from "./Header";
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

  const {isOpen, onOpen, onClose} = useDisclosure();

  const {data} = useUser();

  const userRef = useFirestore().collection("users").doc(data.uid);

  const userDoc = useFirestoreDocData<IUser>(userRef).data;

  const notes =
    selectedClef === clefs.TREBLE
      ? Object.keys(trebleNotes)
      : Object.keys(bassNotes);

  React.useEffect(() => {
    // for this component the "on" field only determines if the settings have ever been set"
    if (!userDoc?.soloSettings.on) {
      onOpen();
    }
  }, [onOpen, userDoc?.soloSettings.on]);

  React.useEffect(() => {
    if (userDoc) {
      const result = getRandomNote(userDoc?.soloSettings, "");
      if (result) {
        setSelectedClef(result.randomClef);
        setSelectedNote(result.randomNote);
      }
    }
  }, [userDoc?.soloSettings, userDoc]);

  React.useEffect(() => {
    if (answer === "") {
      return;
    }
    let nextNote;

    if (answer[1] === "s") {
      if (notes.indexOf(answer[0] + answer[2]) !== notes.length - 1) {
        nextNote = notes[notes.indexOf(answer[0] + answer[2]) + 1];
      }
    } else {
      if (notes.indexOf(answer) !== notes.length - 1) {
        nextNote = notes[notes.indexOf(answer) + 1];
      }
    }

    if (answer === selectedNote) {
      return setAnswerStatus(answerStatusOptions.CORRECT);
    } else if (answer[1] === "s") {
      if (nextNote && nextNote[0] + "b" + nextNote[1] === selectedNote) {
        return setAnswerStatus(answerStatusOptions.CORRECT);
      }
    } else if (answer[0] === "E" || answer[0] === "B") {
      if (nextNote && nextNote[0] + "b" + nextNote[1] === selectedNote) {
        return setAnswerStatus(answerStatusOptions.CORRECT);
      }
    } else if (answer[0] === "C" || answer[0] === "F") {
      if (notes.indexOf(answer) > 0) {
        const prevNote = notes[notes.indexOf(answer) - 1];
        if (prevNote[0] + "s" + prevNote[1] === selectedNote) {
          return setAnswerStatus(answerStatusOptions.CORRECT);
        }
      }
    }
    return setAnswerStatus(answerStatusOptions.INCORRECT);
  }, [answer, selectedNote, notes]);

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

  const handleSelectNote = (note: string) => {
    const result = getRandomNote(userDoc?.soloSettings, selectedNote);
    if (!result) {
      const err = new Error();
      throw err;
    }
    console.log(note);
    setAnswer(note);

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
        margin="0 auto"
        justify="space-between"
      >
        <Button onClick={onOpen} margin="1rem 0">
          Settings
        </Button>
      </Flex>

      <Staff
        selectedClef={selectedClef}
        selectedNote={selectedNote}
        showLinesOnStaff={showLinesOnStaff}
        showSpacesOnStaff={showSpacesOnStaff}
      />
      <Flex
        marginBottom=".3rem"
        justify="space-between"
        w="100%"
        margin="0 auto"
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
        <Heading as="h2" marginRight="2rem">
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
        selectedNote={selectedNote}
      />
    </>
  );
};

export default SoloMode;
