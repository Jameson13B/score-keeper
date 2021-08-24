import React, { useRef, useState } from "react";
import {
  Button,
  Divider,
  IconButton,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { db, addArray, removeArray } from "./firebase";

export const NewModal = ({ code, isOpen, onClose, players }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const inputRef = useRef();

  const handleSubmit = () => {
    if (name === "") {
      setError(true);
    } else {
      db.collection("score-keeper-rooms")
        .doc(code)
        .update({ players: addArray({ name, score: 0 }) })
        .then(() => {
          setName("");
          setError(null);
        });
    }
  };
  const handleDeletePlayer = delPlayer => {
    db.collection("score-keeper-rooms")
      .doc(code)
      .update({
        players: removeArray({ name: delPlayer.name, score: delPlayer.score }),
      })
      .then(() => {
        setName("");
        setError(null);
      });
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
        <Divider w="90%" mx="auto" mb="20px" />
        <ModalBody>
          {players.length > 0 ? (
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Player</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {players.map(player => (
                  <Tr key={player.name}>
                    <Td>{player.name}</Td>
                    <Td>
                      <IconButton
                        aria-label="Delete Player"
                        color="red"
                        icon={<DeleteIcon />}
                        onClick={() => handleDeletePlayer(player)}
                        variant="ghost"
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <p>No players added. Add some above.</p>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
