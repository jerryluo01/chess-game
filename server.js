const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
//let connectedUsers = 0
const playerColors = {}; // socket.id -> color
const colors = ["rnbkqp", "RNBKQP"];
let moveLogServer = [];
let chessBoard = "";
let players = [];

app.set("view engine", "ejs");

app.get("/home", (req, res) => {
    res.render("home");
});

server.listen(5500, () => {
    console.log("Server working");
});

io.on("connection", (socket) => {
    console.log("user: " + socket.id);
    players.push(socket.id);
    console.log(players);
    if (colors.length <= 0) {
        console.log(`Connection refused: ${socket.id}`);
        socket.emit("full", "Server is full. Try again later.");
        io.emit("full", 1);
        socket.disconnect(true); // immediately disconnect
        return;
    }
    const assignedColor = colors.pop();
    io.emit("numberOfPlayers", 2 - colors.length);
    AllyPiece = assignedColor;

    if (AllyPiece === "RNBKQP") {
        EnemyPiece = "rnbkqp";
    } else {
        EnemyPiece = "RNBKQP";
    }
    //EnemyPiece = colors[(connectedUsers === 0) ? 1 : 0]

    //console.log(AllyPiece)
    //console.log(EnemyPiece)
    //connectedUsers++
    socket.on("disconnect", () => {
        for (let i = 0; i < players.length; i++) {
            if (players[i] === socket.id) players.splice(i, 1);
        }
        console.log(players);
        if (assignedColor) {
            colors.push(assignedColor); // return to pool
        }
        const bothPlayersConnected = colors.length === 0;
        console.log(`user disconnected: ${socket.id}`);
        io.emit("numberOfPlayers", 2 - colors.length);

        if (players.length < 2) {
            console.log("Game reset because a player left.");
            io.emit("moves", []);
            io.emit(
                "ChessboardPosition",
                "rnbqkbnrpppppppp00000000000000000000000000000000PPPPPPPPRNBQKBNR"
            );
        }
    });

    socket.on("moves", (data) => {
        io.emit("moves", data);
    });

    socket.on("ChessboardPosition", (data) => {
        io.emit("ChessboardPosition", data);
    });

    socket.on("GameOver", (data) => {
        if (data !== 0) {
            io.emit("GameOver", data);
        }
    });

    socket.emit("AllyPiece", AllyPiece);
    socket.emit("EnemyPiece", EnemyPiece);
});
