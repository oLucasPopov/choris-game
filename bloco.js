bloco = {
  x: 50,
  y: 0,
  altura: spriteBoneco.altura,
  largura: spriteBoneco.largura,
  gravidade: 1.6,
  velocidade: 0,
  forcaDoPulo: 23.6,
  qntPulos: 0,
  score: 0,

  atualiza: function () {
      this.velocidade += this.gravidade;
      this.y += this.velocidade;

      if (this.y > chao.y - this.altura && estadoAtual != estados.perdeu) {
          this.y = chao.y - this.altura;
          this.qntPulos = 0;
          this.velocidade = 0;
      }
  },

  pula: function () {
      if (this.qntPulos < maxPulos) {
          this.velocidade = -this.forcaDoPulo;
          this.qntPulos++;

      }
  },

  reset: function () {
      this.velocidade = 0;
      this.y = 0;

      if (this.score > record) {
          localStorage.setItem("record", this.score);
          record = this.score;
      }

      this.score = 0;
  },

  desenha: function () {
      spriteBoneco.desenha(this.x, this.y);
  }
}