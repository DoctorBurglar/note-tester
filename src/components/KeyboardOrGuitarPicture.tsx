import * as React from "react";
import {Flex, Image} from "@chakra-ui/react";
import {useToggleBooleanEveryTenSeconds} from "../hooks";

const KeyboardOrGuitarPicture = () => {
  const [showGuitar, setShowGuitar] = React.useState(false);

  useToggleBooleanEveryTenSeconds(setShowGuitar);

  return (
    <Flex overflowX="hidden">
      <Image
        w="100%"
        marginTop={{base: "", md: "2rem", lg: "2rem", xl: "2rem"}}
        transform={showGuitar ? "translateX(0)" : "translateX(-100%)"}
        opacity={showGuitar ? "1" : "0"}
        transition="all 1s ease"
        src="https://storage.googleapis.com/teach-me-notes/teach_me_notes_guitar.png"
      ></Image>

      <Image
        w="100%"
        marginTop={{base: "", md: "2rem", lg: "2rem", xl: "2rem"}}
        transform={showGuitar ? "translateX(0)" : "translateX(-100%)"}
        opacity={showGuitar ? "0" : "1"}
        transition="all 1s ease"
        src="https://storage.googleapis.com/teach-me-notes/teach_me_notes_keyboard.png"
      ></Image>
    </Flex>
  );
};

export {KeyboardOrGuitarPicture};
