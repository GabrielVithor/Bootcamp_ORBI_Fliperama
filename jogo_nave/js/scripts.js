$(function(){
    start = $('#inicio button');

    start.click(function(){
        $("#inicio").hide();
        $("#fundoGame").append('<div id="jogador"></div>');
        $("#fundoGame").append('<div id="inimigo1"></div>');
        $("#fundoGame").append('<div id="inimigo2"></div>');
        $("#fundoGame").append('<div id="amigo"></div>');
    })
})