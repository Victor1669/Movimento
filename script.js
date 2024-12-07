const box = document.getElementById("minha_box");
const speed = 2;
const keys = {};
let x = 0;
let y = 0;
let cond = true;
 

function mover(largura){
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

        if (x >= 384) {
            x -= 2;
        };
        if (x <= -384) {
            x += 2;
        };
        if (y >= 122) {
            y -= 2;
        };
        if (y <= -120) {
            y += 2;
        };


    }, (1/30));


}
if (cond == true) {
    mover();
};

// Detecta quando uma tecla é pressionada
document.addEventListener("keydown", event => {
    keys[event.key] = true;
});

// Detecta quando uma tecla é liberada
document.addEventListener("keyup", event => {
    keys[event.key] = false;
});

console.log(x.left);
