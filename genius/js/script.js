let order =[];
let clickedOrder = [];
let score = 0;

// Identificação das cores :
//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

//Random color order
let shuflleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder =[];
    for(let i  in order){
        let elementColor = createElement(order[i]);
        lightColor(elementColor,Number(i)+1)
    }
}

//Light next color
let lightColor = (el,number) =>{
    time = number * 500;
    setTimeout(() => {
        el.classList.add("selected");
    }, time - 250);
    setTimeout(()=>{
el.classList.remove('selected');
    },time)
}

//Check order with clickorder
let checkOrder = ()=>{
    for(let i in clickedOrder){
        if(clickedOrder[i] != order[i]){
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length){
        alert(`Pontuação: ${score} \n Você acertou! Iniciando o proximo nivel!`);
        nextLevel();
    }
}

//Function click user
let click = (color)=>{
    clickedOrder[clickedOrder.length]= color;
    createElement(color).classList.add('selected');

    setTimeout(()=>{
        createElement(color).classList.remove("selected");
        checkOrder();
    },250)
}

// Create element function
let createElement = (color) =>{
    if(color  ==  0)
    return green
    else if(color ==1)
    return red;
    else if(color == 2)
    return yellow
    else if(color ==3)
    return blue
}

//Next level function
let nextLevel = () =>{
    score++;
    shuflleOrder()
}

//Lose function
let gameOver = ()=>{
    alert(`Pontuação: ${score}!\n Você perdeu\n Clique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];
    
    playGame();
}

//Play game function
let playGame = () =>{
    alert(`Bem-vindo ao Genius! \n Iniciando novo jogo!`);
    score = 0;
    nextLevel();
}
//Events click
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();