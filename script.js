const box = document.getElementById("minha_box");
const tela = document.querySelector(".tela");
const keys = {};
const mediaQuery = window.matchMedia("(max-width: 768px)");
const botao = document.getElementById("0");
const boxSize = 66;
let speed = 2;
let x = 0;
let y = 0;
let FPS = 1/30;
let voo = false;

function calcularLimites() {
    const telaRect = tela.getBoundingClientRect();
    return {
        minX: -telaRect.width / 2 + boxSize / 2 - 11.5,
        maxX: telaRect.width / 2 - boxSize / 2 + 11.5,
        minY: -telaRect.height / 2 + boxSize / 2 - 9.5,
        maxY: telaRect.height / 2 - boxSize / 2 + 13.5,
    };
}

function handleMediaQueryChange(e) {
    if (e.matches) {
        botao.style.display = "grid";
    } else {
        botao.style.display = "none";
    }
    limites = calcularLimites();
}
handleMediaQueryChange(mediaQuery);
mediaQuery.addEventListener("change", handleMediaQueryChange);

function gravidade() {
    setInterval(() => {
        box.style.top = `${y}px`;
        box.style.left = `${x}px`;

        if (x > limites.maxX - 2) x = limites.maxX - 2;
        if (x < limites.minX + 2) x = limites.minX + 2;
        if (y > limites.maxY) y = limites.maxY;
        if (y < limites.minY) y = limites.minY;
        if (y <= 63.5) y += 2;

        if (keys["ArrowLeft"]) x -= speed;
        if (keys["ArrowRight"]) x += speed;

    }, FPS);
};
if (voo == false) gravidade();

function mover() {
    setInterval(() => {
        if (keys["ArrowUp"]) y -= speed;
        if (keys["ArrowDown"]) y += speed;
        if (keys["ArrowLeft"]) x -= speed;
        if (keys["ArrowRight"]) x += speed;


        if (x > limites.maxX) x = limites.maxX;
        if (x < limites.minX) x = limites.minX;
        if (y > limites.maxY) y = limites.maxY;
        if (y < limites.minY) y = limites.minY;

        box.style.top = `${y}px`;
        box.style.left = `${x}px`;
    }, FPS); 
}
if (voo) mover();

document.addEventListener("keydown", (event) => {
    keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
});

const despausa = document.querySelectorAll(".pausas");
despausa.forEach((button) => {
    button.addEventListener("click", function () {
        const atual = document.querySelector(".ativo");
        const proximo = document.querySelector(".sumido");

        atual.classList.remove("ativo");
        atual.classList.add("sumido");
        speed = 0;
        FPS = 0;
        proximo.classList.remove("sumido");
        proximo.classList.add("ativo");

        if (atual.classList.contains("pausa2")) {
            FPS = 1/30;
            speed = 2;
        }
    });
});
