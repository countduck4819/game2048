function transformLine(line, check, score) {
    // remove element === 0
    let newLine = line.filter((element, _) => element !== 0);
    if (check === true) {
        newLine.reverse();
    }

    for (let i = 0; i < newLine.length - 1; i++) {
        if (newLine[i] !== 0) {
            if (newLine[i] === newLine[i + 1]) {
                newLine[i] *= 2;
                score += newLine[i];
                newLine[i + 1] = 0;
            }
        } else continue;
    }
    newLine = newLine.filter((element) => element !== 0);
    while (newLine.length < line.length) {
        newLine.push(0);
    }

    if (check === true) {
        newLine.reverse();
    }
    return {
        newLine: newLine,
        score: score,
    };
}

// take event when keyup
export function move(direction, board) {
    let point = 0;
    let diffBoard = board.map((values) => values.map((value) => value));
    let convert = false;
    // when arrowUp or arrowDown
    if (direction === "ArrowUp" || direction === "ArrowDown") {
        for (let j = 0; j < diffBoard.length; j++) {
            let col = [];
            for (let i = 0; i < diffBoard.length; i++) {
                col.push(diffBoard[i][j]);
            }
            const { newLine: newCol, score } = transformLine(
                col,
                direction === "ArrowDown",
                0
            );
            point += score;
            if (JSON.stringify(newCol) !== JSON.stringify(col)) {
                convert = true;
                for (let c = 0; c < newCol.length; c++) {
                    diffBoard[c][j] = newCol[c];
                }
            }
        }
    } // when arrowRight or arrowLeft
    else if (direction === "ArrowRight" || direction === "ArrowLeft") {
        for (let i = 0; i < diffBoard.length; i++) {
            const row = [...diffBoard[i]];
            // create newRow
            const { newLine: newRow, score } = transformLine(
                row,
                direction === "ArrowRight",
                0
            );
            point += score;
            if (JSON.stringify(row) !== JSON.stringify(newRow)) {
                convert = true;
                for (let c = 0; c < newRow.length; c++) {
                    diffBoard[i][c] = newRow[c];
                }
            }
        }
    }

    return {
        convert: convert,
        boardData: diffBoard,
        point: point,
    };
}

export function placeRandom(boardData) {
    const available = [];
    for (let i = 0; i < boardData.length; i++) {
        for (let j = 0; j < boardData.length; j++) {
            if (boardData[i][j] === 0) {
                available.push({
                    x: i,
                    y: j,
                });
            }
        }
    }
    if (available.length !== 0) {
        const random = Math.floor(Math.random() * available.length);
        const randomCell = available[random];
        boardData[randomCell.x][randomCell.y] = Math.random() < 0.91 ? 2 : 4;
        return randomCell;
    }
}

export function randomTwoPlace(size) {
    const available = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            available.push({
                x: i,
                y: j,
            });
        }
    }

    let array = [];
    while (array.length < 2) {
        const random = Math.floor(Math.random() * available.length);
        const randomCell = available[random];
        available.splice(random, 1);
        array.push(randomCell);
    }
    return array;
}
