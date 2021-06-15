import * as React from "react";
import Flat from "../components/Flat";
import LowestBlackKey from "./LowestBlackKey";
import WhiteKeyComp from "./WhiteKeyComp";

type WhiteKeyWithNoBlackKeyProps = {
  note: string;
  ind: number;
  selectedNote: string;
  setSelectedNote: React.Dispatch<React.SetStateAction<string>>;
  thisWhiteKeyIsSelected: (note: string, ind: number) => boolean;
  thisBlackKeyIsSelected: (note: string, ind: number) => boolean;
  handleWhiteFlat: (event: React.SyntheticEvent, ind: number) => void;
};

const WhiteKeyWithNoBlackKey: React.FC<WhiteKeyWithNoBlackKeyProps> = ({
  note,
  ind,
  selectedNote,
  setSelectedNote,
  thisWhiteKeyIsSelected,
  thisBlackKeyIsSelected,
  handleWhiteFlat,
}) => {
  return (
    <>
      <WhiteKeyComp
        note={note}
        ind={ind}
        handleWhiteAccidental={handleWhiteFlat}
        thisWhiteKeyIsSelected={thisWhiteKeyIsSelected}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        keyNames="BE"
      >
        <Flat width={13} fill="black" />
      </WhiteKeyComp>

      {/* Special case for lowest note on keyboard*/}
      {ind === 0 ? (
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

export default WhiteKeyWithNoBlackKey;
