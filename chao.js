chao = {
  y: 550,
  x: 0,
  altura: 50,
  atualiza: function () {
      this.x -= velocidade;
      if (this.x <= -600)
          this.x = 0;
  },

  desenha: function () {
      spriteChao.desenha(this.x, this.y);
      spriteChao.desenha(this.x + spriteChao.largura, this.y);
  }
}