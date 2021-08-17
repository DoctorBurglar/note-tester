import * as React from "react";
import {useUser, useFirestore, useFirestoreDocData} from "reactfire";
import {IGuitarNote, IUser} from "../interfacesAndTypes";
import {ScrollModel} from "./ScrollModel";
import {GuitarForScrollModel} from "./GuitarForScrollModel";
import {GuitarMain} from "./GuitarMain";

type GuitarProps = {
  isGuestGuitar?: boolean;
  handleSelectNote: (note: IGuitarNote) => void;
  selectedNote: string;
  answer: string;
  answerStatus: string;
  displayingNotes: boolean;
  selectedString: number;
  displayingFretNumbers: boolean;
  noteRangeAllowsDuplicates: boolean;
  setAnswerStatus: React.Dispatch<React.SetStateAction<string>>;
};

const Guitar: React.FC<GuitarProps> = ({
  handleSelectNote,
  selectedNote,
  answer,
  answerStatus,
  displayingNotes,
  selectedString,
  displayingFretNumbers,
  noteRangeAllowsDuplicates,
  setAnswerStatus,
}) => {
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const [userClickedOutOfRange, setUserClickedOutOfRange] =
    React.useState(false);

  const guitarRef = React.useRef<HTMLDivElement>(null)!;

  const {data} = useUser();

  const userRef = useFirestore().collection("users").doc(data.uid);

  const userDoc = useFirestoreDocData<IUser>(userRef).data;

  const fretIsInRange = (outerInd: number, innerInd: number) => {
    return (
      outerInd + 1 <= userDoc?.guitarSettings.lowString &&
      outerInd + 1 >= userDoc?.guitarSettings.highString &&
      innerInd >= userDoc?.guitarSettings.lowFret &&
      innerInd <= userDoc?.guitarSettings.highFret
    );
  };

  const handleScroll = (event: React.SyntheticEvent) => {
    setScrollLeft(event.currentTarget.scrollLeft);
  };

  return (
    <>
      <ScrollModel
        originalComponentWidthInRem={80}
        scrollLeft={scrollLeft}
        componentRef={guitarRef}
      >
        <GuitarForScrollModel
          displayingFretNumbers={displayingFretNumbers}
          fretIsInRange={fretIsInRange}
          noteRangeAllowsDuplicates={noteRangeAllowsDuplicates}
          selectedString={selectedString}
          answer={answer}
          answerStatus={answerStatus}
          selectedNote={selectedNote}
          userClickedOutOfRange={userClickedOutOfRange}
        />
      </ScrollModel>
      <GuitarMain
        displayingFretNumbers={displayingFretNumbers}
        displayingNotes={displayingNotes}
        fretIsInRange={fretIsInRange}
        guitarRef={guitarRef}
        handleScroll={handleScroll}
        handleSelectNote={handleSelectNote}
        noteRangeAllowsDuplicates={noteRangeAllowsDuplicates}
        selectedString={selectedString}
        setAnswerStatus={setAnswerStatus}
        selectedNote={selectedNote}
        answer={answer}
        answerStatus={answerStatus}
        userClickedOutOfRange={userClickedOutOfRange}
        setUserClickedOutOfRange={setUserClickedOutOfRange}
      />
    </>
  );
};

export {Guitar};
