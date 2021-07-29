import {
  clefs,
  bassNotes,
  trebleNotes,
  lineHeightInt,
  positionAdjustment,
  accidentals,
  presets,
  answerStatusOptions,
} from "./constants";
import {IAutoQuiz} from "./interfacesAndTypes";

export const determineNotePosition = (
  selectedNote: string,
  selectedClef: string
) => {
  let notePosition = "";
  if (selectedClef === clefs.TREBLE) {
    switch (selectedNote) {
      case trebleNotes.A6:
      case accidentals.As6:
      case accidentals.Ab6:
        notePosition = -(13 * lineHeightInt + positionAdjustment) + "rem";
        break;

      case trebleNotes.G6:
      case accidentals.Gs6:
      case accidentals.Gb6:
        notePosition = -(12.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.F6:
      case accidentals.Fs6:
      case accidentals.Fb6:
        notePosition = -(12 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.E6:
      case accidentals.Es6:
      case accidentals.Eb6:
        notePosition = -(11.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.D6:
      case accidentals.Ds6:
      case accidentals.Db6:
        notePosition = -(11 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.C6:
      case accidentals.Cs6:
      case accidentals.Cb6:
        notePosition = -(10.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.B5:
      case accidentals.Bs5:
      case accidentals.Bb5:
        notePosition = -(10 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.A5:
      case accidentals.As5:
      case accidentals.Ab5:
        notePosition = -(9.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.G5:
      case accidentals.Gs5:
      case accidentals.Gb5:
        notePosition = -(9 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.F5:
      case accidentals.Fs5:
      case accidentals.Fb5:
        notePosition = -(8.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.E5:
      case accidentals.Es5:
      case accidentals.Eb5:
        notePosition = -(8 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.D5:
      case accidentals.Ds5:
      case accidentals.Db5:
        notePosition = -(7.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.C5:
      case accidentals.Cs5:
      case accidentals.Cb5:
        notePosition = -(7 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.B4:
      case accidentals.Bs4:
      case accidentals.Bb4:
        notePosition = -(6.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.A4:
      case accidentals.As4:
      case accidentals.Ab4:
        notePosition = -(6 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.G4:
      case accidentals.Gs4:
      case accidentals.Gb4:
        notePosition = -(5.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.F4:
      case accidentals.Fs4:
      case accidentals.Fb4:
        notePosition = -(5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.E4:
      case accidentals.Es4:
      case accidentals.Eb4:
        notePosition = -(4.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.D4:
      case accidentals.Ds4:
      case accidentals.Db4:
        notePosition = -(4 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.C4:
      case accidentals.Cs4:
      case accidentals.Cb4:
        notePosition = -(3.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.B3:
      case accidentals.Bs3:
      case accidentals.Bb3:
        notePosition = -(3 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.A3:
      case accidentals.As3:
      case accidentals.Ab3:
        notePosition = -(2.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.G3:
      case accidentals.Gs3:
      case accidentals.Gb3:
        notePosition = -(2 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.F3:
      case accidentals.Fs3:
      case accidentals.Fb3:
        notePosition = -(1.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.E3:
      case accidentals.Es3:
      case accidentals.Eb3:
        notePosition = -(1 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.D3:
      case accidentals.Ds3:
      case accidentals.Db3:
        notePosition = -(0.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.C3:
      case accidentals.Cs3:
      case accidentals.Cb3:
        notePosition = -(0 * lineHeightInt + positionAdjustment) + "rem";
        break;
      default:
        notePosition = "";
    }
  } else if (selectedClef === clefs.BASS) {
    switch (selectedNote) {
      case bassNotes.C5:
      case accidentals.Cs5:
      case accidentals.Cb5:
        notePosition = -(13 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.B4:
      case accidentals.Bs4:
      case accidentals.Bb4:
        notePosition = -(12.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.A4:
      case accidentals.As4:
      case accidentals.Ab4:
        notePosition = -(12 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.G4:
      case accidentals.Gs4:
      case accidentals.Gb4:
        notePosition = -(11.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.F4:
      case accidentals.Fs4:
      case accidentals.Fb4:
        notePosition = -(11 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.E4:
      case accidentals.Es4:
      case accidentals.Eb4:
        notePosition = -(10.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.D4:
      case accidentals.Ds4:
      case accidentals.Db4:
        notePosition = -(10 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.C4:
      case accidentals.Cs4:
      case accidentals.Cb4:
        notePosition = -(9.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.B3:
      case accidentals.Bs3:
      case accidentals.Bb3:
        notePosition = -(9 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.A3:
      case accidentals.As3:
      case accidentals.Ab3:
        notePosition = -(8.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.G3:
      case accidentals.Gs3:
      case accidentals.Gb3:
        notePosition = -(8 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.F3:
      case accidentals.Fs3:
      case accidentals.Fb3:
        notePosition = -(7.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.E3:
      case accidentals.Es3:
      case accidentals.Eb3:
        notePosition = -(7 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.D3:
      case accidentals.Ds3:
      case accidentals.Db3:
        notePosition = -(6.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.C3:
      case accidentals.Cs3:
      case accidentals.Cb3:
        notePosition = -(6 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.B2:
      case accidentals.Bs2:
      case accidentals.Bb2:
        notePosition = -(5.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.A2:
      case accidentals.As2:
      case accidentals.Ab2:
        notePosition = -(5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.G2:
      case accidentals.Gs2:
      case accidentals.Gb2:
        notePosition = -(4.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.F2:
      case accidentals.Fs2:
      case accidentals.Fb2:
        notePosition = -(4 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.E2:
      case accidentals.Es2:
      case accidentals.Eb2:
        notePosition = -(3.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.D2:
      case accidentals.Ds2:
      case accidentals.Db2:
        notePosition = -(3 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.C2:
      case accidentals.Cs2:
      case accidentals.Cb2:
        notePosition = -(2.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.B1:
      case accidentals.Bs1:
      case accidentals.Bb1:
        notePosition = -(2 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.A1:
      case accidentals.As1:
      case accidentals.Ab1:
        notePosition = -(1.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.G1:
      case accidentals.Gs1:
      case accidentals.Gb1:
        notePosition = -(1 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.F1:
      case accidentals.Fs1:
      case accidentals.Fb1:
        notePosition = -(0.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.E1:
      case accidentals.Es1:
      case accidentals.Eb1:
        notePosition = -(0 * lineHeightInt + positionAdjustment) + "rem";
        break;

      default:
        notePosition = "";
    }
  }

  return notePosition;
};

export const getRandomNote = (
  {
    includeBass,
    includeFlats,
    includeSharps,
    includeTreble,
    lowBassNote,
    lowTrebleNote,
    highBassNote,
    highTrebleNote,
    on,
  }: IAutoQuiz,
  selectedNote: string
) => {
  const clefsArray = [];
  if (!includeBass && !includeTreble) {
    const error = new Error();
    throw error;
  }
  if (includeBass) {
    clefsArray.push(clefs.BASS);
  }
  if (includeTreble) {
    clefsArray.push(clefs.TREBLE);
  }
  const randomClef = clefsArray[Math.floor(Math.random() * clefsArray.length)];

  let notes: string[] = [];
  if (randomClef === clefs.TREBLE) {
    notes = Object.keys(trebleNotes);
  }
  if (randomClef === clefs.BASS) {
    notes = Object.keys(bassNotes);
  }

  let notesRange;
  let lowNoteIndex;

  let naturalSelectedNote = selectedNote;
  if (selectedNote[1] === "s" || selectedNote[1] === "b") {
    naturalSelectedNote = selectedNote[0] + selectedNote[2];
  }
  if (randomClef === clefs.TREBLE && lowTrebleNote && highTrebleNote) {
    lowNoteIndex = notes.indexOf(lowTrebleNote);
    notesRange = notes
      .slice(notes.indexOf(lowTrebleNote), notes.indexOf(highTrebleNote) + 1)
      // filter out currently selected note so we don't repeat
      .filter((note) => note !== naturalSelectedNote);
  }

  if (randomClef === clefs.BASS && lowBassNote && highBassNote) {
    lowNoteIndex = notes.indexOf(lowBassNote);
    notesRange = notes
      .slice(notes.indexOf(lowBassNote), notes.indexOf(highBassNote) + 1)
      // filter out currently selected note so we don't repeat
      .filter((note) => note !== naturalSelectedNote);
  }

  const accidentalsArray = [""];
  if (includeFlats) {
    accidentalsArray.push("b");
  }
  if (includeSharps) {
    accidentalsArray.push("s");
  }
  if (notesRange) {
    const randomNaturalNote =
      notesRange[Math.floor(Math.random() * notesRange.length)];
    if (
      lowNoteIndex === 0 &&
      (randomNaturalNote[0] === "C" || randomNaturalNote[0] === "F")
    ) {
      const lowestCOrFAccidentalsArray = [""];
      if (includeSharps) {
        lowestCOrFAccidentalsArray.push("s");
      }
      const randomNote =
        randomNaturalNote[0] +
        lowestCOrFAccidentalsArray[
          Math.floor(Math.random() * lowestCOrFAccidentalsArray.length)
        ] +
        randomNaturalNote[1];
      return {randomNote, randomClef};
    } else {
      const randomNote =
        randomNaturalNote[0] +
        accidentalsArray[Math.floor(Math.random() * accidentalsArray.length)] +
        randomNaturalNote[1];
      return {randomNote, randomClef};
    }
  }
};

export const getTrebleNoteRange = (treblePreset: string) => {
  const trebleNoteRange = {
    lowTrebleNote: trebleNotes.C3,
    highTrebleNote: trebleNotes.A6,
  };
  switch (treblePreset) {
    case presets.CUSTOM:
      trebleNoteRange.lowTrebleNote = trebleNotes.C3;
      trebleNoteRange.highTrebleNote = trebleNotes.A6;
      break;
    case presets.CPOSITION:
      trebleNoteRange.lowTrebleNote = trebleNotes.C4;
      trebleNoteRange.highTrebleNote = trebleNotes.G4;
      break;
    case presets.MIDDLECPOSITION:
      trebleNoteRange.lowTrebleNote = trebleNotes.C4;
      trebleNoteRange.highTrebleNote = trebleNotes.G4;
      break;
    case presets.GPOSITION:
      trebleNoteRange.lowTrebleNote = trebleNotes.G4;
      trebleNoteRange.highTrebleNote = trebleNotes.D5;
      break;
    case presets.NOTESONSTAFF:
      trebleNoteRange.lowTrebleNote = trebleNotes.E4;
      trebleNoteRange.highTrebleNote = trebleNotes.F5;
      break;
    case presets.NOTERSBELOWSTAFF:
      trebleNoteRange.lowTrebleNote = trebleNotes.C3;
      trebleNoteRange.highTrebleNote = trebleNotes.D4;
      break;
    case presets.NOTESABOVESTAFF:
      trebleNoteRange.lowTrebleNote = trebleNotes.G5;
      trebleNoteRange.highTrebleNote = trebleNotes.A6;
      break;
    default:
      trebleNoteRange.lowTrebleNote = trebleNotes.C3;
      trebleNoteRange.highTrebleNote = trebleNotes.A6;
  }
  return trebleNoteRange;
};

export const getBassNoteRange = (bassPreset: string) => {
  const bassNoteRange = {
    lowBassNote: bassNotes.E1,
    highBassNote: bassNotes.C5,
  };
  switch (bassPreset) {
    case presets.CUSTOM:
      bassNoteRange.lowBassNote = bassNotes.E1;
      bassNoteRange.highBassNote = bassNotes.C5;
      break;
    case presets.CPOSITION:
      bassNoteRange.lowBassNote = bassNotes.C3;
      bassNoteRange.highBassNote = bassNotes.G3;
      break;
    case presets.MIDDLECPOSITION:
      bassNoteRange.lowBassNote = bassNotes.C3;
      bassNoteRange.highBassNote = bassNotes.G3;
      break;
    case presets.GPOSITION:
      bassNoteRange.lowBassNote = bassNotes.G2;
      bassNoteRange.highBassNote = bassNotes.D3;
      break;
    case presets.NOTESONSTAFF:
      bassNoteRange.lowBassNote = bassNotes.G2;
      bassNoteRange.highBassNote = bassNotes.A3;
      break;
    case presets.NOTERSBELOWSTAFF:
      bassNoteRange.lowBassNote = bassNotes.E1;
      bassNoteRange.highBassNote = bassNotes.F2;
      break;
    case presets.NOTESABOVESTAFF:
      bassNoteRange.lowBassNote = bassNotes.B3;
      bassNoteRange.highBassNote = bassNotes.C5;
      break;
    default:
      bassNoteRange.lowBassNote = bassNotes.E1;
      bassNoteRange.highBassNote = bassNotes.C2;
  }
  return bassNoteRange;
};

export const determineWhiteKeyBackgroundColor = (
  notes: string[],
  note: string,
  ind: number,
  selectedNote: string,
  answer: string,
  answerStatus: string,
  isGuestKeyboard: boolean,
  thisWhiteKeyIsSelected: (note: string, ind: number) => boolean
) => {
  let nextNote = "";
  let prevNote = "";
  if (ind < notes.length - 1) {
    nextNote = notes[notes.indexOf(note) + 1];
  }
  if (ind > 0) {
    prevNote = notes[notes.indexOf(note) - 1];
  }

  // isGuestKeyboard, thisWhiteKeyIsSelected, note, ind, answerStatus, notes, selectedNote, answer

  let backgroundColor = "";
  if (isGuestKeyboard) {
    if (
      thisWhiteKeyIsSelected(note, ind) &&
      answerStatus === answerStatusOptions.CORRECT
    ) {
      backgroundColor = "var(--main-color)";
    } else if (
      answerStatus !== "" &&
      (note[0] === "B" || note[0] === "E") &&
      nextNote[0] + "b" + nextNote[1] === selectedNote
    ) {
      backgroundColor = "var(--main-color)";
    } else if (
      answerStatus !== "" &&
      (note[0] === "C" || note[0] === "F") &&
      prevNote[0] + "s" + prevNote[1] === selectedNote
    ) {
      backgroundColor = "var(--main-color)";
    } else if (answerStatus !== "" && note === selectedNote) {
      backgroundColor = "var(--main-color)";
    } else if (
      thisWhiteKeyIsSelected(note, ind) &&
      answerStatus === answerStatusOptions.INCORRECT
    ) {
      backgroundColor = "var(--wrong-note-color)";
    }
  } else if (note === answer && thisWhiteKeyIsSelected(note, ind)) {
    backgroundColor = "var(--main-color)";
  } else if (thisWhiteKeyIsSelected(note, ind)) {
    backgroundColor = "var(--main-color)";
  } else if (
    note === answer &&
    answerStatus === answerStatusOptions.INCORRECT
  ) {
    backgroundColor = "var(--wrong-note-color)";
  }
  return backgroundColor;
};

export const determineBlackKeyBackgroundColor = (
  notes: string[],
  note: string,
  ind: number,
  selectedNote: string,
  answer: string,
  answerStatus: string,
  isGuestKeyboard: boolean,
  thisBlackKeyIsSelected: (note: string, ind: number) => boolean
) => {
  let nextNote = "";
  if (ind < notes.length - 1) {
    nextNote = notes[notes.indexOf(note) + 1];
  }

  let backgroundColor = "";
  if (isGuestKeyboard) {
    if (
      thisBlackKeyIsSelected(note, ind) &&
      answerStatus === answerStatusOptions.CORRECT
    ) {
      backgroundColor = "var(--main-color)";
    } else if (
      answerStatus !== "" &&
      (note[0] + "s" + note[1] === selectedNote ||
        nextNote[0] + "b" + nextNote[1] === selectedNote)
    ) {
      backgroundColor = "var(--main-color)";
    } else if (
      thisBlackKeyIsSelected(note, ind) &&
      answerStatus === answerStatusOptions.INCORRECT
    ) {
      backgroundColor = "var(--wrong-note-color)";
    } else {
      backgroundColor = "black";
    }
  } else if (
    note[0] + "s" + note[1] === answer &&
    thisBlackKeyIsSelected(note, ind)
  ) {
    backgroundColor = "var(--main-color)";
  } else if (thisBlackKeyIsSelected(note, ind)) {
    backgroundColor = "var(--main-color)";
  } else if (
    note[0] + "s" + note[1] === answer &&
    answerStatus === answerStatusOptions.INCORRECT
  ) {
    backgroundColor = "var(--wrong-note-color)";
  } else {
    backgroundColor = "black";
  }
  return backgroundColor;
};
