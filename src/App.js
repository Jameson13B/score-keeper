import React, { useEffect, useReducer } from "react";
import { PlayerCard } from "./PlayerCard";
import { NewModal } from "./Modal";
import { NewGameModal } from "./NewGameModal";
import { Button } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, RepeatIcon } from "@chakra-ui/icons";
import { db } from "./firebase";
import { initialState, reducer } from "./State";

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const styles = getStyles();

  useEffect(() => {
    if (state.code) {
      db.collection("score-keeper-rooms")
        .doc(state.code)
        .onSnapshot(res => {
          dispatch({
            type: "loadRoom",
            payload: res.exists ? res.data().players : [],
          });
        });
    }
  }, [state.code]);

  const handleResetScores = () => {
    if (window.confirm("Do you really want to reset all scores?")) {
      dispatch({
        type: "updateScore",
        payload: state.players.map(player => ({
          ...player,
          score: 0,
        })),
      });
    }
  };
  const handleResetApp = () => {
    if (window.confirm("Do you really want to reset the app?")) {
      db.collection("score-keeper-rooms")
        .doc(state.code)
        .delete()
        .then(() => {
          dispatch({ type: "resetApp" });
        });
    }
  };

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <h1 style={styles.title}>Winner Winner</h1>
        <h3
          onClick={() => {
            if (window.confirm("Do you really want to reset the app?")) {
              dispatch({ type: "resetApp" });
            }
          }}
          style={styles.code}
        >
          Code: {state.code}
        </h3>

        <div style={styles.buttonGroup}>
          <Button
            colorScheme="whiteAlpha"
            onClick={handleResetScores}
            size="sm"
          >
            <RepeatIcon />
          </Button>
          <Button
            colorScheme="whiteAlpha"
            marginLeft="10px"
            onClick={handleResetApp}
            size="sm"
          >
            <DeleteIcon />
          </Button>
          <Button
            colorScheme="whiteAlpha"
            marginLeft="10px"
            onClick={() => dispatch({ type: "togglePlayerModal" })}
            size="sm"
          >
            <EditIcon />
          </Button>
        </div>
      </div>

      {state.players.length === 0 && (
        <h4>No players currently added. Start by adding one.</h4>
      )}

      {state.players.length > 0 && (
        <div style={styles.list}>
          {state.players.map((player, i) => (
            <PlayerCard code={state.code} key={i} player={player} />
          ))}
          <h1 style={{ margin: "30px 0" }}>Chicken Dinner</h1>
        </div>
      )}

      <NewModal
        code={state.code}
        isOpen={state.showAddNewModal}
        onClose={() => dispatch({ type: "togglePlayerModal" })}
        players={state.players}
      />
      <NewGameModal
        isOpen={state.showNewGameModal}
        onSuccess={code => dispatch({ type: "setCode", payload: code })}
        onClose={() => dispatch({ type: "toggleGameModal" })}
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
  code: {
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "italic",
    marginLeft: 15,
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
