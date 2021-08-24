export const initialState = {
  code: "",
  players: [],
  showAddNewModal: false,
  showNewGameModal: true,
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "togglePlayerModal":
      return { ...state, showAddNewModal: !state.showAddNewModal };
    case "toggleGameModal":
      return { ...state, showNewGameModal: !state.showAddNewModal };
    case "loadRoom":
      return { ...state, players: action.payload };
    case "setCode":
      return { ...state, code: action.payload, showNewGameModal: false };
    case "addPlayer":
      return {
        ...state,
        players: [...state.players, action.payload],
        showAddNewModal: false,
      };
    case "deletePlayer":
      const players = state.players.filter(
        player => player.id !== action.payload
      );

      return {
        ...state,
        players,
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
