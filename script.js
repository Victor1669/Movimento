const box = document.getElementById("minha_box");
const tela = document.querySelector(".tela");
const keys = {};
const mediaQuery = window.matchMedia("(max-width: 768px)");
const botao = document.getElementById("0");
const boxSize = 66;
let speed = 2;
let x = 0;
let y = 0;
let voo = true;

// Função para calcular os limites da tela
function calcularLimites() {
    const telaRect = tela.getBoundingClientRect();
    return {
        minX: -telaRect.width / 2 + boxSize / 2 + 7,
        maxX: telaRect.width / 2 - boxSize / 2 - 7,
        minY: -telaRect.height / 2 + boxSize / 2 + 7,
        maxY: telaRect.height / 2 - boxSize / 2 - 3,
    };
}

// Atualiza os limites sempre que necessário
let limites = calcularLimites();
window.addEventListener("resize", () => {
    limites = calcularLimites();
});

// Função para mover o coração
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
    }, 1 / 30); 
}

if (voo) mover();

// Detecta quando uma tecla é pressionada
document.addEventListener("keydown", (event) => {
    keys[event.key] = true;
});

// Detecta quando uma tecla é liberada
document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
});

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

// Gerencia pausa e retomada
const despausa = document.querySelectorAll(".pausas");
despausa.forEach((button) => {
    button.addEventListener("click", function () {
        const atual = document.querySelector(".ativo");
        const proximo = document.querySelector(".sumido");

        atual.classList.remove("ativo");
        atual.classList.add("sumido");
        speed = 0;
        proximo.classList.remove("sumido");
        proximo.classList.add("ativo");

        if (atual.classList.contains("pausa2")) {
            speed = 2;
        }
    });
});
