import * as React from "react";

export interface IKeyboardProps {
  selectedClef: string;
  selectedNote: string;
  setSelectedNote: React.Dispatch<React.SetStateAction<string>>;
}
