import { legacy_createStore as createStore } from "redux";
const initial = {
    gameOver: false,
    matrix: [
        [0, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 2, 0],
        [0, 0, 0, 0],
    ],
    highScore: 0,
};

const rootReducer = (state = initial, action) => {
    switch (action.type) {
        case "set/matrix":
            return { ...state, matrix: action.payload };
        case "set/highscore":
            return { ...state, highScore: action.payload };
        case "set/endgame":
            return { ...state, gameOver: action.payload };
        default:
            return state;
    }
};
export const store = createStore(rootReducer);
