import * as React from "react";
import {
  Flex,
  Heading,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

const GuestScore: React.FC<{
  canControl?: boolean;
  totalNotes: number;
  identifiedNotes: number;
  reset: () => void;
}> = ({totalNotes, identifiedNotes, canControl, reset}) => {
  const handleResetScore = () => {
    reset();
    onClose();
  };

  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <>
      {totalNotes === undefined ? (
        <Spinner size="xl" margin="1rem 0 0 0" />
      ) : (
        <Flex
          align={{base: "flex-start", md: "center"}}
          // direction={{base: "column", md: "row"}}
          zIndex="5"
          onClick={canControl ? onOpen : () => {}}
          cursor="pointer"
          w="100%"
        >
          <Flex align="center">
            <Heading
              as="h2"
              fontSize={{base: "1.5rem", md: "2rem"}}
              marginRight="1rem"
            >
              Score:
            </Heading>
            <Heading
              as="h2"
              fontSize={{base: "1.5rem", md: "2rem"}}
              color={canControl ? "var(--main-color-dark)" : "black"}
              _hover={{color: canControl ? "var(--main-color-very-dark)" : ""}}
            >{`${identifiedNotes} / ${totalNotes}`}</Heading>
          </Flex>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent alignSelf="center">
              <ModalHeader>Reset Score?</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Heading as="h2" textAlign="center" fontWeight="400">
                  Score: {`${identifiedNotes} / ${totalNotes}`}
                </Heading>
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  bg="var(--main-color-dark)"
                  color="white"
                  mr={3}
                  onClick={handleResetScore}
                >
                  Reset score
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      )}
    </>
  );
};

export {GuestScore};
