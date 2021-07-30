import * as React from "react";
import {FirebaseAppProvider, SuspenseWithPerf} from "reactfire";
import {BrowserRouter} from "react-router-dom";
import {ChakraProvider} from "@chakra-ui/react";

const firebaseConfig = {
  apiKey: "AIzaSyD7Zxjjzqnc7-BvZ7xLLjR2KqStBEmmDVg",
  authDomain: "note-tester.firebaseapp.com",
  projectId: "note-tester",
  storageBucket: "note-tester.appspot.com",
  messagingSenderId: "931987042071",
  appId: "1:931987042071:web:1cb638d8a90bf9730cd152",
  measurementId: "G-E14SD7N17Y",
};

const AppProviders: React.FC = ({children}) => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <ChakraProvider>
        <SuspenseWithPerf
          fallback={<div>loading...</div>}
          traceId={"loading-app-status"}
        >
          <BrowserRouter>{children}</BrowserRouter>
        </SuspenseWithPerf>
      </ChakraProvider>
    </FirebaseAppProvider>
  );
};

export {AppProviders};
