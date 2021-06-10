var canvas, ctx, ALTURA, LARGURA, maxPulos = 3, velocidade = 6,
    estadoAtual, record, img,

    estados = {
        jogar: 0,
        jogando: 1,
        perdeu: 2
    },

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
    },

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
    },

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

            this.tempoInsere = 35 + Math.floor(26 * Math.random());
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
        },

        desenha: function () {
            for (var i = 0, tam = this._obs.length; i < tam; i++) {
                var obs = this._obs[i];
                ctx.fillStyle = obs.cor;
                ctx.fillRect(obs.x, chao.y - obs.altura, obs.largura, obs.altura);
            }
        }
    };

function clique() {
    switch (estadoAtual) {
        case (estados.jogando):
            bloco.pula();
            break;
        case (estados.jogar):
            estadoAtual = estados.jogando;
            break;
        case (estados.perdeu): {
            estadoAtual = estados.jogar;
            obstaculos.limpa();
            bloco.reset();
        }
    }
}

function main() {
    ALTURA = window.innerHeight;
    LARGURA = window.innerWidth;

    if (LARGURA >= 500) {
        LARGURA = 600;
        ALTURA = 600;
    }

    canvas = document.createElement("canvas");
    canvas.width = LARGURA;
    canvas.height = ALTURA;
    canvas.style.border = "1px solid #000"

    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);
    document.addEventListener("mousedown", clique);
    document.addEventListener('keydown', e => {
        if (e.code === "Space") clique()
    });

    estadoAtual = estados.jogar;
    record = localStorage.getItem("record");

    if (record == null)
        record = 0;

    img = new Image();
    img.src = "imagens/sheet.png";

    roda();
}

function roda() {
    atualiza();
    desenha();
    if (fim = true) {
        audio.play();
    }
    window.requestAnimationFrame(roda);
}

function atualiza() {
    if (estadoAtual == estados.jogando)
        obstaculos.atualiza();

    chao.atualiza();
    bloco.atualiza();


}

function desenha() {
    bg.desenha(0, 0);

    ctx.fillStyle = "#fff";
    ctx.font = "50px Arial";
    ctx.fillText(bloco.score, 30, 68);

    switch (estadoAtual) {
        case (estados.jogando):
            obstaculos.desenha();
            break;
        case (estados.jogar):
            ctx.fillText("CLIQUE", LARGURA / 2 - 30, 200);
            ctx.fillText("PARA", LARGURA / 2 - 30, 300);
            ctx.fillText("JOGAR", LARGURA / 2 - 30, 400);
            break;
        case (estados.perdeu):
            ctx.fillStyle = "#fff";

            if (LARGURA > 300) {
                ctx.fillText("oh noes, vc perdeu!", 80, 175);
                ctx.fillText("pontuação: " + bloco.score, 140, 240);

                ctx.fillText("clique para", 150, 400);
                ctx.fillText("jogar novamente!", 80, 450);
                ctx.fillStyle = "cyan";

                if (bloco.score > record) {
                    ctx.fillText("Novo record!", 145, 300);
                }
                else {
                    ctx.fillText("record: " + record, 169, 300);
                }
            } else {
                ctx.font = "20px Arial";
                ctx.fillText("oh noes, vc perdeu!", 40, 175);
                ctx.fillText("pontuação: " + bloco.score, 80, 240);

                ctx.fillText("clique para", 75, 400);
                ctx.fillText("jogar novamente!", 40, 450);
                ctx.fillText(bloco.score, 250, 375);

                if (bloco.score > record) {
                    ctx.fillStyle = "cyan";
                    ctx.fillText("Novo record!", 76, 300);
                }
                else {
                    ctx.fillStyle = "cyan";
                    ctx.fillText("record: " + record, 89, 300);
                }
            }
            break;
    }

    chao.desenha();
    bloco.desenha();
}


//inicializa o jogo
main();
