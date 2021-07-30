import * as React from "react";
import {useSession} from "../hooks";
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
  sessionId: string;
  canControl?: boolean;
}> = ({sessionId, canControl}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const {sessionDoc, sessionRef} = useSession(sessionId);

  React.useEffect(() => {
    if (sessionDoc) {
      setIsLoading(false);
    }
  }, [sessionDoc]);

  const handleResetScore = () => {
    sessionRef.update({
      identifiedNotes: 0,
      totalNotes: 0,
      answer: "",
      answerStatus: "",
    });
    onClose();
  };

  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <>
      {isLoading ? (
        <Spinner size="xl" margin="1rem 0 0 0" />
      ) : (
        <Flex
          align={{base: "flex-start", md: "center"}}
          // direction={{base: "column", md: "row"}}
          position="relative"
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
              _hover={{color: "var(--main-color-very-dark)"}}
            >{`${sessionDoc?.identifiedNotes} / ${sessionDoc?.totalNotes}`}</Heading>
          </Flex>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent alignSelf="center">
              <ModalHeader>Reset Score?</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Heading as="h2" textAlign="center" fontWeight="400">
                  Score:{" "}
                  {`${sessionDoc?.identifiedNotes} / ${sessionDoc?.totalNotes}`}
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

export default GuestScore;
