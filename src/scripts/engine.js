const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#timeleft"),
        lives: document.querySelector("#lives"),
        score: document.querySelector("#score")
    },

    values: {

        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
        livesCount: 3,
    },

    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown(){
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if (state.values.curretTime <= 0 || state.values.livesCount === 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
}

function playSound(){
    /* let audio = new Audio('./src/audios/${audioName}.m4a'); - Para criar uma função onde o audio possa ser genérico,
    E assim, é só passar o nome do arquivo na função audio.play(nomedoaudio);*/
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

/*Função para mover o Ralph aleatoriamente com um timer
function moveEnemy(){
    state.values.timerId = setInterval(randomSquare,state.values.gameVelocity)
}
/*Listener é adicionar uma função de acompanhar/ ouvir uma ação */

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                /*state.values.hitPosition = null;*/
                playSound();

            } else {
                state.values.livesCount--;
                state.view.lives.textContent = state.values.livesCount;
            }

        });
    });
}


/*Função para iniciar, rodar o projeto. Pode ser init, initialize, start...*/
function init(){
    document.addEventListener("DOMContentLoaded", () => {
        addListenerHitBox();
    });
}

init();
