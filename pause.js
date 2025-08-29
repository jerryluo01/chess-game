// let io;
const body = document.querySelector("body");
const pause = document.createElement("div");
body.appendChild(pause);
pause.classList.add("pause");
const bar1 = document.createElement("div");
const bar2 = document.createElement("div");
bar1.classList.add("bar1");
bar2.classList.add("bar2");
pause.append(bar1, bar2);
pause.addEventListener("click", stop);

function stop() {
    console.log("caca");
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    const cont = document.createElement("div");
    cont.classList.add("cont");

    const resumeBtn = document.createElement("div");
    resumeBtn.classList.add("options");
    resumeBtn.textContent = "Resume";
    resumeBtn.addEventListener("click", resume);

    const restartBtn = document.createElement("div");
    restartBtn.classList.add("options");
    restartBtn.textContent = "Restart";
    restartBtn.addEventListener("click", restart);

    const quitBtn = document.createElement("div");
    quitBtn.classList.add("options");
    quitBtn.textContent = "Main Menu";
    quitBtn.addEventListener("click", quit);

    cont.append(resumeBtn, restartBtn, quitBtn);
    overlay.appendChild(cont);

    overlay.style.height = "100%";
    overlay.style.width = "100%";

    body.appendChild(overlay);

    if (mode === "online") {
        restartBtn.remove();
    }
}

function resume() {
    const overlay = document.querySelector(".overlay");
    const all = [overlay, ...overlay.querySelectorAll("*")];
    all.forEach((elem) => {
        elem.remove();
    });
}

function restart() {
    const overlay = document.querySelector(".overlay");
    const all = [overlay, ...overlay.querySelectorAll("*")];
    all.forEach((elem) => {
        elem.remove();
    });
    reset();
    if (CHESSAI === true && AIPiece === "RNBKQP") {
        AIMoveMaker();
    }
}

function quit() {
    const overlay = document.querySelector(".overlay");
    const all = [overlay, ...overlay.querySelectorAll("*")];
    all.forEach((elem) => {
        elem.remove();
    });
    reset();
    // if (mode === "online") {
    //     socket.on("io", (data) => {
    //         io = data;
    //     });
    //     io.on("disconnect", () => {
    //         connectedUsers--;
    //         console.log(`Connected Users: ${connectedUsers}`);==================CHECKOUT
    //         console.log(`Player disconnected: ${socket.id}`);
    //     });
    // }
    window.location.href = "index.html";
}
