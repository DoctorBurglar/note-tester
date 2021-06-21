import React from "react";
import "./App.css";
import Staff from "./components/Staff";
import TeacherControls from "./components/TeacherControls";
import { trebleNotes, bassNotes, clefs } from "./constants";
import { Flex } from "@chakra-ui/react";
import SelectedKeyboard from "./components/SelectedKeyboard";

function App() {
  const [selectedNote, setSelectedNote] = React.useState("");
  const [selectedClef, setSelectedClef] = React.useState(clefs.TREBLE);
  const [displayingNotes, setDisplayingNotes] = React.useState(false);

  console.log(displayingNotes);

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
          setDisplayingNotes={setDisplayingNotes}
        />
        <SelectedKeyboard
          notes={
            selectedClef === clefs.TREBLE
              ? Object.keys(trebleNotes)
              : Object.keys(bassNotes)
          }
          selectedClef={selectedClef}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          displayingNotes={displayingNotes}
        />
      </Flex>
    </div>
  );
}

export default App;
