function Sprite(x, y, largura, altura){
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;

    this.desenha = function(xCanvas, yCanvas){
        ctx.drawImage(img, this.x, this.y, this.largura, this.altura, xCanvas, yCanvas, this.largura, this.altura);
    }
}

var bg = new Sprite(0, 0, 600, 600),
spriteBoneco = new Sprite(648, 24, 84, 188);

perdeu = new Sprite(648, 570, 297, 296),
jogar = new Sprite(648, 244, 300, 291),
novo = new Sprite(0, 622, 225, 226),
spriteRecord = new Sprite(0, 862, 264, 138),
spriteChao = new Sprite(391,938,600,54);