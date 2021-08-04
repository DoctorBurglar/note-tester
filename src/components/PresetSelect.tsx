import * as React from "react";
import {FormControl, Flex, FormLabel, Select} from "@chakra-ui/react";

type PresetSelectProps = {
  includeClef: boolean;
  setPreset: React.ChangeEventHandler<HTMLSelectElement>;
  presets: string[];
  preset: string;
};

const PresetSelect: React.FC<PresetSelectProps> = ({
  includeClef,
  preset,
  presets,
  setPreset,
}) => {
  return (
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
          {presets.map((preset) => {
            return (
              <option key={preset} value={preset}>
                {preset}
              </option>
            );
          })}
        </Select>
      </Flex>
    </FormControl>
  );
};

export {PresetSelect};
