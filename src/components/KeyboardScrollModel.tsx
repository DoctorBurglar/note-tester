import * as React from "react";
import {Flex} from "@chakra-ui/react";
import {
  determineBlackKeyBackgroundColor,
  determineWhiteKeyBackgroundColor,
} from "../helpers";
import {useWindowSize} from "../hooks";
import {whiteKeyMinWidth} from "../constants";
import {MiddleCLabelForScrollModel} from "./MiddleCLabelForScrollModel";
import {WhiteKeyForScrollModel} from "./WhiteKeyForScrollModel";
import {LowestBlackKeyForScrollModel} from "./LowestBlackKeyForScrollModel";
import {BlackKeyForScrollModel} from "./BlackKeyForScrollModel";
import {BoxSliderForScrollModel} from "./BoxSliderForScrollModel";

type KeyboardScrollModelProps = {
  notes: string[];
  selectedNote: string;
  answer: string;
  answerStatus: string;
  isGuestKeyboard: boolean;
  scrollLeft: number;
  keyboardRef: React.RefObject<HTMLDivElement>;
  thisWhiteKeyIsSelected: (note: string, ind: number) => boolean;
  thisBlackKeyIsSelected: (note: string, ind: number) => boolean;
};

const KeyboardScrollModel: React.FC<KeyboardScrollModelProps> = ({
  notes,
  selectedNote,
  answer,
  answerStatus,
  isGuestKeyboard,
  scrollLeft,
  thisWhiteKeyIsSelected,
  thisBlackKeyIsSelected,
  keyboardRef,
}) => {
  const {width: windowWidth} = useWindowSize();

  const remInPixels = Number.parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  const viewBoxWidth =
    (windowWidth /
      (Number.parseFloat(whiteKeyMinWidth) * notes.length * remInPixels)) *
      100 +
    "%";
  const viewBoxWidthInverse = 100 - Number.parseFloat(viewBoxWidth) + "%";

  let maxScrollLeft = 0;
  let scrollPercentage = 0;
  if (keyboardRef.current) {
    maxScrollLeft =
      keyboardRef.current?.scrollWidth - keyboardRef.current?.clientWidth;
    scrollPercentage = scrollLeft / maxScrollLeft;
  }

  return (
    <>
      {maxScrollLeft === 0 ? null : (
        <>
          <Flex
            w="100vw"
            maxWidth="60rem"
            boxSizing="border-box"
            margin="-1rem auto"
            position="relative"
            marginBottom="1rem"
          >
            <BoxSliderForScrollModel
              scrollPercentage={scrollPercentage}
              viewBoxWidth={viewBoxWidth}
              viewBoxWidthInverse={viewBoxWidthInverse}
            />
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

                  {note[0] !== "C" &&
                  note[0] !== "F" &&
                  notes.indexOf(note) === 0 ? (
                    <LowestBlackKeyForScrollModel />
                  ) : null}

                  {note === "C4" ? <MiddleCLabelForScrollModel /> : null}
                </WhiteKeyForScrollModel>
              ))}
            </Flex>
          </Flex>
        </>
      )}
    </>
  );
};

export default KeyboardScrollModel;
