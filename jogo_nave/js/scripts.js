$(function () {

    //Constantes e variaveis
    const start = $('#inicio button');
    const fundogame = $('#fundoGame');

    const teclas = {
        W: 87,
        S: 83,
        D: 68,
        A: 65,
    }
    var jogo = {};

    //Validações
    pressionou = [];
    $(document).keydown(function (e) {
        pressionou[e.which] = true;
    })

    $(document).keyup(function (e) {
        pressionou[e.which] = false;
    })

    function moverObjeto(elemento,position, limit, frames) {
        direcao = position;
        posicao = parseInt(elemento.css(position));
        var move;

        switch (position) {
            case "bottom":
                direcao = "top"
                break;
            case "right":
                direcao = "left";
        }
        if (position == "bottom" || position == "right") {
            move = parseInt(elemento.css(direcao)) + frames;
        }
        if(position == "top" || position == "left"){
            move = posicao - frames;
        }

        if (posicao > limit) {
            elemento.css(direcao,move);
        }
    };

    //Loops

    //Funções
    start.click(function () {
        $("#inicio").hide();
        fundogame.append('<div id="jogador" class="anima1"></div>');
        fundogame.append('<div id="inimigo1" class="anima2"></div>');
        fundogame.append('<div id="inimigo2"></div>');
        fundogame.append('<div id="amigo" class="anima3"></div>');
        //Game loop
        jogo.timer = setInterval(loop, 16);
    })

    function loop() {
        moveFundo();
        moveJogador();
        moveInimigo1();
        moveInimigo2();
        moveAmigo();
    }

    function moveFundo() {
        esquerda = parseInt(fundogame.css("background-position"));
        fundogame.css("background-position", esquerda - 1)
    }

    //Jogador
    function moveJogador() {
        const jogador = $("#jogador");

        if (pressionou[teclas.W]) {
            moverObjeto(jogador, "top", 5, 5);
        }

        if (pressionou[teclas.S]) {
            moverObjeto(jogador, "bottom", 100, 5);
        }
        if (pressionou[teclas.D]) {
            moverObjeto(jogador, "right", 5, 5);
        }
        if (pressionou[teclas.A]) {
            moverObjeto(jogador, "left", 5, 5);
        }


    }

    //Inimigo1
    function moveInimigo1() {
        const velocidade = 4;
        const inimigo1 = $("#inimigo1");
        const positionX = parseInt(inimigo1.css('left'));
        const limit = - parseInt(inimigo1.css('width'));
        if(positionX <= limit){
            const positionY = parseInt(Math.random() * 350);
            inimigo1.css("left","100%");
            inimigo1.css("top",positionY);
        }
        moverObjeto(inimigo1,"left",limit,velocidade);
    }

    //Inimigo2
    function moveInimigo2() {
        const velocidade = 2;
        const inimigo2 = $("#inimigo2");
        const positionX = parseInt(inimigo2.css('left'));
        const limit = - parseInt(inimigo2.css('width'));
        if(positionX <= limit){
            inimigo2.css("left","100%");
        }
        moverObjeto(inimigo2,"left",limit,velocidade);
    }

    function moveAmigo() {
        const velocidade = 1;
        const amigo = $("#amigo");
        const positionX = parseInt(amigo.css('right'));
        const limit = - parseInt(amigo.css('width'));
        if(positionX <= limit){
            amigo.css("left","0");
        }
        moverObjeto(amigo,"right",limit,velocidade);
    }
})