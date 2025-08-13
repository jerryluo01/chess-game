function rookPossibleMoves(color, position, boardPos) {
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
                (directions[i] == 1 || directions[i] == -1) &&
                potentialRow != r
            )
                break;

            if (allyPiece.includes(ChessBoardPosition[potentialIndex])) break;
            positionIndexList.push(potentialIndex);
            if (enemyPiece.includes(ChessBoardPosition[potentialIndex])) break;
            j++;
        }
    }
    console.log(positionIndexList);
    return positionIndexList;
}

function bishopPossibleMoves(color, position, boardPos) {
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

            if (allyPiece.includes(ChessBoardPosition[potentialIndex])) break;
            positionIndexList.push(potentialIndex);
            if (enemyPiece.includes(ChessBoardPosition[potentialIndex])) break;
            j++;
        }
    }
    console.log(positionIndexList);
    return positionIndexList;
}
const directions = [-10, -6, -17, -15, 6, 15, 17, 10];
function knightPossibleMoves(color, position, boardPos) {
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

        if (allyPiece.includes(ChessBoardPosition[potentialIndex])) continue;
        positionIndexList.push(potentialIndex);
    }
    console.log(positionIndexList);
    return positionIndexList;
}
function kingPossibleMoves(color, position, boardPos) {
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

        if ((directions[i] == 1 || directions[i] == -1) && potentialRow != r)
            continue;

        if (allyPiece.includes(ChessBoardPosition[potentialIndex])) continue;
        positionIndexList.push(potentialIndex);
        if (enemyPiece.includes(ChessBoardPosition[potentialIndex])) continue;
    }
    console.log(positionIndexList);
    return positionIndexList;
}

function queenPossibleMoves(color, position, boardPos) {
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
                (directions[i] == 1 || directions[i] == -1) &&
                potentialRow != r
            )
                break;

            if (allyPiece.includes(ChessBoardPosition[potentialIndex])) break;
            positionIndexList.push(potentialIndex);
            if (enemyPiece.includes(ChessBoardPosition[potentialIndex])) break;
            j++;
        }
    }
    console.log(positionIndexList);
    return positionIndexList;
}

function pawnPossibleMoves(color, position, boardPos) {}

function pawnPromotion(color, position, boardPos) {}
