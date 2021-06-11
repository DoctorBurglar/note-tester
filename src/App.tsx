import React from "react";
import "./App.css";
import Staff from "./components/Staff";
import TeacherControls from "./components/TeacherControls";
import Keyboard from "./components/Keyboard";
import { Flex } from "@chakra-ui/react";

function App() {
  const [selectedNote, setSelectedNote] = React.useState("");
  const [selectedClef, setSelectedClef] = React.useState("");

  console.log(selectedNote);

  return (
    <div className="App">
      <Flex
        justifyContent="space-around"
        w="85rem"
        margin="0 auto"
        direction="column"
      >
        <Staff selectedNote={selectedNote} selectedClef={selectedClef} />

        <TeacherControls
          setSelectedNote={setSelectedNote}
          setSelectedClef={setSelectedClef}
          selectedClef={selectedClef}
          selectedNote={selectedNote}
        />
        <Keyboard
          selectedClef={selectedClef}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
        />
      </Flex>
    </div>
  );
}

export default App;
