$(function () {
    const start = $('#inicio button');
    const fundogame = $('#fundoGame');
    const teclas = {
        W: 87,
        S: 83,
        D: 68,
        A: 65,
        space: 32,
    }
    var jogo = {};

    //Validações e loops
    pressionou = [];
    $(document).keydown(function (e) {
        pressionou[e.which] = true;
    })

    $(document).keyup(function (e) {
        pressionou[e.which] = false;
    })

    //Loops

    //Funções
    start.click(function () {
        $("#inicio").hide();
        fundogame.append('<div id="jogador" class="anima1"></div>');
        fundogame.append('<div id="inimigo1" class="anima2"></div>');
        fundogame.append('<div id="inimigo2"></div>');
        fundogame.append('<div id="amigo" class="anima3"></div>');
        const jogador = $("#jogador");

        const inimigo1 = $("#inimigo1");
        var inimigo1X;
        var inimigo1Y;
        var inimigo1YRandom = parseInt(Math.random() * 350);

        //Constantes e variaveis

        function moverObjeto(sprite, position, limit, frames) {
            direcao = position;
            posicao = parseInt(sprite.css(position));
            var move;

            switch (position) {
                case "bottom":
                    direcao = "top"
                    break;
                case "right":
                    direcao = "left";
            }
            if (position == "bottom" || position == "right") {
                move = parseInt(sprite.css(direcao)) + frames;
            }
            if (position == "top" || position == "left") {
                move = posicao - frames;
            }

            if (posicao > limit) {
                sprite.css(direcao, move);
            }
        };
        //Game loop
        jogo.timer = setInterval(loop, 13.3);

        function loop() {
            moveFundo();
            moveJogador();
            moveInimigo1();
            moveInimigo2();
            moveAmigo();
            colisao();
        }

        function moveFundo() {
            esquerda = parseInt(fundogame.css("background-position"));
            fundogame.css("background-wwwwposition", esquerda - 1)
        }

        //Jogador
        //Sprite
        function moveJogador() {
            if (pressionou[teclas.W]) {
                moverObjeto(jogador, "top", 5, 8);
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
            if (pressionou[teclas.space]) {
                disparo()
            }
        }

        //Shot
        var podeAtirar = true;

        function disparo() {
            console.log("Tiro")
            if (podeAtirar == true) {
                podeAtirar = false;
                const top = parseInt(jogador.css("top"));
                const positionX = parseInt(jogador.css("left"));
                const tiroX = positionX + 190;
                const tiroY = top + 37;
                fundogame.append("<div id='disparo'></div>");
                $("#disparo").css("top", tiroY);
                $("#disparo").css("left", tiroX);
                var tempoDisparo = window.setInterval(executaDisparo, 13.3)
            }

            function executaDisparo() {
                const limit = -parseInt($("#disparo").css("width"));
                moverObjeto($("#disparo"), "right", limit, 10)
                if (parseInt($("#disparo").css("right")) <= limit) {
                    window.clearInterval(tempoDisparo);
                    tempoDisparo = null;
                    $("#disparo").remove();
                    podeAtirar = true;
                }
            }
        }

        //Inimigo1
        function moveInimigo1() {
            inimigo1X = parseInt(inimigo1.css('left'))
            inimigo1Y = parseInt(inimigo1.css('top'));
            const maxX = -parseInt(inimigo1.css('width'));
            const limit = (inimigo1X <= maxX);
            const velocidade = 5;
            inimigo1YRandom = parseInt(Math.random() * 350);
            respawnInimigo1(limit);
            moverObjeto(inimigo1, "left", maxX, velocidade);
        }

        function respawnInimigo1(el) {
            if (el) {
                inimigo1.css("left", "100%");
                inimigo1.css("top", inimigo1YRandom);
            }
        }
        //Inimigo2
        function moveInimigo2() {
            const velocidade = 2;
            const inimigo2 = $("#inimigo2");
            const positionX = parseInt(inimigo2.css('left'));
            const limit = -parseInt(inimigo2.css('width'));
            if (positionX <= limit) {
                inimigo2.css("left", "100%");
            }
            moverObjeto(inimigo2, "left", limit, velocidade);
        }
        //Amigo
        function moveAmigo() {
            const velocidade = 1;
            const amigo = $("#amigo");
            const positionX = parseInt(amigo.css('right'));
            const limit = -parseInt(amigo.css('width'));
            if (positionX <= limit) {
                amigo.css("left", "0");
            }
            moverObjeto(amigo, "right", limit, velocidade);
        }

        //Colisao
        function colisao() {
            var colisao1 = jogador.collision(inimigo1);
            limit = (colisao1.length > 0)
            if (limit) {
                explosao1(inimigo1X, inimigo1Y);
                respawnInimigo1(limit);
            }
        }

        function explosao1(x, y) {
            fundogame.append("<div id='explosao1'></div>");
            var explosao = $("#explosao1");
            explosao.css("top",y);
            explosao.css("left",x);
            explosao.animate({width:250,opacity:0},300);

            var tempoExposao = window.setInterval(removeExplosao,300);
            function removeExplosao(){
                explosao.remove();
                window.clearInterval(tempoExposao);
                tempoExposao = null;
            }
        }

        var finaljogo =false;

    })
})