import * as React from "react";
import {FormControl, FormLabel, Select} from "@chakra-ui/react";

type NoteRangeSelectProps = {
  includeClef: boolean;
  preset: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
  option: "low" | "high";
  notesArray: string[];
  lowNote: string;
  highNote: string;
};

const NoteRangeSelect: React.FC<NoteRangeSelectProps> = ({
  includeClef,
  preset,
  setNote,
  option,
  notesArray,
  lowNote,
  highNote,
}) => {
  return (
    <FormControl isDisabled={!includeClef || preset !== "Custom"} w="45%">
      <FormLabel
        htmlFor={option === "low" ? "lowNote" : "highNote"}
        fontSize="1.3rem"
      >
        {option === "low" ? "Low Note" : "High Note"}
      </FormLabel>
      <Select
        onChange={(e) => setNote(e.target.value)}
        id={option === "low" ? "lowNote" : "highNote"}
        value={option === "low" ? lowNote : highNote}
      >
        {option === "low"
          ? notesArray.slice(0, notesArray.length - 1).map((note) => {
              return (
                <option key={note} value={note}>
                  {note}
                </option>
              );
            })
          : notesArray.slice(notesArray.indexOf(lowNote) + 1).map((note) => {
              return (
                <option key={note} value={note}>
                  {note}
                </option>
              );
            })}
      </Select>
    </FormControl>
  );
};

export {NoteRangeSelect};
