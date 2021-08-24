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
import { db, serverTimestamp } from "./firebase";

export const NewGameModal = ({ isOpen, onSuccess, onClose }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef();

  const handleCreateRoom = () => {
    if (code.length === 4) {
      const roomRef = db.collection("score-keeper-rooms").doc(code);

      roomRef.get().then(doc => {
        if (!doc.exists) {
          roomRef
            .set({ createdAt: serverTimestamp(), players: [] })
            .then(() => {
              onSuccess(code);
              setCode("");
              setError(false);
            })
            .catch(() => setError("Error creating your room. Try again."));
        } else {
          setError("Room already exists. Join room instead.");
        }
      });
    } else {
      setError("A 4 digit code is required");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Start or Join a Room</ModalHeader>
        <ModalBody textAlign="center">
          <p style={{ marginBottom: 15 }}>
            Enter an existing room code or start a new room.
          </p>
          <Input
            isInvalid={error}
            onChange={e => setCode(e.target.value)}
            onKeyPress={e => {
              if (e.key === "Enter") onSuccess(code);
            }}
            placeholder="Room Code(4 digits)"
            ref={inputRef}
            textAlign="center"
            value={code}
            width="75%"
          />
          <p style={{ color: "red" }}>{error}</p>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              if (code.length !== 4) {
                return setError("A 4 digit code is required");
              }
              const room = db.collection("score-keeper-rooms").doc(code);

              room.get().then(doc => {
                if (!doc.exists) {
                  return setError("Room doesn't exists");
                } else {
                  onSuccess(code);
                  setCode("");
                  setError(false);
                }
              });
            }}
          >
            Join
          </Button>
          <Button colorScheme="green" mr={3} onClick={handleCreateRoom}>
            New
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
