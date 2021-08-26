import * as React from "react";
import {Flex} from "@chakra-ui/react";
import {NoteRangeSelect} from "./NoteRangeSelect";

type NoteRangeProps = {
  includeClef: boolean;
  preset: string;
  setLowNote: React.Dispatch<React.SetStateAction<string>>;
  setHighNote: React.Dispatch<React.SetStateAction<string>>;
  notesArray: string[];
  lowNote: string;
  highNote: string;
};

const NoteRange: React.FC<NoteRangeProps> = ({
  includeClef,
  preset,
  setHighNote,
  setLowNote,
  notesArray,
  lowNote,
  highNote,
}) => {
  return (
    <Flex justify="space-between" padding="0 1rem ">
      <NoteRangeSelect
        includeClef={includeClef}
        preset={preset}
        setNote={setLowNote}
        option="low"
        notesArray={notesArray}
        lowNote={lowNote}
        highNote={highNote}
      />
      <NoteRangeSelect
        includeClef={includeClef}
        preset={preset}
        setNote={setHighNote}
        option="high"
        notesArray={notesArray}
        lowNote={lowNote}
        highNote={highNote}
      />
    </Flex>
  );
};

export {NoteRange};
