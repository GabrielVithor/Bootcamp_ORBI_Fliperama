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
    var pontos = 0;
    var salvos = 0;
    var perdidos = 0;
    var energiaAtual = 3;

    //Validações e loops
    pressionou = [];
    $(document).keydown(function (e) {
        pressionou[e.which] = true;
    })

    $(document).keyup(function (e) {
        pressionou[e.which] = false;
    })

    //Loops
    start.click(inicio);
    //Funções
     function inicio(){
        $("#inicio").hide();
        fundogame.append('<div id="jogador" class="anima1"></div>');
        fundogame.append('<div id="inimigo1" class="anima2"></div>');
        fundogame.append('<div id="inimigo2"></div>');
        fundogame.append('<div id="amigo" class="anima3"></div>');
<<<<<<< HEAD
        fundogame.append("<div id='placar'></div>");
        fundogame.append("<div id='vida'></div>")
        var finaljogo = false;
=======
>>>>>>> parent of e808aea (pontos-and-scores)
        const jogador = $("#jogador");

        const inimigo1 = $("#inimigo1");
        var inimigo1X;
        var inimigo1Y;
        var inimigo1YRandom = parseInt(Math.random() * 350);
<<<<<<< HEAD
        var inimigo2X;
        var amigoX;

        var somExplosao = document.getElementById("somExplosao");
        var somGameOver = document.getElementById("somGameover");
        var somDisparo = document.getElementById("somDisparo");
        var musica = document.getElementById("musica");
        var somResgate = document.getElementById("somResgate");
        var somPerdido = document.getElementById("somPerdido");

        musica.addEventListener("ended", () => {
            musica.currentTime = 0;
            musica.play();
        });
        musica.play();
=======

        //Constantes e variaveis
>>>>>>> parent of e808aea (pontos-and-scores)

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
        jogo.timer = window.setInterval(loop, 13.3);

        function loop() {
            moveFundo();
            moveJogador();
            moveInimigo1();
            moveInimigo2();
            moveAmigo();
            colisao();
<<<<<<< HEAD
            placar();
            vidas();
            if (energiaAtual < 0) {
                GameOver();
            }
=======
>>>>>>> parent of e808aea (pontos-and-scores)
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
                somDisparo.play()
                podeAtirar = false;
                const top = parseInt(jogador.css("top"));
                const positionX = parseInt(jogador.css("left"));
                const tiroX = positionX + 190;
                const tiroY = top + 37;
                fundogame.append("<div id='disparo'></div>");
                $("#disparo").css("top", tiroY);
                $("#disparo").css("left", tiroX);
                var tempoDisparo = window.setInterval(executaDisparo, 6.6);
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
<<<<<<< HEAD
            const inimigo2 = $("#inimigo2");
            const colisao2 = jogador.collision(inimigo2);
            const colisao3 = $("#disparo").collision(inimigo1);
            const colisao4 = $("#disparo").collision(inimigo2);
            const colisao5 = jogador.collision(amigo);
            const colisao6 = amigo.collision(inimigo2)
            const colisao1 = jogador.collision(inimigo1);

            switch (true) {
                case colisao1.length > 0:
                    explosao(inimigo1X, inimigo1Y);
                    respawn(colisao1.length > 0, inimigo1);
                    energiaAtual--;
                    break;
                case colisao2.length > 0:
                    explosao(inimigo2X, inimigo2.css("top"));
                    inimigo2.remove();
                    reposiciona("inimigo2", 5000);
                    energiaAtual--;
                    break;
                case colisao3.length > 0:
                    explosao(inimigo1X, inimigo1Y);
                    $("#disparo").css('left', 1000);
                    respawn(colisao3.length > 0, inimigo1);
                    pontos += 100;
                    break;
                case colisao4.length > 0:
                    explosao(inimigo2X, inimigo2.css("top"));
                    $("#disparo").css('left', 1000);
                    inimigo2.remove();
                    reposiciona("inimigo2", 5000);
                    pontos += 50;
                    break;
                case colisao5.length > 0:
                    amigo.remove();
                    reposiciona("amigo", 6000, "anima3");
                    salvos++;
                    somResgate.play();
                    break;
                case colisao6.length > 0:
                    morteAmigo();
                    reposiciona("amigo", 6000, "anima3");
                    perdidos++;
                    somPerdido.play();
=======
            var colisao1 = jogador.collision(inimigo1);
            limit = (colisao1.length > 0)
            if (limit) {
                explosao1(inimigo1X, inimigo1Y);
                respawnInimigo1(limit);
>>>>>>> parent of e808aea (pontos-and-scores)
            }
        }

        function explosao1(x, y) {
            fundogame.append("<div id='explosao1'></div>");
            somExplosao.play()
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

<<<<<<< HEAD
        function reposiciona(stringEl, delay, stringClass = "") {
            var tempoColisao2 = window.setInterval(reposiciona2, delay);

            function reposiciona2() {
                window.clearInterval(tempoColisao2)
                tempoColisao2 = null;
                if (finaljogo == false) {
                    fundogame.append("<div id='" + stringEl + "'class='" + stringClass + "'></div>")
                }
            }
        }

        function morteAmigo() {
            fundogame.append("<div id='amigoMorte' class='anima4'></div>")
            $("#amigoMorte").css("right", amigoX)
            amigo.remove();

            var tempoMorte = window.setInterval(morte, 2000);

            function morte() {
                window.clearInterval(tempoMorte);
                tempoMorte = null;
                $("#amigoMorte").remove();
            }
        }

        function placar() {
            $("#placar").html("<h3>Pontos: " + pontos + " | Salvos: " + salvos + " |Perdidos: " + perdidos + "</h3>")
        }

        function vidas() {
            if (finaljogo == false)
                $("#vida").css("background-image", 'url(' + "'imgs/energia" + energiaAtual + ".png'" + ')')
        }
=======
        var finaljogo =false;
>>>>>>> parent of e808aea (pontos-and-scores)

        function GameOver() {
            $("#fundoGame > *").remove();
            $("#fundoGame #inicio").show();
            window.clearInterval(jogo.timer);
            $("#fundoGame").append("<div id='fim'></div>");
            $("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi:</p>" +"<p>Pontos: " + pontos + "</p><p>Salvos: " + salvos + "</p><p>Perdidos: " + perdidos + "</p><div id='reinicia' onClick='reiniciaJogo()'><button>Jogar Novamente</button></div>");
            energiaAtual=3;
            jogo.timer = null;
            finaljogo = true;
        }
    }
    reiniciaJogo = () =>{
        $("#fim").remove();
        musica.pause();
        inicio();
    }
})