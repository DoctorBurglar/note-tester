import * as React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

type AutoQuizModalProps = {
  isOpen: boolean;
  handleModalClose: () => void;
  handleQuiz: () => void;
};

const AutoQuizModal: React.FC<AutoQuizModalProps> = ({
  children,
  isOpen,
  handleModalClose,
  handleQuiz,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Auto Quiz</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={handleModalClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleQuiz}>
            Start
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AutoQuizModal;
