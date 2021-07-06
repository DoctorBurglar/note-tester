import {useFirestore, useFirestoreDocData} from "reactfire";
import {ISession} from "./interfacesAndTypes";

export const useSession = (sessionId: string) => {
  const sessionRef = useFirestore().collection("sessions").doc(sessionId);
  const sessionDoc = useFirestoreDocData<ISession>(sessionRef).data;
  return {
    sessionRef,
    sessionDoc,
  };
};
