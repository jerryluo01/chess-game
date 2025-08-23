function rookPossibleMoves(color, position, boardPos = ChessBoardPosition) {
    let allyPiece;
    let enemyPiece;
    if (color === "W") {
        allyPiece = "RBNKQP";
        enemyPiece = "rbnkqp";
    } else {
        enemyPiece = "RBNKQP";
        allyPiece = "rbnkqp";
    }

    let positionIndexList = [];

    const directions = [1, -1, -8, 8];
    let r = Math.floor(position / 8);
    let c = position % 8;

    for (let i = 0; i < directions.length; i++) {
        let j = 1;
        while (true) {
            let potentialIndex = position + directions[i] * j;
            let potentialRow = Math.floor(potentialIndex / 8);
            let potentialCol = potentialIndex % 8;

            if (
                potentialRow < 0 ||
                potentialRow >= 8 ||
                potentialCol < 0 ||
                potentialCol >= 8
            )
                break;

            if (
                (directions[i] === 1 || directions[i] === -1) &&
                potentialRow !== r
            )
                break;

            if (allyPiece.includes(boardPos[potentialIndex])) break;
            positionIndexList.push(potentialIndex);
            if (enemyPiece.includes(boardPos[potentialIndex])) break;
            j++;
        }
    }
    return positionIndexList;
}

function bishopPossibleMoves(color, position, boardPos = ChessBoardPosition) {
    let allyPiece;
    let enemyPiece;
    if (color === "W") {
        allyPiece = "RBNKQP";
        enemyPiece = "rbnkqp";
    } else {
        enemyPiece = "RBNKQP";
        allyPiece = "rbnkqp";
    }

    let positionIndexList = [];

    const directions = [9, 7, -9, -7];
    let r = Math.floor(position / 8);
    let c = position % 8;

    for (let i = 0; i < directions.length; i++) {
        let j = 1;
        while (true) {
            let potentialIndex = position + directions[i] * j;
            let potentialRow = Math.floor(potentialIndex / 8);
            let potentialCol = potentialIndex % 8;

            if (
                potentialRow < 0 ||
                potentialRow >= 8 ||
                potentialCol < 0 ||
                potentialCol >= 8 ||
                Math.abs(potentialCol - c) !== j ||
                Math.abs(potentialRow - r) !== j
            )
                break;

            if (allyPiece.includes(boardPos[potentialIndex])) break;
            positionIndexList.push(potentialIndex);
            if (enemyPiece.includes(boardPos[potentialIndex])) break;
            j++;
        }
    }
    return positionIndexList;
}
function knightPossibleMoves(color, position, boardPos = ChessBoardPosition) {
    let allyPiece;
    let enemyPiece;
    if (color === "W") {
        allyPiece = "RBNKQP";
        enemyPiece = "rbnkqp";
    } else {
        enemyPiece = "RBNKQP";
        allyPiece = "rbnkqp";
    }

    let positionIndexList = [];

    const directions = [-10, -6, -17, -15, 6, 15, 17, 10];
    let r = Math.floor(position / 8);
    let c = position % 8;

    for (let i = 0; i < directions.length; i++) {
        let potentialIndex = position + directions[i];
        let potentialRow = Math.floor(potentialIndex / 8);
        let potentialCol = potentialIndex % 8;

        if (
            potentialRow < 0 ||
            potentialRow >= 8 ||
            potentialCol < 0 ||
            potentialCol >= 8
        ) {
            continue;
        }

        let rowDiff = Math.abs(potentialRow - r);
        let colDiff = Math.abs(potentialCol - c);

        if (
            !(
                (rowDiff === 2 && colDiff === 1) ||
                (rowDiff === 1 && colDiff === 2)
            )
        ) {
            continue;
        }

        if (allyPiece.includes(boardPos[potentialIndex])) continue;
        positionIndexList.push(potentialIndex);
    }
    return positionIndexList;
}
function kingPossibleMoves(color, position, boardPos = ChessBoardPosition) {
    let allyPiece;
    let enemyPiece;
    if (color === "W") {
        allyPiece = "RBNKQP";
        enemyPiece = "rbnkqp";
    } else {
        enemyPiece = "RBNKQP";
        allyPiece = "rbnkqp";
    }

    let positionIndexList = [];

    const directions = [9, 7, -9, -7, 1, -1, 8, -8];
    let r = Math.floor(position / 8);
    let c = position % 8;

    for (let i = 0; i < directions.length; i++) {
        let potentialIndex = position + directions[i];
        let potentialRow = Math.floor(potentialIndex / 8);
        let potentialCol = potentialIndex % 8;

        if (
            potentialRow < 0 ||
            potentialRow >= 8 ||
            potentialCol < 0 ||
            potentialCol >= 8
        )
            continue;

        if (
            [9, 7, -9, -7].includes(directions[i]) &&
            (Math.abs(potentialCol - c) !== 1 ||
                Math.abs(potentialRow - r) !== 1)
        )
            continue;

        if ((directions[i] === 1 || directions[i] === -1) && potentialRow !== r)
            continue;

        if (allyPiece.includes(boardPos[potentialIndex])) continue;
        positionIndexList.push(potentialIndex);
        if (enemyPiece.includes(boardPos[potentialIndex])) continue;
    }
    if (color === "W") {
        if (moveLog.every((item) => !item.includes("K"))) {
            if (
                moveLog.every((item) => !item.includes("56R")) &&
                boardPos[57] === "0" &&
                boardPos[58] === "0" &&
                boardPos[59] === "0" &&
                boardPos[56] === "R" &&
                !check
            ) {
                //console.log("deefefe")
                positionIndexList.push(58);
            }
            //console.log(boardPos[63]);
            if (
                moveLog.every((item) => !item.includes("63R")) &&
                boardPos[61] === "0" &&
                boardPos[62] === "0" &&
                boardPos[63] === "R" &&
                !check
            ) {
                //console.log(check)
                //console.log(squareAttack);
                //console.log("dedefefef")
                positionIndexList.push(62);
            }
        }
    }
    if (color === "B") {
        if (moveLog.every((item) => !item.includes("k"))) {
            if (
                moveLog.every((item) => !item.includes("00r")) &&
                boardPos[1] === "0" &&
                boardPos[2] === "0" &&
                boardPos[3] === "0" &&
                boardPos[0] === "r" &&
                !check
            ) {
                positionIndexList.push(2);
            }
            if (
                moveLog.every((item) => !item.includes("07r")) &&
                boardPos[5] === "0" &&
                boardPos[6] === "0" &&
                boardPos[7] === "r" &&
                !check
            ) {
                positionIndexList.push(6);
            }
        }
    }
    return positionIndexList;
}

function queenPossibleMoves(color, position, boardPos = ChessBoardPosition) {
    let allyPiece;
    let enemyPiece;
    if (color === "W") {
        allyPiece = "RBNKQP";
        enemyPiece = "rbnkqp";
    } else {
        enemyPiece = "RBNKQP";
        allyPiece = "rbnkqp";
    }

    let positionIndexList = [];

    const directions = [9, 7, -9, -7, 1, -1, 8, -8];
    let r = Math.floor(position / 8);
    let c = position % 8;

    for (let i = 0; i < directions.length; i++) {
        let j = 1;
        while (true) {
            let potentialIndex = position + directions[i] * j;
            let potentialRow = Math.floor(potentialIndex / 8);
            let potentialCol = potentialIndex % 8;

            if (
                potentialRow < 0 ||
                potentialRow >= 8 ||
                potentialCol < 0 ||
                potentialCol >= 8
            )
                break;

            if (
                [9, 7, -9, -7].includes(directions[i]) &&
                (Math.abs(potentialCol - c) !== j ||
                    Math.abs(potentialRow - r) !== j)
            )
                break;

            if (
                (directions[i] === 1 || directions[i] === -1) &&
                potentialRow !== r
            )
                break;

            if (allyPiece.includes(boardPos[potentialIndex])) break;
            positionIndexList.push(potentialIndex);
            if (enemyPiece.includes(boardPos[potentialIndex])) break;
            j++;
        }
    }
    return positionIndexList;
}

function pawnPossibleMoves(
    color,
    position,
    boardPos = ChessBoardPosition,
    SquareUnderAttack = false
) {
    let allyPiece;
    let enemyPiece;
    let directionmult = 1;
    if (color === "W") {
        allyPiece = "RBNKQP";
        enemyPiece = "rbnkqp";
        directionmult = -1;
    } else {
        enemyPiece = "RBNKQP";
        allyPiece = "rbnkqp";
    }
    let positionIndexList = [];
    let squareUnderAttackList = [];

    const directions = [8, 16, 7, 9];
    let r = Math.floor(position / 8);
    let c = position % 8;

    for (let i = 0; i < directions.length; i++) {
        let potentialIndex = position + directions[i] * directionmult;
        let potentialRow = Math.floor(potentialIndex / 8);
        let potentialCol = potentialIndex % 8;

        if (
            potentialRow < 0 ||
            potentialRow >= 8 ||
            potentialCol < 0 ||
            potentialCol >= 8
        )
            continue;

        if (directions[i] * directionmult === 8 * directionmult) {
            if (allyPiece.includes(boardPos[potentialIndex])) continue;
            if (enemyPiece.includes(boardPos[potentialIndex])) continue;
        } else if (directions[i] * directionmult === 16 * directionmult) {
            if (r !== 6 && directionmult === -1) continue;
            if (r !== 1 && directionmult === 1) continue;
            if (
                allyPiece.includes(boardPos[potentialIndex]) ||
                allyPiece.includes(boardPos[potentialIndex - 8 * directionmult])
            )
                continue;
            if (
                enemyPiece.includes(boardPos[potentialIndex]) ||
                enemyPiece.includes(
                    boardPos[potentialIndex - 8 * directionmult]
                )
            )
                continue;
        }
        if (
            directions[i] * directionmult === 7 * directionmult ||
            directions[i] * directionmult === 9 * directionmult
        ) {
            if (moveLog.length !== 0) {
                previousMove = moveLog[moveLog.length - 1];
                if (
                    Math.abs(
                        parseInt(previousMove.substring(0, 2)) -
                            parseInt(previousMove.substring(3))
                    ) === 16 &&
                    (previousMove[2] === "p" || previousMove[2] === "P") &&
                    potentialIndex ===
                        parseInt(previousMove.substring(3)) + 8 * directionmult
                ) {
                    positionIndexList.push(potentialIndex);
                }
            }
            if (!enemyPiece.includes(boardPos[potentialIndex])) continue;
        }
        if (directions[i] === 7 || directions[i] === 9) {
            squareUnderAttackList.push(potentialIndex);
        }
        positionIndexList.push(potentialIndex);
    }
    if (!SquareUnderAttack) {
        return positionIndexList;
    } else {
        return squareUnderAttackList;
    }
}

function pawnPromotion(color, position, boardPos) {}
