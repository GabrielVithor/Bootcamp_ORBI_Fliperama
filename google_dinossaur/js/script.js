const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
let position =10;
let isJump = false;

document.addEventListener("keydown",handleKeyUp);


function handleKeyUp(event){
    if(event.key == " " && isJump == false){
        jump();
    }
}
function jump(){
    let upInterval = setInterval(()=>{
        if(position >=  150){
            clearInterval(upInterval);
            let downInterval = setInterval(()=>{
                if(position <= 10){
                    clearInterval(downInterval);
                    isJump = false;
                }else{
                    position -= 5;
                    dino.style.bottom = `${position}px`
                }
            },13.3)
        }else{
            position += 5;
            dino.style.bottom = `${position}px`
            isJump = true
        }
    },13.3)
}

function createCactus(){
    const cactus = document.createElement("div");
    let cactusPosition =1000;
    let randomTime = Math.floor(Math.random(500) * 6000)
    cactus.classList.add("cactus");
    cactus.style.left=`${cactusPosition}px`
    background.appendChild(cactus);

    let leftInterval = setInterval(()=>{
        if(cactusPosition == -60){
            clearInterval(leftInterval);
            cactus.remove();
        }else if(cactusPosition >0 && cactusPosition < 60 && position < 60){
            clearInterval(leftInterval);
            clearTimeout(spawn);
            background.innerHTML = "<h1>Game Over</h1>"
        }else{
            cactusPosition -= 5;
            cactus.style.left= `${cactusPosition}px`;
        }
    },16);

    let spawn = setTimeout(createCactus,randomTime);
}

createCactus();