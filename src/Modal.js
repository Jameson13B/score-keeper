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

export const NewModal = ({
  isOpen,
  onAddPlayer,
  onClose,
  onDeletePlayer,
  players,
}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef();

  const handleSubmit = () => {
    if (name === "") {
      setError(true);
    } else {
      onAddPlayer({ name, score: 0, id: players.length - 1 });
      setName("");
      setError(false);
    }
  };
  const handleDeletePlayer = id => {
    onDeletePlayer(id);
    setName("");
    setError(false);
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
                  <Tr key={player.id}>
                    <Td>{player.name}</Td>
                    <Td>
                      <IconButton
                        aria-label="Delete Player"
                        color="red"
                        icon={<DeleteIcon />}
                        onClick={() => handleDeletePlayer(player.id)}
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
