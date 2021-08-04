import {Flex} from "@chakra-ui/react";
import * as React from "react";
import {NoteRange} from "./NoteRange";
import {PresetSelect} from "./PresetSelect";
import {guitarPresets, trebleNotes} from "../constants";
import {getGuitarNoteRange, getRandomGuitarNote} from "../helpers";
import AutoQuizModal from "./FormModal";
import IncludeAccidentals from "./IncludeAccidentals";
import {IGuitarSettings} from "../interfacesAndTypes";

type guitarSettingsProps = {
  onClose: () => void;
  isOpen: boolean;
  onSubmit: (SettingsObject: IGuitarSettings, selectedNote: string) => void;
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
  const [lowNote, setLowNote] = React.useState<trebleNotes | string>(
    trebleNotes.E3
  );
  const [highNote, setHighNote] = React.useState<trebleNotes | string>(
    trebleNotes.E6
  );
  const [includeSharps, setIncludeSharps] = React.useState(true);
  const [includeFlats, setIncludeFlats] = React.useState(true);

  const resetGuitarSettingsFields = React.useCallback(() => {
    if (currentSettings) {
      const {lowNote, highNote, includeFlats, includeSharps, preset} =
        currentSettings;
      setLowNote(lowNote);
      setHighNote(highNote);
      setIncludeSharps(includeSharps);
      setIncludeFlats(includeFlats);
      setPreset(preset);
    }
  }, [currentSettings]);

  React.useEffect(() => {
    const {lowGuitarNote, highGuitarNote} = getGuitarNoteRange(preset);
    setLowNote(lowGuitarNote);
    setHighNote(highGuitarNote);
  }, [preset]);

  const notesArray = Object.keys(trebleNotes);
  const guitarNotes = notesArray.slice(
    notesArray.indexOf(trebleNotes.E3),
    notesArray.indexOf(trebleNotes.F6)
  );

  console.log(guitarNotes);

  const handleSettingsSubmit = () => {
    const randomNote = getRandomGuitarNote(
      {highNote, includeSharps, includeFlats, lowNote},
      selectedNote
    );
    console.log("set backend settings");
    onSubmit(
      {lowNote, highNote, preset, includeFlats, includeSharps},
      randomNote
    );
    handleClose();
  };

  const handleClose = () => {
    resetGuitarSettingsFields();
    onClose();
  };

  return (
    <AutoQuizModal
      submitText="Save"
      handleModalClose={handleClose}
      isOpen={isOpen}
      handleQuiz={handleSettingsSubmit}
    >
      <Flex direction="column" padding="1rem" marginBottom="1rem">
        <PresetSelect
          includeClef={true}
          preset={preset}
          presets={Object.values(guitarPresets)}
          setPreset={(e) => setPreset(e.target.value)}
        />

        <NoteRange
          includeClef={true}
          preset={preset}
          setLowNote={setLowNote}
          setHighNote={setHighNote}
          notesArray={guitarNotes}
          lowNote={lowNote}
          highNote={highNote}
        />
      </Flex>
      <IncludeAccidentals
        includeSharps={includeSharps}
        inlcudeFlats={includeFlats}
        setIncludeSharps={setIncludeSharps}
        setIncludeFlats={setIncludeFlats}
      />
    </AutoQuizModal>
  );
};
export {GuitarSettings};
