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
      hostedSessionId: "",
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});
