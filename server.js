const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
let connectedUsers = 0;
const playerColors = {}; // socket.id -> color
const colors = ["RNBKQP", "rnbkqp"];
let moveLogServer = [];
let chessBoard = "";

app.set("view engine", "ejs");

app.get("/home", (req, res) => {
    res.render("home");
});

server.listen(5500, () => {
    console.log("servere sjdjtjs");
});

// io.on("disconnect", () => {
//     connectedUsers--;
//     console.log(connectedUsers);
//     console.log(`Player disconnected: ${socket.id}`);==================CHECKOUT
// });

io.on("connection", (socket) => {
    // console.log(`Connected users: ${connectedUsers}`);
    if (connectedUsers >= 2) {
        console.log(`Connection refused: ${socket.id}`);
        socket.emit("full", "Server is full. Try again later.");
        socket.disconnect(true); // immediately disconnect
        return;
    }

    // socket.on("disconnect", () => {
    //     connectedUsers--;
    //     console.log(
    //         `User disconnected: ${socket.id}, total: ${connectedUsers}`==================CHECKOUT
    //     );
    //     // Optionally notify the other player
    //     socket.broadcast.emit("player-left", socket.id);
    // });

    const assignedColor = colors[connectedUsers];
    AllyPiece = assignedColor;
    EnemyPiece = colors[connectedUsers === 0 ? 1 : 0];

    //console.log(AllyPiece)
    //console.log(EnemyPiece)
    connectedUsers++;

    console.log("user: " + socket.id);
    socket.on("move", (data) => {
        moveLogServer.push(data);
        // function ...
        io.emit("moves", moveLogServer);
        console.log("feeff", moveLogServer);
    });

    socket.on("ChessboardPosition", (data) => {
        //chessBoard = data
        io.emit("ChessboardPosition", data);
        //console.log("feeff", moveLogServer)
    });

    socket.emit("AllyPiece", AllyPiece);
    socket.emit("EnemyPiece", EnemyPiece);
});
