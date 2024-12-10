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
        maxY: telaRect.height / 2 - boxSize / 2 + 15.5,
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
    setInterval((timer, minY, pular) => {
        pular = true
        const telaRect = tela.getBoundingClientRect();
        timer = 0;
        minY = -telaRect.height / 2 + boxSize / 2 - 9.5;

        box.style.top = `${y}px`;
        box.style.left = `${x}px`;

        if (x > limites.maxX - 7) x = limites.maxX - 7;
        if (x < limites.minX + 8) x = limites.minX + 8;
        if (y > limites.maxY - 5) y = limites.maxY - 5;
        if (y < limites.minY + 7) y = limites.minY + 7;
        if (y <= 65.5) y += 0.85;

        if (keys["ArrowLeft"]) x -= speed;
        if (keys["ArrowRight"]) x += speed;

        function pulo() {
            if (keys["ArrowUp"] && (y == 66 || y == 67)) {
                while (timer <= 100) {
                    y -= 0.85;
                    timer += 1;
                };
            } 
        }
        if (pular == true) {
            pulo();
        }
        if (y < 66) {
            pular = false;
        }
        if (y == 66.30000000000005) {
            y = 66;
        }

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
        pular = false;
        speed = 0;
        FPS = 0;
        proximo.classList.remove("sumido");
        proximo.classList.add("ativo");

        if (atual.classList.contains("pausa2")) {
            FPS = 1/30;
            speed = 2;
            pular = true;
        }
        console.log(pular);
    });
});
