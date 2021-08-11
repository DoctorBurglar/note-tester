import * as React from "react";
import {WhiteKeyForScrollModel} from "./WhiteKeyForScrollModel";
import {BlackKeyForScrollModel} from "./BlackKeyForScrollModel";
import {LowestBlackKeyForScrollModel} from "./LowestBlackKeyForScrollModel";
import {MiddleCLabelForScrollModel} from "./MiddleCLabelForScrollModel";
import {
  determineWhiteKeyBackgroundColor,
  determineBlackKeyBackgroundColor,
} from "../helpers";
import {Flex} from "@chakra-ui/react";

type KeyboardForScrollModelProps = {
  notes: string[];
  selectedNote: string;
  answer: string;
  answerStatus: string;
  isGuestKeyboard: boolean;
  thisWhiteKeyIsSelected: (note: string, ind: number) => boolean;
  thisBlackKeyIsSelected: (note: string, ind: number) => boolean;
};

const KeyboardForScrollModel: React.FC<KeyboardForScrollModelProps> = ({
  notes,
  selectedNote,
  answer,
  answerStatus,
  isGuestKeyboard,
  thisWhiteKeyIsSelected,
  thisBlackKeyIsSelected,
}) => {
  return (
    <Flex w="98%" bottom="0" margin="2rem auto" position="relative">
      {notes.map((note, ind) => (
        <WhiteKeyForScrollModel
          key={note}
          note={note}
          notes={notes}
          background={determineWhiteKeyBackgroundColor(
            notes,
            note,
            ind,
            selectedNote,
            answer,
            answerStatus,
            isGuestKeyboard,
            thisWhiteKeyIsSelected
          )}
        >
          {note[0] !== "B" && note[0] !== "E" ? (
            <BlackKeyForScrollModel
              background={determineBlackKeyBackgroundColor(
                notes,
                note,
                ind,
                selectedNote,
                answer,
                answerStatus,
                isGuestKeyboard,
                thisBlackKeyIsSelected
              )}
            />
          ) : null}

          {note[0] !== "C" && note[0] !== "F" && notes.indexOf(note) === 0 ? (
            <LowestBlackKeyForScrollModel />
          ) : null}

          {note === "C4" ? <MiddleCLabelForScrollModel /> : null}
        </WhiteKeyForScrollModel>
      ))}
    </Flex>
  );
};

export {KeyboardForScrollModel};
