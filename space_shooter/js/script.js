const yourShip = document.getElementById("player-shooter");
const playArea = document.getElementById("play-area");
const aliensList = ["img/monster-1.png", 'img/monster-2.png', 'img/monster-3.png'];
const gameInstructions = document.querySelector(".game-start");
const startButton = document.querySelector(".start-button");
let alienInterval;
//Setting controls
function flyShip(event) {
    if (event.key === "ArrowUp") {
        event.preventDefault(); // previne o movimento padrão do browse
        moveUp();
    } else if (event.key === "ArrowDown") {
        event.preventDefault();
        moveDown()
    } else if (event.key === " ") {
        event.preventDefault();
        fireLaser();
    }
}

//Moviments
function moveUp() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue("top");
    let position = parseInt(topPosition);
    if (position <= 20) {} else {
        position -= 50;
        yourShip.style.top = `${position}px`;
    }
}

function moveDown() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue("top");
    let position = parseInt(topPosition);
    if (position >= 520) {
        return
    } else {
        position += 50;
        yourShip.style.top = `${position}px`
    }
}

function fireLaser() {
    let laser = createLaser();
    playArea.appendChild(laser);
    moveLaser(laser);
}

function createLaser() {
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue("left"));
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let newLaser = document.createElement("img");
    newLaser.src = "img/shoot.png";
    newLaser.classList.add("laser");
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition - 20}px`
    return newLaser;
}

function moveLaser(laser) {
    laserInterval = window.setInterval(() => {
        let xPosition = parseInt(laser.style.left);
        let aliens = document.querySelectorAll('.alien');

        aliens.forEach((alien) => {
            if (checkCollision(laser, alien)) {
                alien.src = "img/explosion.png";
                alien.classList.remove("alien")
                alien.classList.add("dead-alien");
            }
        });
        if (xPosition >= 340) {
            laser.remove();
        } else {
            laser.style.left = `${xPosition+8}px`;
        }
    }, 16)
}

//Aliens
function createAliens() {
    let newAlien = document.createElement("img");
    let alienSprite = aliensList[Math.floor(Math.random() * 3)];
    newAlien.src = alienSprite;
    newAlien.classList.add("alien")
    newAlien.classList.add('alien-transition');
    newAlien.style.left = '340px';
    newAlien.style.top = `${Math.floor(Math.random()* 330)+30}px`;
    playArea.appendChild(newAlien);
    moveAlien(newAlien);
}

function moveAlien(alien) {
    var alienInterval = window.setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
        if (xPosition <= 50) {
            if (Array.from(alien.classList).includes('dead-alien')) {
                alien.remove();
            } else {
                gameOver();
            }
        } else {
            alien.style.left = `${xPosition - 1}px`
        }
    },16)

}

//Collisions

function checkCollision(laser, alien) {
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop - 20;
    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBottom = alienTop - 60;

    if (laserLeft != 340 && laserLeft + 40 >= alienLeft) {
        if (laserTop <= alienTop && laserTop >= alienBottom) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

//Playgame
function playGame() {
    startButton.style.display = "none";
    gameInstructions.style.display = "none";
    window.addEventListener("keydown", flyShip);

    alienInterval = setInterval(() => {
        createAliens();
    },2000)
}

startButton.addEventListener("click", (event) => {
    playGame();
})

//Gameover

function gameOver() {
    window.removeEventListener("keydown", flyShip);
    clearInterval(alienInterval);
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien) => alien.remove());
    let lasers = document.querySelectorAll(".laser");
    lasers.forEach((laser) => laser.remove());

    setTimeout(() => {
        alert("game-over");
        yourShip.style.top = "250px";
        startButton.style.display = "block";
        gameInstructions.style.display = "block";
    })
}