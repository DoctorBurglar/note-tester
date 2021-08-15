import {Flex} from "@chakra-ui/react";
import * as React from "react";
import {PresetSelect} from "./PresetSelect";
import {guitarPresets} from "../constants";
import {getGuitarNoteRange, getRandomGuitarNote, fretNumber} from "../helpers";
import {SettingsModal} from "./SettingsModal";
import {IncludeAccidentals} from "./IncludeAccidentals";
import {IGuitarNote, IGuitarSettings} from "../interfacesAndTypes";
import {FretRange} from "./FretRange";
import {StringRange} from "./StringRange";

type guitarSettingsProps = {
  onClose: () => void;
  isOpen: boolean;
  onSubmit: (
    SettingsObject: IGuitarSettings,
    selectedNote: IGuitarNote
  ) => void;
  selectedNote: string;
  currentSettings: IGuitarSettings;
};

const GuitarSettings: React.FC<guitarSettingsProps> = ({
  onClose,
  isOpen,
  onSubmit,
  selectedNote,
  currentSettings,
}) => {
  const [preset, setPreset] = React.useState<guitarPresets | string>(
    guitarPresets.CUSTOM
  );

  const [lowFret, setLowFret] = React.useState(0);
  const [highFret, setHighFret] = React.useState(13);
  const [lowString, setLowString] = React.useState(6);
  const [highString, setHighString] = React.useState(1);
  const [includeSharps, setIncludeSharps] = React.useState(true);
  const [includeFlats, setIncludeFlats] = React.useState(true);
  const [error, setError] = React.useState("");

  const resetGuitarSettingsFields = React.useCallback(() => {
    if (currentSettings) {
      const {
        lowString,
        highString,
        lowFret,
        highFret,
        includeFlats,
        includeSharps,
        preset,
      } = currentSettings;
      setLowString(lowString);
      setHighString(highString);
      setIncludeSharps(includeSharps);
      setIncludeFlats(includeFlats);
      setLowFret(lowFret);
      setHighFret(highFret);
      setPreset(preset);
      setError("");
    }
  }, [currentSettings]);

  React.useEffect(() => {
    resetGuitarSettingsFields();
  }, [resetGuitarSettingsFields]);

  React.useEffect(() => {
    const {lowGuitarString, highGuitarString, lowFret, highFret} =
      getGuitarNoteRange(preset);
    setLowString(lowGuitarString);
    setHighString(highGuitarString);
    setLowFret(lowFret);
    setHighFret(highFret);
  }, [preset]);

  const handleSettingsSubmit = () => {
    try {
      const randomNote = getRandomGuitarNote(
        {
          highString,
          includeSharps,
          includeFlats,
          lowString,
          lowFret,
          highFret,
        },
        selectedNote
      );
      onSubmit(
        {
          lowString,
          highString,
          preset,
          includeFlats,
          includeSharps,
          lowFret,
          highFret,
        },
        randomNote
      );
      handleClose();
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  const handleClose = () => {
    resetGuitarSettingsFields();
    onClose();
  };

  const frets: number[] = [];
  for (let i = 0; i <= fretNumber; i++) {
    frets.push(i);
  }

  return (
    <SettingsModal
      submitText="Save"
      handleModalClose={handleClose}
      isOpen={isOpen}
      handleQuiz={handleSettingsSubmit}
    >
      <Flex
        direction="column"
        padding="1rem"
        marginBottom="1rem"
        position="relative"
      >
        {error ? (
          <Flex
            color="red"
            position="absolute"
            top="-1.5rem"
            left="0"
            justify="center"
            textAlign="center"
            w="100%"
            fontWeight="700"
          >
            {error}
          </Flex>
        ) : null}
        <PresetSelect
          includeClef={true}
          preset={preset}
          presets={Object.values(guitarPresets)}
          setPreset={(e) => setPreset(e.target.value)}
        />

        <StringRange
          stringNumber={6}
          highString={highString}
          setLowString={setLowString}
          lowString={lowString}
          preset={preset}
          setHighString={setHighString}
        />

        <FretRange
          frets={frets}
          highFret={highFret}
          setLowFret={setLowFret}
          lowFret={lowFret}
          preset={preset}
          setHighFret={setHighFret}
        />
      </Flex>
      <IncludeAccidentals
        includeSharps={includeSharps}
        inlcudeFlats={includeFlats}
        setIncludeSharps={setIncludeSharps}
        setIncludeFlats={setIncludeFlats}
      />
    </SettingsModal>
  );
};
export {GuitarSettings};
