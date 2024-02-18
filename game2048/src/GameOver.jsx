import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { randomTwoPlace } from "./active/move";

function GameOver({ resetScore }) {
    const endGame = useSelector((state) => state.gameOver);
    const highScore = useSelector((state) => state.highScore);
    const [checkGameOver, setCheckGameOver] = useState(endGame);
    const board = useSelector((state) => state.matrix);
    const dispatch = useDispatch();
    async function gameOver(board) {
        if (checkGameOver === false) {
            for (let i = 0; i < board.length; i++) {
                const size = board[i].length;
                for (let j = 0; j < size; j++) {
                    if (board[i][j] === 0) return;
                    if (j < size - 1 && board[i][j] === board[i][j + 1]) return;
                    if (i < size - 1 && board[i][j] === board[i + 1][j]) return;
                }
            }
            await setCheckGameOver(true);
            await dispatch({
                type: "set/endgame",
                payload: true,
            });
        }
    }
    async function handleClick(e) {
        e.preventDefault();
        const newArray = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        const array = randomTwoPlace(4);
        array.forEach((value, _) => {
            newArray[value.x][value.y] = Math.random() < 0.91 ? 2 : 4;
        });
        await dispatch({
            type: "set/endgame",
            payload: false,
        });
        await dispatch({
            type: "set/matrix",
            payload: newArray,
        });
        await setCheckGameOver(false);

        if (!localStorage.getItem("high_score_2048")) {
            console.log(highScore);
            localStorage.setItem("high_score_2048", JSON.stringify(highScore));
        } else {
            if (
                highScore > JSON.parse(localStorage.getItem("high_score_2048"))
            ) {
                localStorage.setItem(
                    "high_score_2048",
                    JSON.stringify(highScore)
                );
            }
        }
        resetScore();
    }
    gameOver(board);
    return (
        <>
            {checkGameOver ? (
                <>
                    <div className="game-over">
                        <div>Game Over!</div>
                        <button className="restart-btn" onClick={handleClick}>
                            Restart Game
                        </button>
                    </div>
                </>
            ) : (
                <></>
            )}
        </>
    );
}

export default memo(GameOver);
