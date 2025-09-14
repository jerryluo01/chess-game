const btn = document.querySelectorAll("button");
btn.forEach((btn) => btn.addEventListener("click", play));

function play(e) {
    const type = e.target.className;
    if (type === "pve") {
        const cont = document.querySelector(".cont");
        const body = document.querySelector("body");
        const btns = document.querySelectorAll("button");
        btns.forEach((btn) => btn.remove());
        const header = document.querySelector("header");
        header.remove();
        cont.remove();

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

    localStorage.setItem("gameMode", type);
    window.location.href = "game.html";
}
