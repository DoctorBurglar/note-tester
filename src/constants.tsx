export enum clefs {
  TREBLE = "TREBLE",
  BASS = "BASS",
}

export enum answerStatusOptions {
  CORRECT = "CORRECT",
  INCORRECT = "INCORRECT",
}

// source of truth for line height and note height.  If changed position of treble and bass clefs have to be adjusted
export const lineHeight = "2.3rem";

export const lineHeightInt = Number.parseFloat(lineHeight);

export const positionAdjustment = 0.1;

export enum bassNotes {
  E1 = "E1",
  F1 = "F1",
  G1 = "G1",
  A1 = "A1",
  B1 = "B1",
  C2 = "C2",
  D2 = "D2",
  E2 = "E2",
  F2 = "F2",
  G2 = "G2",
  A2 = "A2",
  B2 = "B2",
  C3 = "C3",
  D3 = "D3",
  E3 = "E3",
  F3 = "F3",
  G3 = "G3",
  A3 = "A3",
  B3 = "B3",
  C4 = "C4",
  D4 = "D4",
  E4 = "E4",
  F4 = "F4",
  G4 = "G4",
  A4 = "A4",
  B4 = "B4",
  C5 = "C5",
}

export enum trebleNotes {
  C3 = "C3",
  D3 = "D3",
  E3 = "E3",
  F3 = "F3",
  G3 = "G3",
  A3 = "A3",
  B3 = "B3",
  C4 = "C4",
  D4 = "D4",
  E4 = "E4",
  F4 = "F4",
  G4 = "G4",
  A4 = "A4",
  B4 = "B4",
  C5 = "C5",
  D5 = "D5",
  E5 = "E5",
  F5 = "F5",
  G5 = "G5",
  A5 = "A5",
  B5 = "B5",
  C6 = "C6",
  D6 = "D6",
  E6 = "E6",
  F6 = "F6",
  G6 = "G6",
  A6 = "A6",
}

export enum guestKeyboard {
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
  A = "A",
  B = "B",
}

type accidentalsType = {
  [key: string]: boolean;
};

const accidentals2: accidentalsType = {};

for (let key in bassNotes) {
  accidentals2[key[0] + "b" + key[1]] = true;
  accidentals2[key[0] + "s" + key[1]] = true;
}

for (let key in trebleNotes) {
  if (!accidentals2[key[0] + "b" + key[1]]) {
    accidentals2[key[0] + "b" + key[1]] = true;
  }
  if (!accidentals2[key[0] + "s" + key[1]]) {
    accidentals2[key[0] + "s" + key[1]] = true;
  }
}

export const accidentals3 = accidentals2;

export enum accidentals {
  Es1 = "Es1",
  Fs1 = "Fs1",
  Gs1 = "Gs1",
  As1 = "As1",
  Bs1 = "Bs1",
  Cs2 = "Cs2",
  Ds2 = "Ds2",
  Es2 = "Es2",
  Fs2 = "Fs2",
  Gs2 = "Gs2",
  As2 = "As2",
  Bs2 = "Bs2",
  Cs3 = "Cs3",
  Ds3 = "Ds3",
  Es3 = "Es3",
  Fs3 = "Fs3",
  Gs3 = "Gs3",
  As3 = "As3",
  Bs3 = "Bs3",
  Cs4 = "Cs4",
  Ds4 = "Ds4",
  Es4 = "Es4",
  Fs4 = "Fs4",
  Gs4 = "Gs4",
  As4 = "As4",
  Bs4 = "Bs4",
  Cs5 = "Cs5",
  Ds5 = "Ds5",
  Es5 = "Es5",
  Fs5 = "Fs5",
  Gs5 = "Gs5",
  As5 = "As5",
  Bs5 = "Bs5",
  Cs6 = "Cs6",
  Ds6 = "Ds6",
  Es6 = "Es6",
  Fs6 = "Fs6",
  Gs6 = "Gs6",
  As6 = "As6",

  Eb1 = "Eb1",
  Fb1 = "Fb1",
  Gb1 = "Gb1",
  Ab1 = "Ab1",
  Bb1 = "Bb1",
  Cb2 = "Cb2",
  Db2 = "Db2",
  Eb2 = "Eb2",
  Fb2 = "Fb2",
  Gb2 = "Gb2",
  Ab2 = "Ab2",
  Bb2 = "Bb2",
  Cb3 = "Cb3",
  Db3 = "Db3",
  Eb3 = "Eb3",
  Fb3 = "Fb3",
  Gb3 = "Gb3",
  Ab3 = "Ab3",
  Bb3 = "Bb3",
  Cb4 = "Cb4",
  Db4 = "Db4",
  Eb4 = "Eb4",
  Fb4 = "Fb4",
  Gb4 = "Gb4",
  Ab4 = "Ab4",
  Bb4 = "Bb4",
  Cb5 = "Cb5",
  Db5 = "Db5",
  Eb5 = "Eb5",
  Fb5 = "Fb5",
  Gb5 = "Gb5",
  Ab5 = "Ab5",
  Bb5 = "Bb5",
  Cb6 = "Cb6",
  Db6 = "Db6",
  Eb6 = "Eb6",
  Fb6 = "Fb6",
  Gb6 = "Gb6",
  Ab6 = "Ab6",
}

export const keyboardWidth = "85rem";

const numberOfWhiteKeys = Object.keys(bassNotes).length;

export const whiteKeyWidth = 100 / numberOfWhiteKeys + "%";
export const whiteKeyMinWidth = "4.5rem";

export const blackKeyWidth = "70%";

export enum presets {
  CUSTOM = "Custom",
  CPOSITION = "C position",
  MIDDLECPOSITION = "Middle C position",
  GPOSITION = "G position",
  NOTESONSTAFF = "Notes on staff",
  NOTERSBELOWSTAFF = "Notes below staff",
  NOTESABOVESTAFF = "Notes above staff",
}
