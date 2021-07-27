import * as React from "react";
import {
  Flex,
  Checkbox,
  Heading,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import {presets} from "../constants";

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
        <Heading as="h3" fontSize="2rem" fontWeight="400">
          {`${clefName} clef`}
        </Heading>
      </Checkbox>
      <FormControl
        isDisabled={!includeClef}
        w="80%"
        alignSelf="center"
        marginBottom="1rem"
      >
        <Flex align="center">
          <FormLabel htmlFor="presets" fontSize="1.3rem">
            Presets:
          </FormLabel>
          <Select onChange={setPreset} id="presets" value={preset}>
            {Object.values(presets).map((preset) => {
              return (
                <option key={preset} value={preset}>
                  {preset}
                </option>
              );
            })}
          </Select>
        </Flex>
      </FormControl>
      <Flex justify="space-between" padding="0 1rem ">
        <FormControl isDisabled={!includeClef || preset !== "Custom"} w="45%">
          <FormLabel htmlFor="lowNote" fontSize="1.3rem">
            Low Note
          </FormLabel>
          <Select
            onChange={(e) => setLowNote(e.target.value)}
            id="lowNote"
            value={lowNote}
          >
            {notesArray.slice(0, notesArray.length - 1).map((note) => {
              return (
                <option key={note} value={note}>
                  {note}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <FormControl isDisabled={!includeClef || preset !== "Custom"} w="45%">
          <FormLabel htmlFor="highNote" fontSize="1.3rem">
            High Note
          </FormLabel>
          <Select
            id="highNote"
            onChange={(e) => setHighNote(e.target.value)}
            value={highNote}
          >
            {notesArray.slice(notesArray.indexOf(lowNote) + 1).map((note) => {
              return (
                <option key={note} value={note}>
                  {note}
                </option>
              );
            })}
          </Select>
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default ClefCheckbox;
