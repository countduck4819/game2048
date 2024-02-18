import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { move } from "./active/move";
function App() {
    const board = useSelector((state) => state.matrix);
    console.log(board);
    const dispatch = useDispatch();

    useEffect(() => {
        document.addEventListener("keyup", async (e) => {
            const { boardData, convert } = move(e.code, board);
            console.log(boardData, convert);
            if (convert === true) {
                console.log(123)
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
    let convert = false;
    // when arrowUp or arrowDown
    if (direction === "ArrowUp" || direction === "ArrowDown") {
        for (let j = 0; j < board.length; j++) {
            let col = [];
            for (let i = 0; i < board.length; i++) {
                col.push(board[i][j]);
            }
            const newCol = transformLine(col, direction === "ArrowDown");
            if (JSON.stringify(newCol) !== JSON.stringify(col)) {
                convert = true;
                for (let c = 0; c < newCol.length; c++) {
                    board[j][c] = newCol[c];
                }
            }
        }
    } // when arrowRight or arrowLeft
    else if (direction === "ArrowRight" || direction === "ArrowLeft") {
        for (let i = 0; i < board.length; i++) {
            const row = board[i];
            // create newRow
            const newRow = transformLine(row, direction === "ArrowRight");
        }
    }
    return {
        convert: convert,
        boardData: board,
    };
}

