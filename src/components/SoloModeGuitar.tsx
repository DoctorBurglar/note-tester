import * as React from "react";
import {Staff} from "./Staff";
import {Header} from "./Header";
import {Score} from "./Score";
import {answerStatusOptions, clefs, trebleNotes} from "../constants";
import {useDisclosure, Flex, MenuItem} from "@chakra-ui/react";
import {IGuitarSettings, IUser, IGuitarNote} from "../interfacesAndTypes";
import {useUser, useFirestore, useFirestoreDocData} from "reactfire";
import {checkAnswer, getRandomGuitarNote} from "../helpers";
import {Options} from "./Options";
import {Guitar} from "./Guitar";
import {GuitarSettings} from "./GuitarSettings";
import {SelectedGuitarString} from "./SelectedGuitarString";
import {InstrumentSwitchButton} from "./InstrumentSwitchButton";
import {SettingsButton} from "./SettingsButton";
import {ButtonsBox} from "./ButtonsBox";
import {SoloModeAboveKeyboardDisplayBox} from "./SoloModeAboveKeyboardDisplayBox";
import {SoloModeScoreAndOptionsBox} from "./SoloModeScoreAndOptionsBox";
import {AnswerStatusDisplay} from "./AnswerStatusDisplay";

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

  const {isOpen, onOpen, onClose} = useDisclosure();

  const {data} = useUser();

  const userRef = useFirestore().collection("users").doc(data?.uid);

  const userDoc = useFirestoreDocData<IUser>(userRef).data;

  const notes = Object.keys(trebleNotes);

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

      <ButtonsBox>
        <SettingsButton onOpen={onOpen} />
        <InstrumentSwitchButton target="keyboard">
          Keyboard
        </InstrumentSwitchButton>
      </ButtonsBox>

      <Flex direction="column" position="relative">
        <Staff
          selectedClef={clefs.TREBLE}
          selectedNote={selectedNote}
          showLinesOnStaff={showLinesOnStaff}
          showSpacesOnStaff={showSpacesOnStaff}
        />
        <SelectedGuitarString
          noteRangeAllowsDuplicates={noteRangeAllowsDuplicates}
          selectedString={selectedString}
        />
      </Flex>

      <SoloModeAboveKeyboardDisplayBox>
        <SoloModeScoreAndOptionsBox>
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
        </SoloModeScoreAndOptionsBox>

        <AnswerStatusDisplay answer={answer} answerStatus={answerStatus} />
      </SoloModeAboveKeyboardDisplayBox>

      <Guitar
        answer={answer}
        answerStatus={answerStatus}
        displayingNotes={displayingNotes}
        selectedNote={selectedNote}
        handleSelectNote={handleSelectNote}
        selectedString={selectedString}
        displayingFretNumbers={displayingFretNumbers}
        noteRangeAllowsDuplicates={noteRangeAllowsDuplicates}
        setAnswerStatus={setAnswerStatus}
      />

      <GuitarSettings
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={updateSettings}
        selectedNote={selectedNote}
        currentSettings={userDoc?.guitarSettings}
      />
    </Flex>
  );
};

export {SoloModeGuitar};
