import React, { useRef, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";

export const NewModal = ({ isOpen, onAddPlayer, onClose }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef();

  const handleSubmit = () => {
    if (name === "") {
      setError(true);
    } else {
      onAddPlayer({ name, score: 0 });
      setName("");
      setError(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody textAlign="center">
          <p style={{ marginBottom: 15 }}>Enter a new player below.</p>
          <Input
            isInvalid={error}
            onChange={e => setName(e.target.value)}
            onKeyPress={e => {
              if (e.key === "Enter") handleSubmit();
            }}
            placeholder="Player's Name Required"
            ref={inputRef}
            textAlign="center"
            value={name}
            width="75%"
          />
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} variant="ghost">
            Cancel
          </Button>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
