const btn = document.querySelectorAll("button");
btn.forEach((btn) => btn.addEventListener("click", play));

function play(e) {
    const type = e.target.className;
    window.location.href = "index.html";

    switch (type) {
        case "pvp":
            break;
        case "pve":
            break;
        case "online":
            break;
    }
}
