import * as React from "react";
import {Button, Flex, Input, Heading} from "@chakra-ui/react";
import {useHistory} from "react-router-dom";
import {useFirestore, useUser, useFirestoreDocData} from "reactfire";
import {Header} from "./Header";
import styled from "@emotion/styled";
import {clefs} from "../constants";
import {SessionType} from "./SessionType";

const SessionButton = styled(Button)`
  margin-top: 1rem;
  background-color: var(--main-color);
  border: 1px solid black;
  border-radius: 5px;
  padding: 1.3rem 5rem;
  font-size: 1.5rem;
  height: 3rem;
`;

interface IUser {
  uid: string;
  email: string;
  hostSessionId: string;
  displayName: string;
  photoURL: string;
}

const Sessions: React.FC = () => {
  const [sessionCodeInput, setSessionCodeInput] = React.useState("");

  const [errorMessage, setErrorMessage] = React.useState("");

  const {data} = useUser();

  const history = useHistory();

  const sessionsRef = useFirestore().collection("sessions");

  const userRef = useFirestore().collection("users").doc(data.uid);
  const userDoc = useFirestoreDocData<IUser>(userRef).data;

  const createSessionCode = async (number: number) => {
    const charArray = [];
    const newSessionIdArray = [];
    for (let i = 48; i <= 57; i++) {
      charArray.push(String.fromCharCode(i));
    }
    for (let i = 65; i <= 90; i++) {
      charArray.push(String.fromCharCode(i));
    }
    for (let i = 0; i < number; i++) {
      newSessionIdArray.push(
        charArray[Math.floor(Math.random() * charArray.length)]
      );
    }
    const newCode = newSessionIdArray.join("");
    try {
      const sessionsQuery = sessionsRef.where("sessionCode", "==", newCode);
      const sessionsWithThatCode = await sessionsQuery.get();
      if (sessionsWithThatCode.docs.length === 0) {
        return newCode;
      }
      return;
    } catch (err) {
      console.log(err);
    }
  };

  const createBatch = useFirestore().batch();

  const handleCreateSession = async () => {
    setErrorMessage("");
    let oldSessionId;
    if (userDoc?.hostSessionId !== "") {
      oldSessionId = userDoc?.hostSessionId;
    }

    if (oldSessionId) {
      createBatch.delete(sessionsRef.doc(oldSessionId));
    }

    try {
      const newSessionCode = await createSessionCode(6);

      if (!newSessionCode) {
        setErrorMessage("please try again, something went wrong");
        return;
      }

      const newSessionRef = sessionsRef.doc();

      createBatch.set(newSessionRef, {
        answer: "",
        answerStatus: "",
        displayingNotes: false,
        sessionCode: newSessionCode,
        hostId: data.uid,
        guestId: "",
        identifiedNotes: 0,
        totalNotes: 0,
        selectedNote: "",
        selectedClef: clefs.TREBLE,
        mnemonics: {
          showLinesOnStaff: false,
          showSpacesOnStaff: false,
        },
        autoQuiz: {
          on: false,
          lowTrebleNote: "",
          highTrebleNote: "",
          lowBassNote: "",
          highBassNote: "",
          includeSharps: false,
          includeFlats: false,
          includeTreble: false,
          includeBass: false,
        },
      });

      createBatch.update(userRef, {hostSessionId: newSessionRef.id});

      await createBatch.commit();

      history.push(`/hosted-session/${newSessionRef.id}`);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const joinBatch = useFirestore().batch();

  const handleJoinSession = async () => {
    setErrorMessage("");
    try {
      const sessionToJoin = await sessionsRef
        .where("sessionCode", "==", sessionCodeInput.toUpperCase())
        .get();

      if (sessionToJoin.docs.length > 0) {
        const sessionToJoinId = sessionToJoin.docs[0].id;

        joinBatch.update(sessionsRef.doc(sessionToJoinId), {guestId: data.uid});
        joinBatch.update(userRef, {guestSessionId: sessionToJoinId});
        await joinBatch.commit();
        history.push(`/guest-session/${sessionToJoinId}`);
      } else {
        setErrorMessage("Please enter a valid code.");
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleSessionCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSessionCodeInput(e.target.value);
  };

  const startSoloSession = () => {
    history.push("/solo-mode/keyboard");
  };

  return (
    <Flex width="100%" direction="column" align="center" position="relative">
      <Header />
      <Heading as="h6" color="red" size="md" padding="1rem">
        {errorMessage}
      </Heading>
      <Flex w="95%" justify="center" flexWrap="wrap" maxWidth="120rem">
        <SessionType
          title="Solo"
          description="Test your knowledge of notes in bass and/or treble clef."
        >
          <SessionButton onClick={startSoloSession} bg="purple">
            Solo Session
          </SessionButton>
        </SessionType>

        <SessionType
          title="Host"
          description="Host a session that a student can join."
        >
          <SessionButton onClick={handleCreateSession} bg="purple">
            Host Session
          </SessionButton>
        </SessionType>

        <SessionType title="Join" description="Enter a code to join a session.">
          <Input
            value={sessionCodeInput}
            placeholder="Session Code"
            onChange={handleSessionCodeInput}
          />
          <SessionButton onClick={handleJoinSession}>
            Join Session
          </SessionButton>
        </SessionType>
      </Flex>
    </Flex>
  );
};

export {Sessions};
