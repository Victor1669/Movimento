const box = document.getElementById("minha_box");
const speed = 5;
let x = 0;
let y = 0;

document.addEventListener("keydown", event => {

    if(event.key.startsWith('Arrow')) {

        switch(event.key){
            case 'ArrowUp':
                y -= speed;
                break;
            case 'ArrowDown':
                y += speed;
                break;
            case 'ArrowLeft':
                x -= speed;
                break;
            case 'ArrowRight':
                x += speed;
                break;
        }

        box.style.top = `${y}px`;
        box.style.left = `${x}px`;
    }

})

document.addEventListener("keyup", event => {})
