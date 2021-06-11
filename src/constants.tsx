export enum clefs {
  TREBLE = "TREBLE",
  BASS = "BASS",
}

// source of truth for line height and note height.  If changed position of treble and bass clefs have to be adjusted
export const lineHeight = "3rem";

export const lineHeightInt = Number.parseInt(lineHeight);

export const positionAdjustment = 0.2;

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

export const keyboardWidth = "85rem";

const numberOfWhiteKeys = Object.keys(bassNotes).length;

export const keyWidth = Number.parseFloat(keyboardWidth) / numberOfWhiteKeys;
