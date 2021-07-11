import * as React from "react";
import {Button, Flex, Input, Heading} from "@chakra-ui/react";
import {useHistory} from "react-router-dom";
import {useFirestore, useUser, useFirestoreDocData} from "reactfire";
import Header from "./Header";

import styled from "@emotion/styled";

const SessionButton = styled(Button)`
  margin-top: 1rem;
  background-color: var(--main-color);
  border: 1px solid black;
  border-radius: 5px;
  padding: 1.3rem 5rem;
  font-size: 1.5rem;
`;
interface IUser {
  uid: string;
  email: string;
  hostSessionId: string;
  displayName: string;
  photoURL: string;
}

const CreateSession: React.FC = () => {
  const [sessionCodeInput, setSessionCodeInput] = React.useState("");

  const {data} = useUser();

  const history = useHistory();

  const createSessionCode = (number: number) => {
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
    return newSessionIdArray.join("");
  };

  const sessionsRef = useFirestore().collection("sessions");

  const userRef = useFirestore().collection("users").doc(data.uid);
  const userDoc = useFirestoreDocData<IUser>(userRef).data;

  const handleCreateSession = async () => {
    let oldSessionId;
    if (userDoc?.hostSessionId !== "") {
      oldSessionId = userDoc?.hostSessionId;
    }

    const newSessionCode = createSessionCode(6);
    try {
      if (oldSessionId) {
        await sessionsRef.doc(oldSessionId).delete();
      }

      const newSession = await sessionsRef.add({
        answer: "",
        answerStatus: "",
        displayingNotes: false,
        sessionCode: newSessionCode,
        hostId: data.uid,
        guestId: "",
        identifiedNotes: 0,
        totalNotes: 0,
        selectedNote: "",
        selectedClef: "TREBLE",
        mnemonics: {
          showLinesOnStaff: false,
          showSpacesOnStaff: false,
        },
      });

      await userRef.update({hostSessionId: newSession.id});
      history.push(`/hosted-session/${newSession.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleJoinSession = async () => {
    try {
      const sessionToJoin = await sessionsRef
        .where("sessionCode", "==", sessionCodeInput)
        .get();

      if (sessionToJoin.docs.length > 0) {
        const sessionToJoinId = sessionToJoin.docs[0].id;
        await sessionsRef.doc(sessionToJoinId).update({guestId: data.uid});
        await userRef.update({
          guestSessionId: sessionToJoinId,
        });
        history.push(`/guest-session/${sessionToJoinId}`);
      } else {
        console.log("bad code");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSessionCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSessionCodeInput(e.target.value);
  };

  return (
    <Flex width="100%" direction="column" align="center">
      <Header />
      <Flex w="50%" justify="space-between" marginTop="5rem">
        <Flex direction="column" w="40%" justify="space-between">
          <Heading as="h1" fontSize="3rem" fontWeight="500">
            <span style={{color: "var(--main-color-dark)"}}>Create</span> a new
            session
          </Heading>
          <Flex direction="column" fontSize="1.5rem">
            <p>
              You’ll get a session code you can send to a student. The app will
              keep score as they identify notes on the staff. Or just screen
              share over Zoom and have them say the notes out loud!
            </p>
            <p>
              You can display helpful mnemonics on the treble staff and bass
              staff, and show the note names on the keyboard.
            </p>
          </Flex>

          <SessionButton onClick={handleCreateSession}>
            Host Session
          </SessionButton>
        </Flex>

        <Flex direction="column" w="40%" justify="space-between">
          <Flex direction="column" h="40%">
            <Heading as="h1" fontSize="3rem" fontWeight="500">
              {" "}
              <span style={{color: "var(--main-color-dark)"}}>Join</span> a
              session
            </Heading>
            <Flex direction="column" fontSize="1.5rem">
              <p>
                Did your music teacher say something about entering a code
                somewhere? Enter it below and join their session to learn how to
                read notes!
              </p>
              <p>You’ll be amazing in no time!</p>
            </Flex>
          </Flex>

          <Flex direction="column">
            <Input
              value={sessionCodeInput}
              marginBottom="1rem"
              placeholder="Session Code"
              onChange={handleSessionCodeInput}
            />
            <SessionButton onClick={handleJoinSession}>
              Join Session
            </SessionButton>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export {CreateSession};
