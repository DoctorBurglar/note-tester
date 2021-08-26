import * as React from "react";
import {Staff} from "./Staff";
import {Keyboard} from "./Keyboard";
import {Header} from "./Header";
import {Score} from "./Score";
import {answerStatusOptions, bassNotes, clefs, trebleNotes} from "../constants";
import {useDisclosure} from "@chakra-ui/react";
import {KeyboardSettings} from "./KeyboardSettings";
import {IAutoQuiz, IUser} from "../interfacesAndTypes";
import {useUser, useFirestore, useFirestoreDocData} from "reactfire";
import {checkAnswer, getRandomKeyboardNoteAndClef} from "../helpers";
import {Options} from "./Options";
import {AnswerStatusDisplay} from "./AnswerStatusDisplay";
import {InstrumentSwitchButton} from "./InstrumentSwitchButton";
import {SettingsButton} from "./SettingsButton";
import {ButtonsBox} from "./ButtonsBox";
import {SoloModeScoreAndOptionsBox} from "./SoloModeScoreAndOptionsBox";
import {SoloModeAboveKeyboardDisplayBox} from "./SoloModeAboveKeyboardDisplayBox";

const SoloModeKeyboard = () => {
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
    if (
      userDoc &&
      // only run this if the document has set at least one clef before
      (userDoc.soloSettings.includeTreble || userDoc.soloSettings.includeBass)
    ) {
      const {randomNote, randomClef} = getRandomKeyboardNoteAndClef(
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
    const {randomNote, randomClef} = getRandomKeyboardNoteAndClef(
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

      <ButtonsBox>
        <SettingsButton onOpen={onOpen} />
        <InstrumentSwitchButton target="guitar">Guitar</InstrumentSwitchButton>
      </ButtonsBox>

      <Staff
        selectedClef={selectedClef}
        selectedNote={selectedNote}
        showLinesOnStaff={showLinesOnStaff}
        showSpacesOnStaff={showSpacesOnStaff}
      />
      <SoloModeAboveKeyboardDisplayBox>
        <SoloModeScoreAndOptionsBox>
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
        </SoloModeScoreAndOptionsBox>
        <AnswerStatusDisplay answer={answer} answerStatus={answerStatus} />
      </SoloModeAboveKeyboardDisplayBox>

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

      <KeyboardSettings
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

export {SoloModeKeyboard};
