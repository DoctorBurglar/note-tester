import {
  clefs,
  bassNotes,
  trebleNotes,
  lineHeightInt,
  positionAdjustment,
} from "./constants";

export const determineNotePosition = (
  selectedNote: string,
  selectedClef: string
) => {
  let notePosition = "";
  if (selectedClef === clefs.TREBLE) {
    switch (selectedNote) {
      case trebleNotes.A6:
        notePosition = -(13 * lineHeightInt + positionAdjustment) + "rem";
        break;

      //TODO make an enum for accidentals
      case "A#6":
        notePosition = -(13 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.G6:
        notePosition = -(12.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.F6:
        notePosition = -(12 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.E6:
        notePosition = -(11.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.D6:
        notePosition = -(11 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.C6:
        notePosition = -(10.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.B5:
        notePosition = -(10 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.A5:
        notePosition = -(9.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.G5:
        notePosition = -(9 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.F5:
        notePosition = -(8.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.E5:
        notePosition = -(8 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.D5:
        notePosition = -(7.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.C5:
        notePosition = -(7 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.B4:
        notePosition = -(6.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.A4:
        notePosition = -(6 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.G4:
        notePosition = -(5.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.F4:
        notePosition = -(5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.E4:
        notePosition = -(4.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.D4:
        notePosition = -(4 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.C4:
        notePosition = -(3.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.B3:
        notePosition = -(3 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.A3:
        notePosition = -(2.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.G3:
        notePosition = -(2 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.F3:
        notePosition = -(1.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.E3:
        notePosition = -(1 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.D3:
        notePosition = -(0.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case trebleNotes.C3:
        notePosition = -(0 * lineHeightInt + positionAdjustment) + "rem";
        break;
      default:
        notePosition = "";
    }
  } else if (selectedClef === clefs.BASS) {
    switch (selectedNote) {
      case bassNotes.C5:
        notePosition = -(13 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.B4:
        notePosition = -(12.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.A4:
        notePosition = -(12 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.G4:
        notePosition = -(11.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.F4:
        notePosition = -(11 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.E4:
        notePosition = -(10.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.D4:
        notePosition = -(10 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.C4:
        notePosition = -(9.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.B3:
        notePosition = -(9 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.A3:
        notePosition = -(8.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.G3:
        notePosition = -(8 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.F3:
        notePosition = -(7.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.E3:
        notePosition = -(7 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.D3:
        notePosition = -(6.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.C3:
        notePosition = -(6 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.B2:
        notePosition = -(5.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.A2:
        notePosition = -(5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.G2:
        notePosition = -(4.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.F2:
        notePosition = -(4 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.E2:
        notePosition = -(3.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.D2:
        notePosition = -(3 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.C2:
        notePosition = -(2.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.B1:
        notePosition = -(2 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.A1:
        notePosition = -(1.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.G1:
        notePosition = -(1 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.F1:
        notePosition = -(0.5 * lineHeightInt + positionAdjustment) + "rem";
        break;
      case bassNotes.E1:
        notePosition = -(0 * lineHeightInt + positionAdjustment) + "rem";
        break;

      default:
        notePosition = "";
    }
  }

  return notePosition;
};
