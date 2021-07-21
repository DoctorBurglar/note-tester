export interface IUser {
  uid: string;
  email: string;
  hostSessionId: string;
  displayName: string;
  photoURL: string;
}

export interface ISession {
  guestId: string;
  hostId: string;
  identifiedNotes: number;
  totalNotes: number;
  mnemonics: IMnemonics;
  selectedClef: string;
  selectedNote: string;
  answer: string;
  sessionCode: string;
  answerStatus: string;
  displayingNotes: boolean;
  autoQuiz: IAutoQuiz;
}

interface IMnemonics {
  showLinesOnStaff: boolean;
  showSpacesOnStaff: boolean;
}

interface IAutoQuiz {
  on: boolean;
  includeSharps: boolean;
  includeFlats: boolean;
  includeTreble: boolean;
  includeBass: boolean;
  lowTrebleNote: string;
  highTrebleNote: string;
  lowBassNote: string;
  highBassNote: string;
}
