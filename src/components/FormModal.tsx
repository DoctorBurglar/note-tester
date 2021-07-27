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
  submitText: string;
  cancelButton?: boolean;
};

const AutoQuizModal: React.FC<AutoQuizModalProps> = ({
  children,
  isOpen,
  handleModalClose,
  handleQuiz,
  submitText,
  cancelButton,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <ModalOverlay />
      <ModalContent alignSelf="center" minWidth="16rem">
        <ModalHeader fontSize="2rem">Auto Quiz</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          {cancelButton ? (
            <Button variant="ghost" mr={3} onClick={handleModalClose}>
              Cancel
            </Button>
          ) : null}
          <Button colorScheme="blue" onClick={handleQuiz}>
            {submitText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AutoQuizModal;
