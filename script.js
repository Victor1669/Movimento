const box = document.getElementById("minha_box");
const speed = 2;
let x = 0;
let y = 0;
let cond = true;

const keys = {};

function mover(){
    setInterval (() => {
        if (keys['ArrowUp']) {
            y -= speed;
        };
        if (keys['ArrowDown']) {
            y += speed;
        };
        if (keys['ArrowLeft']) {
            x -= speed;
        };
        if (keys['ArrowRight']) {
            x += speed;
        };

        box.style.top = `${y}px`;
        box.style.left = `${x}px`;
    }, (0.01));
}
if (cond == true) {
    mover();
};

// Detecta quando uma tecla é pressionada
document.addEventListener("keydown", event => {
    keys[event.key] = true;
    updatePosition();
});

// Detecta quando uma tecla é liberada
document.addEventListener("keyup", event => {
    keys[event.key] = false;
});



console.log();
