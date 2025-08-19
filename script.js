// let ChessBoardPosition = `N0p0P1QbKR00n0kqPpp0000BqN0rbRp000n0B0P000RP0K000rNBQ0p`;
let ChessBoardPosition =
     "rnbqkbnrpppppppp00000000000000000000000000000000PPPPPPPPRNBQKBNR";
    //"rnbqkbnr000000000000000000000r00000000000000000000000000RNBQKBNR";
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const vh = window.innerHeight / 100;
const squareSizePx = 11 * vh;
let AllyPiece = "RNBKQP";
//let EnemyPiece = "rnbkqp";
let selected = false
let moveLog = []

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
    "60K62": (pos) => pos.substring(0, 61) + "RK0"
};



let highlighted = [];
let possMoves = [];
let selectedPiece = null;

function handleClick(e) {
    const divId = e.target.id;
    if (!selected && AllyPiece.includes(ChessBoardPosition[divId]) && !possMoves.includes(parseInt(divId))) {
        console.log("clicked");
        const arr = possibleMoves(ChessBoardPosition[divId], parseInt(divId));

        highlighted.forEach((prev) => {
            const id = document.getElementById(prev);
            id.style.border = "";
        });

        e.target.style.border = "3px blue solid";

        arr.forEach((square) => {
            const id = document.getElementById(square);
            id.style.border = "3px blue solid";
            selected = true;
        });

        highlighted = [divId, ...arr];
        possMoves = [...arr]
        selectedPiece = parseInt(divId)
    }

    else{
        if (possMoves.includes(parseInt(divId))){
            PieceEaten = ChessBoardPosition[parseInt(divId)]
            console.log(PieceEaten);

            ChessBoardPosition = ChessBoardPosition.substring(0, parseInt(divId)) + ChessBoardPosition[selectedPiece] + ChessBoardPosition.substring(parseInt(divId) + 1);
            ChessBoardPosition = ChessBoardPosition.substring(0, selectedPiece) + "0" + ChessBoardPosition.substring(selectedPiece + 1);

            iniPos = selectedPiece.toString().padStart(2, '0')
            ChessPiece = ChessBoardPosition[parseInt(divId)]
            afterPos = divId.padStart(2, '0')

            RecentMove = iniPos+ChessPiece+afterPos;
            moveLog.push(RecentMove);

            if (castleMoves[RecentMove]) {
                ChessBoardPosition = castleMoves[RecentMove](ChessBoardPosition);
            }
            if ((Math.abs(parseInt(afterPos)-parseInt(iniPos)) === 7 || Math.abs(parseInt(afterPos)-parseInt(iniPos)) === 9) &&
                (ChessPiece === "p" || ChessPiece === "P") && (PieceEaten === "0")){
                    if (ChessPiece === "p"){
                        console.log("pppppp")
                        ChessBoardPosition = ChessBoardPosition.substring(0, parseInt(afterPos)-8) + "0" + ChessBoardPosition.substring(parseInt(afterPos)-8 + 1);
                    }
                    else{
                        console.log(afterPos+8)
                        ChessBoardPosition = ChessBoardPosition.substring(0, parseInt(afterPos)+8) + "0" + ChessBoardPosition.substring(parseInt(afterPos)+8 + 1);
                    }
            }
            //ChessBoardPosition = ChessBoardPosition.substring(0, parseInt(divId)) + ChessBoardPosition[selectedPiece] + ChessBoardPosition.substring(parseInt(divId) + 1);
            //ChessBoardPosition = ChessBoardPosition.substring(0, selectedPiece) + "0" + ChessBoardPosition.substring(selectedPiece + 1);


            //console.log(moveLog);
            positionUpdate(ChessBoardPosition)
            possMoves = []
            if (AllyPiece == "RNBKQP"){
                AllyPiece = "rnbkqp";}
            else{
                AllyPiece = "RNBKQP";
            }
        }
        highlighted.forEach((square) => {
            const id = document.getElementById(square);
            id.style.border = "none";
            selected = false;
        });
    }

    // if (WhitePiece.includes(ChessBoardPosition[divId])) {
    //     possibleMoves(ChessBoardPosition[divId], parseInt(divId));
    // }
}
function movePiece(){

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
            return [];
    }
}

function positionUpdate(ChessBoardPosition) {
    for (let i = 0; i < ChessBoardPosition.length; i++) {
        let r = Math.floor(i / 8);
        let c = i % 8;
        let src = "";

        switch (ChessBoardPosition[i]) {
            case "r": src = "piece/Chess_rdt60.png"; break;
            case "n": src = "piece/Chess_ndt60.png"; break;
            case "b": src = "piece/Chess_bdt60.png"; break;
            case "q": src = "piece/Chess_qdt60.png"; break;
            case "k": src = "piece/Chess_kdt60.png"; break;
            case "p": src = "piece/Chess_pdt60.png"; break;
            case "R": src = "piece/Chess_rlt60.png"; break;
            case "N": src = "piece/Chess_nlt60.png"; break;
            case "B": src = "piece/Chess_blt60.png"; break;
            case "Q": src = "piece/Chess_qlt60.png"; break;
            case "K": src = "piece/Chess_klt60.png"; break;
            case "P": src = "piece/Chess_plt60.png"; break;
        }

        if (src === "") {
            ctx.clearRect(c * 37.5, r * 18.9, 37.5, 18.9);
        } else {
            const img = new Image();
            img.src = src;
            img.onload = function () {
                ctx.clearRect(c * 37.5, r * 18.9, 37.5, 18.9);
                ctx.drawImage(img, c * 37.5, r * 18.9, 37.5, 18.9);
            };
        }
    }
}

createSquare();
positionUpdate(ChessBoardPosition);
