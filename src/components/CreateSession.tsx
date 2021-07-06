import * as React from "react";
import {Button, Flex, Input} from "@chakra-ui/react";
import {useHistory} from "react-router-dom";
import {useFirestore, useUser, useFirestoreDocData} from "reactfire";
import {SignOut} from "./SignOut";

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
    if (userDoc.hostSessionId !== "") {
      oldSessionId = userDoc.hostSessionId;
    }

    const newSessionCode = createSessionCode(6);
    try {
      if (oldSessionId) {
        await sessionsRef.doc(oldSessionId).delete();
      }

      const newSession = await sessionsRef.add({
        sessionCode: newSessionCode,
        hostId: data.uid,
        guestId: "",
        identifiedNotes: 0,
        totalNotes: 0,
        selectedNote: "",
        selectedClef: "TREBLE",
        mnemonics: {
          showLinesOnStaff: false,
          showSpacesOnStaff: true,
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
        console.log(sessionToJoinId);
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
    <Flex width="100%" justify="center">
      <SignOut />
      <Button
        border="1px solid black"
        borderRadius="5px"
        margin="3rem"
        padding="2rem 3rem"
        fontSize="2rem"
        onClick={handleCreateSession}
      >
        Host Session
      </Button>
      <Flex direction="column" justify="center">
        <Input
          value={sessionCodeInput}
          placeholder="Session Code"
          marginBottom="1rem"
          onChange={handleSessionCodeInput}
        />
        <Button
          border="1px solid black"
          borderRadius="5px"
          padding="2rem 3rem"
          fontSize="2rem"
          onClick={handleJoinSession}
        >
          Join Session
        </Button>
      </Flex>
    </Flex>
  );
};

export {CreateSession};
