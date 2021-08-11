import * as React from "react";
import {Flex, Checkbox, Heading} from "@chakra-ui/react";
import {presets} from "../constants";
import {NoteRange} from "./NoteRange";
import {PresetSelect} from "./PresetSelect";

type ClefCheckboxProps = {
  clefOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  includeClef: boolean;
  setPreset: React.ChangeEventHandler<HTMLSelectElement>;
  preset: string;
  setLowNote: React.Dispatch<React.SetStateAction<string>>;
  lowNote: string;
  notesArray: string[];
  setHighNote: React.Dispatch<React.SetStateAction<string>>;
  highNote: string;
  clefName: string;
};

const ClefCheckbox: React.FC<ClefCheckboxProps> = ({
  clefOnChange,
  includeClef,
  setPreset,
  preset,
  setLowNote,
  lowNote,
  notesArray,
  setHighNote,
  highNote,
  clefName,
}) => {
  return (
    <Flex direction="column" padding="1rem" marginBottom="1rem">
      <Checkbox
        marginBottom="1rem"
        onChange={clefOnChange}
        defaultChecked={includeClef}
      >
        <Heading as="h3" fontSize="2rem" fontWeight="400" marginLeft=".5rem">
          {`${clefName} clef`}
        </Heading>
      </Checkbox>
      <PresetSelect
        includeClef={includeClef}
        preset={preset}
        presets={Object.values(presets)}
        setPreset={setPreset}
      />
      <NoteRange
        includeClef={includeClef}
        preset={preset}
        setLowNote={setLowNote}
        setHighNote={setHighNote}
        notesArray={notesArray}
        lowNote={lowNote}
        highNote={highNote}
      />
    </Flex>
  );
};

export {ClefCheckbox};
