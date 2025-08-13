// let ChessBoardPosition = `N0p0P1QbKR00n0kqPpp0000BqN0rbRp000n0B0P000RP0K000rNBQ0p`;
let ChessBoardPosition =
    // "rnbqkbnrpppppppp00000000000000000000000000000000PPPPPPPPRNBQKBNR";
    "rnbqkbnr000000000000000000000r00000000000000000000000000RNBQKBNR";
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const vh = window.innerHeight / 100;
const squareSizePx = 11 * vh;
const WhitePiece = "RNBKQP";
const BlackPiece = "rnbkqp";

function createSquare() {
    const cont = document.querySelector(".main-cont");
    for (let i = 0; i < 64; i++) {
        let r = Math.floor(i / 8);
        let c = i % 8;
        let div = document.createElement("div");
        div.classList.add("square");
        div.id = `${i}`;
        div.addEventListener("click", handleClick);
        if ((r + c) % 2 === 0) div.style.backgroundColor = "#DEE3E6";
        else div.style.backgroundColor = "#8CA2AD";
        cont.appendChild(div);
    }
}

let highlighted = [];

function handleClick(e) {
    const divId = e.target.id;
    const arr = possibleMoves(ChessBoardPosition[divId], parseInt(divId));

    highlighted.forEach((prev) => {
        const id = document.getElementById(prev);
        id.style.border = "";
    });

    e.target.style.border = "3px blue solid";

    arr.forEach((square) => {
        const id = document.getElementById(square);
        id.style.border = "3px dodgerblue double";
    });

    highlighted = [divId, ...arr];
    // if (WhitePiece.includes(ChessBoardPosition[divId])) {
    //     possibleMoves(ChessBoardPosition[divId], parseInt(divId));
    // }
}

function possibleMoves(piece, position) {
    switch (piece) {
        case "r":
            return rookPossibleMoves("B", position, ChessBoardPosition);
        case "n":
            return knightPossibleMoves("B", position, ChessBoardPosition);
        case "b":
            return bishopPossibleMoves("B", position, ChessBoardPosition);
        case "q":
            return queenPossibleMoves("B", position, ChessBoardPosition);
        case "k":
            return kingPossibleMoves("B", position, ChessBoardPosition);
        case "p":
            return pawnPossibleMoves("B", position, ChessBoardPosition);
        case "R":
            return rookPossibleMoves("W", position, ChessBoardPosition);
        case "N":
            return knightPossibleMoves("W", position, ChessBoardPosition);
        case "B":
            return bishopPossibleMoves("W", position, ChessBoardPosition);
        case "Q":
            return queenPossibleMoves("W", position, ChessBoardPosition);
        case "K":
            return kingPossibleMoves("W", position, ChessBoardPosition);
        case "P":
            return pawnPossibleMoves("W", position, ChessBoardPosition);
        default:
            img.src = "";
    }
}

function positionUpdate(ChessBoardPosition) {
    for (let i = 0; i < ChessBoardPosition.length; i++) {
        const img = new Image();
        switch (ChessBoardPosition[i]) {
            case "r":
                img.src = "piece/Chess_rdt60.png";
                break;
            case "n":
                img.src = "piece/Chess_ndt60.png";
                break;
            case "b":
                img.src = "piece/Chess_bdt60.png";
                break;
            case "q":
                img.src = "piece/Chess_qdt60.png";
                break;
            case "k":
                img.src = "piece/Chess_kdt60.png";
                break;
            case "p":
                img.src = "piece/Chess_pdt60.png";
                break;
            case "R":
                img.src = "piece/Chess_rlt60.png";
                break;
            case "N":
                img.src = "piece/Chess_nlt60.png";
                break;
            case "B":
                img.src = "piece/Chess_blt60.png";
                break;
            case "Q":
                img.src = "piece/Chess_qlt60.png";
                break;
            case "K":
                img.src = "piece/Chess_klt60.png";
                break;
            case "P":
                img.src = "piece/Chess_plt60.png";
                break;
            default:
                img.src = "";
        }

        img.onload = function () {
            r = Math.floor(i / 8);
            c = i % 8;
            if (img.src != "") {
                ctx.drawImage(img, c * 37.5, r * 18.9, 37.5, 18.9);
            }
        };
    }
}

createSquare();
positionUpdate(ChessBoardPosition);
