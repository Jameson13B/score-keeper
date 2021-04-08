import React, { useState } from "react";
import { IconButton, Input } from "@chakra-ui/react";
import { AddIcon, CheckIcon, MinusIcon } from "@chakra-ui/icons";

export const PlayerCard = ({ index, onSubmit, player }) => {
  const styles = getStyles();
  const [score, setScore] = useState(0);

  return (
    <div style={styles.container}>
      <div style={styles.leftGroup}>
        <h1 style={styles.name}>{player.name}</h1>
        <h2 style={styles.score}>{player.score}</h2>
      </div>
      <div style={styles.rightGroup}>
        <IconButton
          colorScheme="blue"
          icon={<MinusIcon />}
          onClick={() => setScore(score - 1)}
          size="sm"
        />
        <Input
          inputMode="numeric"
          maxWidth="40px"
          onBlur={() => score === "" && setScore(0)}
          onChange={e =>
            setScore(
              e.target.value.length ? parseInt(e.target.value) : e.target.value
            )
          }
          onFocus={() => setScore("")}
          pl="5px"
          pr="5px"
          size="md"
          textAlign="center"
          value={score}
        />
        <IconButton
          colorScheme="blue"
          icon={<AddIcon />}
          onClick={() => setScore(score + 1)}
          size="sm"
        />
        <IconButton
          colorScheme="green"
          icon={<CheckIcon />}
          ml={15}
          onClick={() => {
            onSubmit(player.score + score, index);
            setScore(0);
          }}
          size="sm"
        />
      </div>
    </div>
  );
};

const getStyles = () => ({
  container: {
    display: "flex",
    border: "1px solid black",
    borderRadius: 5,
    margin: 10,
    padding: "5px 10px",
    textAlign: "left",
  },
  leftGroup: {
    width: "45%",
  },
  name: {
    fontSize: 25,
    margin: "0 0 5px 0",
  },
  score: {
    fontSize: 35,
    margin: "0 0 0 15px",
  },
  rightGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: "20px 0",
    width: "55%",
  },
});
