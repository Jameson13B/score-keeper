import React, { useReducer } from "react";
import { PlayerCard } from "./PlayerCard";
import { NewModal } from "./Modal";
import { Button } from "@chakra-ui/react";

const initialState = {
  players: [],
  showAddNewModal: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "toggleModal":
      return { ...state, showAddNewModal: !state.showAddNewModal };
    case "addPlayer":
      return {
        ...state,
        players: [...state.players, action.payload],
        showAddNewModal: false,
      };
    case "updateScore":
      return { ...state, players: action.payload };
    case "resetApp":
      return initialState;
    default:
      return state;
  }
};

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const styles = getStyles();

  // Check before navigating away to prevent accidentally losing data
  window.onbeforeunload = e => {
    e.preventDefault();
    return "Are you sure you want to leave? You will lose all data.";
  };

  const handleScoreUpdate = (score, i) => {
    const players = [...state.players];

    players[i] = { ...state.players[i], score };

    dispatch({ type: "updateScore", payload: players });
  };

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <h1 style={styles.title}>Score Keeper</h1>
        <div style={styles.buttonGroup}>
          <Button
            colorScheme="whiteAlpha"
            onClick={() => {
              if (window.confirm("Do you really want to reset the app?")) {
                dispatch({ type: "resetApp" });
              }
            }}
            size="sm"
          >
            Reset
          </Button>
          <Button
            colorScheme="whiteAlpha"
            marginLeft="10px"
            onClick={() => dispatch({ type: "toggleModal" })}
            size="sm"
          >
            Add Player
          </Button>
        </div>
      </div>

      {state.players.length === 0 && (
        <h4>No players currently added. Start by adding one.</h4>
      )}

      {state.players.length > 0 && (
        <div style={styles.list}>
          {state.players.map((player, i) => (
            <PlayerCard
              index={i}
              key={i}
              onSubmit={handleScoreUpdate}
              player={player}
            />
          ))}
          <h1 style={{ margin: "30px 0" }}>End Of List</h1>
        </div>
      )}

      <NewModal
        isOpen={state.showAddNewModal}
        onAddPlayer={player => dispatch({ type: "addPlayer", payload: player })}
        onClose={() => dispatch({ type: "toggleModal" })}
      />
    </div>
  );
};

const getStyles = () => ({
  app: {
    textAlign: "center",
  },
  header: {
    background: "#c55",
    color: "white",
    height: "8vh",
    padding: "15px 10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  list: {
    height: "90vh",
    overflow: "scroll",
  },
});
