import * as React from "react";
import Sharp from "../components/Sharp";
import LowestBlackKey from "../components/LowestBlackKey";
import WhiteKeyComp from "../components/WhiteKeyComp";
import BlackKeyComp from "./BlackKeyComp";

type WhiteKeyWithBlackKeyProps = {
  note: string;
  notes: string[];
  ind: number;
  selectedNote: string;
  setSelectedNote: React.Dispatch<React.SetStateAction<string>>;
  thisWhiteKeyIsSelected: (note: string, ind: number) => boolean;
  thisBlackKeyIsSelected: (note: string, ind: number) => boolean;
  handleWhiteFlat: (event: React.SyntheticEvent, ind: number) => void;
  handleWhiteSharp: (event: React.SyntheticEvent, ind: number) => void;
  handleFlat: (ind: number) => void;
};

const WhiteKeyWithBlackKey: React.FC<WhiteKeyWithBlackKeyProps> = ({
  note,
  notes,
  ind,
  selectedNote,
  setSelectedNote,
  thisBlackKeyIsSelected,
  thisWhiteKeyIsSelected,
  handleWhiteSharp,
  handleFlat,
}) => {
  return (
    <>
      <WhiteKeyComp
        note={note}
        ind={ind}
        handleWhiteAccidental={handleWhiteSharp}
        thisWhiteKeyIsSelected={thisWhiteKeyIsSelected}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        keyNames="CF"
      >
        <Sharp fill="black" width={17} height={30} />
      </WhiteKeyComp>

      <BlackKeyComp
        thisBlackKeyIsSelected={thisBlackKeyIsSelected}
        setSelectedNote={setSelectedNote}
        selectedNote={selectedNote}
        note={note}
        ind={ind}
        notes={notes}
        handleFlat={handleFlat}
      />

      {/*Special case lowest black key */}
      {note[0] !== "C" && note[0] !== "F" && ind === 0 ? (
        <LowestBlackKey
          ind={ind}
          note={note}
          setSelectedNote={setSelectedNote}
          selectedNote={selectedNote}
          thisBlackKeyIsSelected={thisBlackKeyIsSelected}
        />
      ) : null}
    </>
  );
};

export default WhiteKeyWithBlackKey;
