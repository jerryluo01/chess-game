let ChessBoardPosition =
    "rnbqkbnrpppppppp00000000000000000000000000000000PPPPPPPPRNBQKBNR";
const vh = window.innerHeight / 100;
//const squareSizePx = 11 * vh;
let promotion = false;
let AllyPiece = "RNBKQP";
let EnemyPiece = "rnbkqp";
let selected = false;
let moveLog = [];
let squareAttack = [];
let CHESSAI = false;

let mode = localStorage.getItem("gameMode");
switch (mode) {
    case "pve":
        CHESSAI = true;
        console.log(mode);
        let AiPiece = "RNBKQP";
        if (CHESSAI === true && AiPiece === "RNBKQP") {
            AIMoveMaker();
        }

        break;
}

function createSquare() {
    const cont = document.querySelector(".main-cont");
    for (let i = 0; i < 64; i++) {
        let r = Math.floor(i / 8);
        let c = i % 8;
        let div = document.createElement("div");
        div.classList.add("square");
        div.id = `${i}`;
        div.addEventListener("click", handleClick);
        if ((r + c) % 2 === 0) div.style.backgroundColor = "#FFFFFF";
        else div.style.backgroundColor = "#8CA2AD";
        cont.appendChild(div);
    }
}

const castleMoves = {
    "04k02": (pos) => "0" + pos.substring(1, 3) + "r" + pos.substring(4),
    "04k06": (pos) => pos.substring(0, 5) + "rk0" + pos.substring(8),
    "60K58": (pos) => pos.substring(0, 56) + "00KR" + pos.substring(60),
    "60K62": (pos) => pos.substring(0, 61) + "RK0",
};

function legalMoves(possibleMoves, ChessBoardPosition, piece, position) {
    let tempChessBoardPosition;
    let possibleMovesTemp;
    let possibleMovesListTemp = possibleMoves;
    //console.log(possibleMoves);
    for (let i = 0; i < possibleMoves.length; i++) {
        tempChessBoardPosition = ChessBoardPosition;
        possibleMovesTemp =
            position.toString().padStart(2, "0") +
            piece +
            possibleMoves[i].toString().padStart(2, "0");
        tempChessBoardPosition = performMoves(
            possibleMovesTemp,
            tempChessBoardPosition,
            false
        );
        if (
            SquaresUnderAttack(tempChessBoardPosition).includes(
                tempChessBoardPosition.indexOf("K")
            ) ||
            SquaresUnderAttack(tempChessBoardPosition).includes(
                tempChessBoardPosition.indexOf("k")
            )
        ) {
            possibleMovesListTemp = possibleMovesListTemp.filter(
                (move) => move !== possibleMoves[i]
            );
        }
    }
    return possibleMovesListTemp;
}

let highlighted = [];
let possMoves = [];
let selectedPiece = null;

function handleClick(e) {
    const divId = e.target.id;
    if (
        //!selected &&
        AllyPiece.includes(ChessBoardPosition[divId]) &&
        !possMoves.includes(parseInt(divId)) &&
        promotion === false
        // AllyPiece !== AiPiece======================================================================
    ) {
        //const arr = possibleMoves(ChessBoardPosition[divId], parseInt(divId));
        const arr = legalMoves(
            possibleMoves(ChessBoardPosition[divId], parseInt(divId)),
            ChessBoardPosition,
            ChessBoardPosition[divId],
            parseInt(divId)
        );
        //console.log(legalMoves(possibleMoves(ChessBoardPosition[divId], parseInt(divId)),ChessBoardPosition,ChessBoardPosition[divId],parseInt(divId)));
        if (!selected) {
            highlighted.forEach((prev) => {
                const id = document.getElementById(prev);
                id.style.border = "";
                id.style.outline = "";
            });
        } else {
        }

        e.target.style.border = "3px blue double";

        arr.forEach((square) => {
            const id = document.getElementById(square);
            id.style.border = "3px rgba(24, 197, 255, 1) double";
            selected = true;
        });

        highlighted = [divId, ...arr];
        possMoves = [...arr];
        selectedPiece = parseInt(divId);
    } else if (promotion === false) {
        // removed AllyPiece !== AiPiece from if statement===========================================
        if (possMoves.includes(parseInt(divId))) {
            RecentMove =
                selectedPiece.toString().padStart(2, "0") +
                ChessBoardPosition[selectedPiece] +
                divId.padStart(2, "0");
            ChessBoardPosition = performMoves(RecentMove, ChessBoardPosition);
            positionUpdate(ChessBoardPosition);
            //console.log(moveLog);
            moveLog.push(RecentMove);
            console.log(moveLog);
            if (ChessBoardPosition.substring(0, 8).includes("P")) {
                promotion = true;
                //console.log("efefefe")
                //console.log(EnemyPiece);
                //console.log(AllyPiece);
                pawnPromotion(
                    ChessBoardPosition.substring(0, 8).indexOf("P"),
                    EnemyPiece
                );
            } else if (ChessBoardPosition.substring(56, 64).includes("p")) {
                promotion = true;
                pawnPromotion(
                    ChessBoardPosition.substring(56, 64).indexOf("p"),
                    EnemyPiece
                );
            } else {
                if (CHESSAI) {
                    AIMoveMaker();
                }
            }
        }
        highlighted.forEach((square) => {
            const id = document.getElementById(square);
            id.style.border = "";
            id.style.outline = "";
            selected = false;
        });
    }
}

function AIMoveMaker() {
    getAIMove(moveLog, ChessBoardPosition).then((aiMove) => {
        aiMove = aiMove.replace(/(?<!\d)(\d)(?!\d)/g, "0$1");
        console.log("AI move:", aiMove);
        moveLog.push(aiMove);
        ChessBoardPosition = performMoves(aiMove, ChessBoardPosition);
        if (ChessBoardPosition.substring(0, 8).includes("P")) {
            c = ChessBoardPosition.indexOf("P", 0);
            ChessBoardPosition =
                ChessBoardPosition.substring(0, c) +
                "Q" +
                ChessBoardPosition.substring(parseInt(c) + 1);
        }
        if (ChessBoardPosition.substring(56, 64).includes("P")) {
            c = ChessBoardPosition.indexOf("p", 56);
            ChessBoardPosition =
                ChessBoardPosition.substring(0, 56 + parseInt(c)) +
                "q" +
                ChessBoardPosition.substring(parseInt(c) + 57);
        }
        positionUpdate(ChessBoardPosition);
    });
}
function performMoves(moves, chessBoardPosition, realBoard = true) {
    iniPos = parseInt(moves.substring(0, 2));
    ChessPiece = chessBoardPosition[iniPos];
    afterPos = parseInt(moves.substring(3, 5));

    PieceEaten = chessBoardPosition[parseInt(moves.substring(3, 5))];

    //let BoardBeforeMove = chessBoardPosition

    chessBoardPosition =
        chessBoardPosition.substring(0, afterPos) +
        ChessPiece +
        chessBoardPosition.substring(afterPos + 1);
    chessBoardPosition =
        chessBoardPosition.substring(0, iniPos) +
        "0" +
        chessBoardPosition.substring(iniPos + 1);

    if (castleMoves[moves]) {
        chessBoardPosition = castleMoves[moves](chessBoardPosition);
    }
    if (
        (Math.abs(parseInt(afterPos) - parseInt(iniPos)) === 7 ||
            Math.abs(parseInt(afterPos) - parseInt(iniPos)) === 9) &&
        (ChessPiece === "p" || ChessPiece === "P") &&
        PieceEaten === "0"
    ) {
        if (ChessPiece === "p") {
            chessBoardPosition =
                chessBoardPosition.substring(0, parseInt(afterPos) - 8) +
                "0" +
                chessBoardPosition.substring(parseInt(afterPos) - 8 + 1);
        } else {
            chessBoardPosition =
                chessBoardPosition.substring(0, parseInt(afterPos) + 8) +
                "0" +
                chessBoardPosition.substring(parseInt(afterPos) + 8 + 1);
        }
    }
    //positionUpdate(chessBoardPosition)
    possMoves = [];

    if (realBoard) {
        const isUpperCase = AllyPiece === "RNBKQP";
        AllyPiece = isUpperCase ? "rnbkqp" : "RNBKQP";
        EnemyPiece = isUpperCase ? "RNBKQP" : "rnbkqp";

        let state = CheckmateAndStalemate(chessBoardPosition);
        const cont = document.querySelector(".main-cont");
        console.log(chessBoardPosition);
        if (state === 1) {
            alert("CHECKMATE");
            const resetBtn = document.createElement("button");
            resetBtn.classList.add("reset");
            resetBtn.textContent = "Reset Game";
            cont.appendChild(resetBtn);
            resetBtn.addEventListener("click", () => {
                reset();
                resetBtn.remove();
            });
        } else if (state === 2) {
            alert("STALEMATE");
            const resetBtn = document.createElement("button");
            resetBtn.classList.add("reset");
            resetBtn.textContent = "Reset Game";
            cont.appendChild(resetBtn);
            resetBtn.addEventListener("click", () => {
                reset();
                resetBtn.remove();
            });
        }
    }
    return chessBoardPosition;
}
function reset() {
    //console.log("RESET")
    AllyPiece = "RNBKQP";
    EnemyPiece = "rnbkqp";
    selected = false;
    selectedPiece = null;
    possMoves = [];
    highlighted = [];
    moveLog = [];
    chessBoardPosition =
        "rnbqkbnrpppppppp00000000000000000000000000000000PPPPPPPPRNBQKBNR";
    positionUpdate(chessBoardPosition);
}

function possibleMoves(piece, position, chessBoard = ChessBoardPosition) {
    switch (piece) {
        case "r":
            return rookPossibleMoves("B", position, chessBoard);
        case "n":
            return knightPossibleMoves("B", position, chessBoard);
        case "b":
            return bishopPossibleMoves("B", position, chessBoard);
        case "q":
            return queenPossibleMoves("B", position, chessBoard);
        case "k":
            return kingPossibleMoves("B", position, chessBoard);
        case "p":
            return pawnPossibleMoves("B", position, chessBoard);
        case "R":
            return rookPossibleMoves("W", position, chessBoard);
        case "N":
            return knightPossibleMoves("W", position, chessBoard);
        case "B":
            return bishopPossibleMoves("W", position, chessBoard);
        case "Q":
            return queenPossibleMoves("W", position, chessBoard);
        case "K":
            return kingPossibleMoves("W", position, chessBoard);
        case "P":
            return pawnPossibleMoves("W", position, chessBoard);
        default:
            return [];
    }
}

function SquaresUnderAttack(chessBoardPosition) {
    //console.log(chessBoardPosition)
    let SquaresUnderAttackList = new Set();
    let Moves;
    for (let i = 0; i < chessBoardPosition.length; i++) {
        if (EnemyPiece.includes(chessBoardPosition[i])) {
            if (chessBoardPosition[i] === "P") {
                Moves = pawnPossibleMoves("W", i, chessBoardPosition, true);
            } else if (chessBoardPosition[i] === "p") {
                Moves = pawnPossibleMoves("B", i, chessBoardPosition, true);
            } else {
                Moves = possibleMoves(
                    chessBoardPosition[i],
                    i,
                    chessBoardPosition
                );
            }
            for (let move of Moves) {
                SquaresUnderAttackList.add(move); // only unique values kept
            }
        }
    }
    //console.log(SquaresUnderAttackList);
    squareAttack = [...SquaresUnderAttackList];
    return squareAttack;
}

function CheckmateAndStalemate(chessBoardPosPosition) {
    check = false;
    if (
        SquaresUnderAttack(chessBoardPosPosition).includes(
            chessBoardPosPosition.indexOf("K")
        ) ||
        SquaresUnderAttack(chessBoardPosPosition).includes(
            chessBoardPosPosition.indexOf("k")
        )
    ) {
        check = true;
    }
    let potentialMovesList = new Set();
    let Moves;
    for (let i = 0; i < chessBoardPosPosition.length; i++) {
        if (AllyPiece.includes(chessBoardPosPosition[i])) {
            Moves = legalMoves(
                possibleMoves(
                    chessBoardPosPosition[i],
                    i,
                    chessBoardPosPosition
                ),
                chessBoardPosPosition,
                chessBoardPosPosition[i],
                i
            );
            for (let move of Moves) {
                //  const arr = legalMoves(possibleMoves(ChessBoardPosition[divId], parseInt(divId)),ChessBoardPosition,ChessBoardPosition[divId],parseInt(divId))
                potentialMovesList.add(move); // only unique values kept
            }
        }
    }
    potentialMovesList = [...potentialMovesList];
    if (check && potentialMovesList.length === 0) {
        return 1;
    } else if (
        (!check && potentialMovesList.length === 0) ||
        insufficientMaterial(chessBoardPosPosition)
    ) {
        return 2;
    } else {
        return 0;
    }
}

function insufficientMaterial(chessBoard) {
    let pieces = chessBoard.replace(/0/g, "").split("");

    if (pieces.length === 2) return true;

    if (pieces.length === 3) {
        return (
            pieces.includes("B") ||
            pieces.includes("b") ||
            pieces.includes("N") ||
            pieces.includes("n")
        );
    }
    return false;
}

function positionUpdate(ChessBoardPosition) {
    for (let i = 0; i < ChessBoardPosition.length; i++) {
        let src = "";
        const div = document.getElementById(i);

        const oldImg = div.querySelector("img");
        if (oldImg) oldImg.remove();

        switch (ChessBoardPosition[i]) {
            case "r":
                src = "piece/Chess_rdt60.png";
                break;
            case "n":
                src = "piece/Chess_ndt60.png";
                break;
            case "b":
                src = "piece/Chess_bdt60.png";
                break;
            case "q":
                src = "piece/Chess_qdt60.png";
                break;
            case "k":
                src = "piece/Chess_kdt60.png";
                break;
            case "p":
                src = "piece/Chess_pdt60.png";
                break;
            case "R":
                src = "piece/Chess_rlt60.png";
                break;
            case "N":
                src = "piece/Chess_nlt60.png";
                break;
            case "B":
                src = "piece/Chess_blt60.png";
                break;
            case "Q":
                src = "piece/Chess_qlt60.png";
                break;
            case "K":
                src = "piece/Chess_klt60.png";
                break;
            case "P":
                src = "piece/Chess_plt60.png";
                break;
        }

        if (src !== "") {
            const img = document.createElement("img");
            img.src = src;
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.pointerEvents = "none";
            div.appendChild(img);
        }
    }
}
async function getAIMove(movesLog, board) {
    try {
        const response = await fetch("http://127.0.0.1:5000/move", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ move_log: movesLog, board_input: board }), // send move log
        });

        const data = await response.json();
        return data.move;
    } catch (error) {
        console.error("Error fetching AI move:", error);
    }
}

createSquare();
positionUpdate(ChessBoardPosition);
