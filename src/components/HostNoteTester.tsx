import * as React from "react";
import {Staff} from "./Staff";
import {HostControls} from "./HostControls";
import {trebleNotes, bassNotes, clefs} from "../constants";
import {Flex, Button, useDisclosure} from "@chakra-ui/react";
import {Keyboard} from "./Keyboard";
import {useUser} from "reactfire";
import {useHistory, useParams} from "react-router-dom";
import {useSession} from "../hooks";
import {Header} from "./Header";
import styled from "@emotion/styled";
import {Score} from "./Score";
import {SessionCode} from "./SessionCode";
import {KeyboardSettings} from "./KeyboardSettings";
import {IAutoQuiz} from "../interfacesAndTypes";
import {Options} from "./Options";

const Content = styled(Flex)`
  justify-content: space-around;
  margin: 0 auto;
  flex-direction: column;
`;

interface IParams {
  sessionId: string;
}

const HostNoteTester = () => {
  const {sessionId} = useParams<IParams>();
  const history = useHistory();

  const {data} = useUser();
  const {sessionRef, sessionDoc} = useSession(sessionId);

  const {isOpen, onOpen, onClose} = useDisclosure();

  React.useEffect(() => {
    if (sessionDoc && sessionDoc.hostId !== data.uid) {
      history.push("/");
    }
  }, [sessionDoc, history, data.uid]);

  const handleSelectNote = (note: string) => {
    sessionRef.update({selectedNote: note, answer: "", answerStatus: ""});
  };

  const handleLineMnemonic = () => {
    sessionRef.update({
      mnemonics: {
        ...sessionDoc.mnemonics,
        showLinesOnStaff: !sessionDoc.mnemonics.showLinesOnStaff,
      },
    });
  };

  const handleSpaceMnemonic = () => {
    sessionRef.update({
      mnemonics: {
        ...sessionDoc.mnemonics,
        showSpacesOnStaff: !sessionDoc.mnemonics.showSpacesOnStaff,
      },
    });
  };

  const handleDisplayNotes = () => [
    sessionRef.update({displayingNotes: !sessionDoc?.displayingNotes}),
  ];

  const handleSelectClef = (clef: clefs) => {
    sessionRef.update({selectedClef: clef, selectedNote: "", answer: ""});
  };

  const onSubmit = async (
    quizDoc: IAutoQuiz,
    randomNote: string,
    randomClef: string
  ) => {
    try {
      await sessionRef.update({
        autoQuiz: {
          includeSharps: quizDoc.includeSharps,
          includeFlats: quizDoc.includeFlats,
          includeTreble: quizDoc.includeTreble,
          includeBass: quizDoc.includeBass,
          lowTrebleNote: quizDoc.lowTrebleNote,
          highTrebleNote: quizDoc.highTrebleNote,
          lowBassNote: quizDoc.lowBassNote,
          highBassNote: quizDoc.highBassNote,
          on: sessionDoc?.autoQuiz.on ? true : !sessionDoc?.autoQuiz.on,
        },
        selectedNote: randomNote,
        selectedClef: randomClef,
        answer: "",
        answerStatus: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const resetScore = () => {
    sessionRef.update({
      identifiedNotes: 0,
      totalNotes: 0,
      answer: "",
      answerStatus: "",
    });
  };

  const handleAutoQuizButtonClick = () => {
    if (sessionDoc?.autoQuiz.on) {
      sessionRef.update({autoQuiz: {...sessionDoc.autoQuiz, on: false}});
    } else {
      onOpen();
    }
  };

  return (
    <div style={{width: "100vw"}}>
      <Header />
      <Flex
        w="100%"
        h="0"
        justify="space-between"
        align="flex-start"
        padding="1.5rem 1.5rem 0 1.5rem"
        marginBottom="-1.7rem"
      >
        <Flex direction="column" align="flex-start">
          <Button
            onClick={handleAutoQuizButtonClick}
            zIndex="5"
            position="relative"
            margin="1rem 0 0 1rem"
          >
            {sessionDoc?.autoQuiz?.on ? "Stop auto quiz" : "Start auto quiz"}
          </Button>

          <KeyboardSettings
            isOpen={isOpen}
            onClose={onClose}
            selectedNote={sessionDoc?.selectedNote}
            onSubmit={onSubmit}
            submitText="Start"
            currentSettings={sessionDoc?.autoQuiz}
            cancelButton
          />
        </Flex>

        <SessionCode sessionDoc={sessionDoc} />
      </Flex>
      <Content>
        <Flex position="relative">
          <Staff
            selectedNote={sessionDoc?.selectedNote}
            selectedClef={sessionDoc?.selectedClef}
            showLinesOnStaff={sessionDoc?.mnemonics?.showLinesOnStaff}
            showSpacesOnStaff={sessionDoc?.mnemonics?.showSpacesOnStaff}
          />
        </Flex>

        <HostControls
          setSelectedNote={handleSelectNote}
          selectedClef={sessionDoc?.selectedClef}
          setSelectedClef={handleSelectClef}
        >
          <Flex direction="column" align="stretch">
            <Options
              setShowLinesOnStaff={handleLineMnemonic}
              setShowSpacesOnStaff={handleSpaceMnemonic}
              setDisplayingNotes={handleDisplayNotes}
              displayingNotes={sessionDoc?.displayingNotes}
              showLinesOnStaff={sessionDoc?.mnemonics?.showLinesOnStaff}
              showSpacesOnStaff={sessionDoc?.mnemonics?.showSpacesOnStaff}
            />
            <Score
              reset={resetScore}
              canControl
              identifiedNotes={sessionDoc?.identifiedNotes}
              totalNotes={sessionDoc?.totalNotes}
            />
          </Flex>
        </HostControls>

        <Keyboard
          notes={
            sessionDoc?.selectedClef === clefs.TREBLE
              ? Object.keys(trebleNotes)
              : Object.keys(bassNotes)
          }
          selectedClef={sessionDoc?.selectedClef}
          setSelectedNote={handleSelectNote}
          isGuestKeyboard={false}
          selectedNote={sessionDoc?.selectedNote}
          displayingNotes={sessionDoc?.displayingNotes}
          answer={sessionDoc?.answer}
          answerStatus={sessionDoc?.answerStatus}
        />
      </Content>
    </div>
  );
};

export {HostNoteTester};
