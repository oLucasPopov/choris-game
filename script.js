var canvas,
    ctx,
    ALTURA,
    LARGURA,
    maxPulos = 3,
    velocidade = 6,
    estadoAtual,
    dificuldade = 35,
    selectedDificulty = 1,
    record,
    img;

DIFICULTY = {
    RELAX: 1,
    EASY: 2,
    MEDIUM: 3,
    HARD: 4,
    GOD: 5
}

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

function changeDificulty(selection) {
    switch (selection) {
        case "+":
            if (selectedDificulty > DIFICULTY.RELAX)
                selectedDificulty--
            break
        case "-":
            if (selectedDificulty < DIFICULTY.GOD)
                selectedDificulty++
            break
    }
}

function getDificultyValue() {
    switch (selectedDificulty) {
        case DIFICULTY.RELAX:
            return 1000
        case DIFICULTY.EASY:
            return 50
        case DIFICULTY.MEDIUM:
            return 45
        case DIFICULTY.HARD:
            return 35
        case DIFICULTY.GOD:
            return 0
    }
}
let touchStartY = 0
let touchEndY = 0

function handleGesture() {
  if (touchEndY < touchStartY) changeDificulty('+')
  if (touchEndY > touchStartY) changeDificulty('-')
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
        switch (e.code) {
            case "Space":
                if (estadoAtual !== estados.perdeu)
                    clique()
                break
            case "ArrowUp": changeDificulty("+")
                break
            case "ArrowDown": changeDificulty("-")
                break
        }
    });
    document.addEventListener("touchstart", e =>{
        touchStartY = e.changedTouches[0].screenY
    })
    document.addEventListener("touchend", e =>{
        touchEndY = e.changedTouches[0].screenY
        handleGesture()
    })

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
            ctx.fillText("Swipe or Click to", 120, 100);
            ctx.fillText("Choose a Dificulty!", 100, 150);

            switch (selectedDificulty) {
                case 1: ctx.fillText("Relax", 250, 300);
                    break
                case 2: ctx.fillText("Easy", 250, 300);
                    break
                case 3: ctx.fillText("Medium", 250, 300);
                    break
                case 4: ctx.fillText("Hard", 250, 300);
                    break
                case 5: ctx.fillText("God", 250, 300);
                    break
            }

            break;
        case (estados.perdeu):
            ctx.fillStyle = "#fff";

            switch (selectedDificulty) {
                case DIFICULTY.RELAX:
                    ctx.fillText("Relaxed too much, eh?", 55, 175)
                    break
                case DIFICULTY.EASY:
                    ctx.fillText("That was easy, bro...", 80, 175)
                    break
                case DIFICULTY.MEDIUM:
                    ctx.fillText("It's not that hard...", 90, 175)
                    break
                case DIFICULTY.HARD:
                    ctx.fillText("You can't do it, can you?", 10, 175)
                    break
                case DIFICULTY.GOD:
                    ctx.fillText("Wait, you're not a God.", 80, 175)
                    break
            }

            ctx.fillText("score: " + bloco.score, 200, 240)


            if (bloco.score > record) {
                ctx.fillStyle = "cyan";
                ctx.fillText("New record!", 180, 300);
            }
            else {
                ctx.fillText("record: " + record, 180, 300);
            }
            ctx.fillStyle = "cyan";
            ctx.fillText("Click to play again", 90, 360)
            break;
    }

    chao.desenha();
    bloco.desenha();
}

main();