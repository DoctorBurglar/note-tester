import * as React from "react";

export interface IKeyboardProps {
  selectedClef: string;
  selectedNote: string;
  setSelectedNote: (note: string) => void;
  displayingNotes: boolean;
}

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
}

interface IMnemonics {
  showLinesOnStaff: boolean;
  showSpacesOnStaff: boolean;
}
