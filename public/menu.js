const btn = document.querySelectorAll("button");
btn.forEach((btn) => btn.addEventListener("click", play));

function play(e) {
    const type = e.target.className;
    console.log(type);
    if (type === "pve") {
        const body = document.querySelector("body");
        const btns = document.querySelectorAll("button");
        btns.forEach((btn) => btn.remove());
        const header = document.querySelector("header");
        header.remove();

        const w = document.createElement("button");
        w.textContent = "White Side";
        w.classList.add("color");
        const b = document.createElement("button");
        b.textContent = "Black Side";
        b.classList.add("color");
        body.append(w, b);

        w.addEventListener("click", () => {
            localStorage.setItem("color", "white");
            localStorage.setItem("gameMode", type);
            window.location.href = "game.html";
        });

        b.addEventListener("click", () => {
            localStorage.setItem("color", "black");
            localStorage.setItem("gameMode", type);
            window.location.href = "game.html";
        });

        return;
    }
    // } else if (type === "online") {
    //     const body = document.querySelector("body");
    //     const btns = document.querySelectorAll("button");
    //     btns.forEach((btn) => btn.remove());
    //     const header = document.querySelector("header");
    //     header.remove();

    //     const host = document.createElement("button");
    //     w.textContent = "White Side";
    //     w.classList.add("color");

    //     const join = document.createElement("button");
    //     b.textContent = "Black Side";
    //     b.classList.add("color");
    //     body.append(host, join);

    //     w.addEventListener("click", () => {
    //         localStorage.setItem("color", "white");
    //         localStorage.setItem("gameMode", type);
    //         window.location.href = "game.html";
    //     });

    //     b.addEventListener("click", () => {
    //         localStorage.setItem("color", "black");
    //         localStorage.setItem("gameMode", type);
    //         window.location.href = "game.html";
    //     });

    // }

    localStorage.setItem("gameMode", type);
    window.location.href = "game.html";
}
