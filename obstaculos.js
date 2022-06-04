obstaculos = {
  _obs: [],
  cores: ["#ffbc1c", "#ff1c1c", "#ff85e1", "#52a7ff", "#78ff5d"],
  tempoInsere: 0,

  insere: function () {
      this._obs.push({
          x: LARGURA,
          largura: 50,
          altura: 30 + Math.floor(120 * Math.random()),
          cor: this.cores[Math.floor(5 * Math.random())]
      });

      this.tempoInsere = getDificultyValue() + Math.floor(26 * Math.random());
  },

  atualiza: function () {
      if (this.tempoInsere == 0)
          this.insere();
      else
          this.tempoInsere--;

      for (var i = 0, tam = this._obs.length; i < tam; i++) {
          var obs = this._obs[i];

          obs.x -= velocidade;
          if (bloco.x < obs.x + obs.largura && bloco.x + bloco.largura >= obs.x && bloco.y + bloco.altura >= chao.y - obs.altura)
              estadoAtual = estados.perdeu;

          else if (obs.x == 0)
              bloco.score++

          else if (obs.x <= -obs.largura) {
              this._obs.splice(i, 1);
              tam--;
              i--;
          }
      }
  },

  limpa: function () {
      this._obs = [];
      this.tempoInsere = 1;
  },

  desenha: function () {
      for (var i = 0, tam = this._obs.length; i < tam; i++) {
          var obs = this._obs[i];
          ctx.fillStyle = obs.cor;
          ctx.fillRect(obs.x, chao.y - obs.altura, obs.largura, obs.altura);
      }
  }
}