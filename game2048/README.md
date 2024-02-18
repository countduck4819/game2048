# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
















import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { move } from "./active/move";
function App() {
    const board = useSelector((state) => state.matrix);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(123);
        document.addEventListener("keyup", async (e) => {
            const { boardData, convert } = move(e.code, board);
            if (convert === true) {
                await dispatch({
                    type: "set/matrix",
                    payload: boardData,
                });
            }
        });
    });
    return (
        <>
            <h1>2048</h1>
            <hr />
            <h2>
                Score: <span id="score">0</span>
            </h2>
            <div className="board">
                {board.map((row, index) => {
                    // console.log(dataBoard);
                    return row.map((element, elementIndex) => {
                        if (element === 0) {
                            return (
                                <div
                                    key={index + "-" + elementIndex}
                                    id={index + "-" + elementIndex}
                                    className="tile"
                                ></div>
                            );
                        }
                        return (
                            <div
                                key={index + "-" + elementIndex}
                                id={index + "-" + elementIndex}
                                className={
                                    element >= 4096
                                        ? clsx("tile ", `x8192`)
                                        : clsx("tile ", `x${element}`)
                                }
                            >
                                {element}
                            </div>
                        );
                    });
                })}
            </div>
        </>
    );
}

export default App;

































function transformLine(line, check) {
    // remove element === 0
    let newLine = line.filter((element, _) => element !== 0);
    if (check === true) {
        newLine.reverse();
    }

    for (let i = 0; i < newLine.length - 1; i++) {
        if (newLine[i] !== 0) {
            if (newLine[i] === newLine[i + 1]) {
                newLine[i] *= 2;
                newLine[i + 1] = 0;
            }
        } else continue;
    }

    while (newLine.length < line.length) {
        newLine.push(0);
    }

    if (check === true) {
        newLine.reverse();
    }
    return newLine;
}

// take event when keyup
export function move(direction, board) {
    let diffBoard = board.map((values) => values.map((value) => value));
    let convert = false;
    // when arrowUp or arrowDown
    if (direction === "ArrowUp" || direction === "ArrowDown") {
        for (let j = 0; j < diffBoard.length; j++) {
            let col = [];
            for (let i = 0; i < diffBoard.length; i++) {
                col.push(diffBoard[i][j]);
            }
            const newCol = transformLine(col, direction === "ArrowDown");
            if (JSON.stringify(newCol) !== JSON.stringify(col)) {
                convert = true;
                for (let c = 0; c < newCol.length; c++) {
                    diffBoard[j][c] = newCol[c];
                }
            }
        }
    } // when arrowRight or arrowLeft
    else if (direction === "ArrowRight" || direction === "ArrowLeft") {
        for (let i = 0; i < diffBoard.length; i++) {
            const row = diffBoard[i];
            // create newRow
            const newRow = transformLine(row, direction === "ArrowRight");
        }
    }

    return {
        convert: convert,
        boardData: diffBoard,
    };
}










