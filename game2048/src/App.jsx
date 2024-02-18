import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { move, placeRandom, randomTwoPlace } from "./active/move";
import GameOver from "./GameOver";
function App() {
    const dispatch = useDispatch();
    const board = useSelector((state) => state.matrix);
    const highScore = useSelector((state) => state.highScore);
    const checkEndGame = useSelector((state) => state.gameOver);
    const [score, setScore] = useState(0);
    // const [newGame, setNewGame] = useState(false);
    async function eventMove(e) {
        const { boardData, convert, point } = move(e.code, board);
        if (convert === true) {
            const cell = placeRandom(boardData);

            if (cell !== undefined) {
                const animationCell = document.getElementById(
                    `${cell.x}_${cell.y}`
                );
                // animationCell.classList.add("visible");
                Object.assign(animationCell.style, {
                    animation: "vis 0.1s ease-in-out 1",
                });
                setTimeout(() => {
                    // animationCell.classList.remove("visible");
                    animationCell.style = {};
                }, 100);
            }

            await dispatch({
                type: "set/matrix",
                payload: boardData,
            });
            setScore((prev) => prev + point);
            document.removeEventListener("keyup", eventMove);
        }
    }
    function resetScore() {
        setScore(0);
    }
    // async function handleClick(e) {
    //     e.preventDefault();
    //     document.removeEventListener("keyup", eventMove);
    //     if (score > highScore) {
    //         await dispatch({
    //             type: "set/highscore",
    //             payload: score,
    //         });
    //         localStorage.setItem("high_score_2048", JSON.stringify(score));
    //     }

    //     await setNewGame(true);
    //     await setScore(0);
    // }

    // useEffect(() => {
    //     console.log(newGame);
    //     if (newGame === true) {
    //         document.removeEventListener("keyup", eventMove);
    //         async function setMatrix() {
    //             await setNewGame(false);
    //             const newArray = [
    //                 [0, 0, 0, 0],
    //                 [0, 0, 0, 0],
    //                 [0, 0, 0, 0],
    //                 [0, 0, 0, 0],
    //             ];
    //             const array = randomTwoPlace(4);
    //             array.forEach((value, _) => {
    //                 newArray[value.x][value.y] = Math.random() < 0.91 ? 2 : 4;
    //             });
    //             console.log(newGame);

    //             // await dispatch({
    //             //     type: "set/matrix",
    //             //     payload: newArray,
    //             // });

    //             console.log(board);
    //         }
    //         setMatrix();
    //         document.addEventListener("keyup", eventMove);
    //         console.log(board);
    //     }
    // }, [newGame, board]);

    useEffect(() => {
        if (checkEndGame === true) {
            console.log(123);
            document.removeEventListener("keyup", eventMove);
            if (score > highScore) {
                dispatch({
                    type: "set/highscore",
                    payload: score,
                });
            }
            return;
        } else {
            // if (newGame === true) {
            // document.removeEventListener("keyup", eventMove);
            //     return;
            // }
            document.addEventListener("keyup", eventMove);
        }
    }, [board, checkEndGame]);
    useLayoutEffect(() => {
        if (localStorage.getItem("high_score_2048")) {
            document.querySelector("#high-score").innerText = JSON.parse(
                localStorage.getItem("high_score_2048")
            );
            dispatch({
                type: "set/highscore",
                payload: JSON.parse(localStorage.getItem("high_score_2048")),
            });
        }
    }, []);
    return (
        <>
            <div className="action">
                <h1>2048</h1>
                <button className="newGame">New Game</button>
            </div>
            <div className="score-container">
                <div>
                    Score : <span id="current-score">{score}</span>
                </div>
                <div>
                    High Score : <span id="high-score">{highScore}</span>
                </div>
            </div>
            <div className="game-container">
                <div className="board grid">
                    {board.map((row, index) => {
                        return row.map((element, elementIndex) => {
                            if (element === 0) {
                                return (
                                    <div
                                        key={index + "_" + elementIndex}
                                        id={index + "_" + elementIndex}
                                        className="tile"
                                    ></div>
                                );
                            }
                            return (
                                <div
                                    key={index + "_" + elementIndex}
                                    id={index + "_" + elementIndex}
                                    className={
                                        element >= 4096
                                            ? clsx("tile", `x8192`)
                                            : clsx("tile", `x${element}`)
                                    }
                                >
                                    {element}
                                </div>
                            );
                        });
                    })}
                </div>
            </div>
            <GameOver score={score} resetScore={resetScore}></GameOver>
        </>
    );
}

export default App;
