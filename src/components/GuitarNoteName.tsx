import * as React from "react";
import {Heading} from "@chakra-ui/react";
import {IGuitarNote} from "../interfacesAndTypes";

type GuitarNoteNameProps = {
  note: IGuitarNote;
  displayingNotes: boolean;
};

const GuitarNoteName: React.FC<GuitarNoteNameProps> = ({
  note,
  displayingNotes,
}) => {
  return (
    <>
      {displayingNotes && note.name[1] !== "s" ? (
        <Heading
          as="h3"
          position="absolute"
          top="58%"
          left="50%"
          transform="translate(-50%, -50%)"
          fontSize="2rem"
          w="2.5rem"
          h="2.5rem"
          textAlign="center"
          className="note-name"
          bg={
            note.name[0] === "C" && note.name[1] === "4"
              ? "var(--main-color)"
              : "white"
          }
          borderRadius="50%"
          opacity=".6"
        >
          {note.name[0]}
        </Heading>
      ) : null}
    </>
  );
};

export {GuitarNoteName};
