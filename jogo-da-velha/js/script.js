const line = document.querySelectorAll('#tabuleiro > div');
const box = document.querySelectorAll("#tabuleiro > div div");
const jogador = document.getElementById('jogador');
const idVencedor = document.getElementById('vencedor');
const button = document.getElementById('reiniciar');
const tabuleiro = [];
line.forEach((element, key) => {
    tabuleiro.push([]);
    element.querySelectorAll('div').forEach(element => {
        tabuleiro[key].push(element);
    });
});
var jogadas;
var jogadorSel = "X";


startGame(box);
selecionaJogador(box);
button.addEventListener('click',function(){reiniciar(box)});

function startGame(el) {
    el.forEach(element => {
        element.classList.add('click');
        element.classList.remove('playerX',"playerO");
        element.addEventListener('click', changeBox);
        element.innerHTML = "";
    });
    idVencedor.innerHTML ="";
    jogadas =0;
}
function changeBox() {
    jogadas++;
    console.log(jogadas);
    jogadoratual = selecionaJogador();
    this.innerHTML = jogadoratual;
    this.removeEventListener('click', changeBox);
    this.classList.remove("click");
    this.classList.add("player"+jogadoratual);
    Vencedor();
}
function selecionaJogador() {
    jogador.innerHTML = jogadorSel;
    if (jogadorSel == "O") {
        jogadorSel = "X"
    } else if (jogadorSel == "X") {
        jogadorSel = "O"
    }
    return jogadorSel;
}
function Vencedor() {
    const boxMap = tabuleiro.map(item => item.map(item => item.innerHTML));
   
    for (let i = 0; i < 3; i++) {
        if (boxMap[i][0] !== "" && boxMap[i][0] == boxMap[i][1] && boxMap[i][1] == boxMap[i][2]) {
            idVencedor.innerHTML = boxMap[i][0];
        }
        if (boxMap[0][i] !== "" && boxMap[0][i] == boxMap[1][i] && boxMap[1][i] == boxMap[2][i]) {
            idVencedor.innerHTML = boxMap[0][i];
        }
        if (boxMap[0][0] !== "" && boxMap[0][0] == boxMap[1][1] && boxMap[1][1] == boxMap[2][2]) {
            idVencedor.innerHTML = boxMap[0][0];
        }
        if (boxMap[2][0] !== "" && boxMap[2][0] == boxMap[1][1] && boxMap[1][1] == boxMap[0][2]) {
            idVencedor.innerHTML = boxMap[0][2];
        }
    }

    if( idVencedor.innerHTML !==""){
        endGame(box);
        console.log("O erro esta no vencedor");
    }else if(idVencedor.innerHTML =="" && jogadas == 9){
        idVencedor.innerHTML ="Empate";
        endGame(box);
    }
}
function reiniciar(el) {
    endGame(el);
    startGame(el);
}
function endGame(el) {
    el.forEach(element => {
        element.classList.remove('click');
        element.removeEventListener('click', changeBox);
    })
}