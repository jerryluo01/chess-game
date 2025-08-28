const btn = document.querySelectorAll("button");
btn.forEach((btn) => btn.addEventListener("click", play));

function play(e) {
    const type = e.target.className;
    console.log(type);

    localStorage.setItem("gameMode", type);
    window.location.href = "game.html";
}
