import * as functions from "firebase-functions";

import * as admin from "firebase-admin";
admin.initializeApp();

exports.createUserDoc = functions.auth.user().onCreate((user) => {
  admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set({
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
      hostSessionId: "",
      guestSessionId: "",
      soloSettings: {
        highBassNote: "C5",
        highTrebleNote: "A6",
        includeBass: true,
        includeTreble: true,
        includeFlats: true,
        includeSharps: true,
        lowBassNote: "E1",
        lowTrebleNote: "C3",
        treblePreset: "Custom",
        bassPreset: "Custom",
        on: false,
      },
      guitarSettings: {
        lowString: 6,
        highString: 1,
        lowFret: 0,
        highFret: 13,
        includeSharps: true,
        includeFlats: true,
        preset: "Custom",
      },
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});
