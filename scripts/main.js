window.onload = () => {

const canvas = document.getElementById("base");
const ctx = canvas.getContext("2d");

const cWidth = canvas.width;
const cHeight = canvas.height;


const player = new Component(40, 40, 'brown', 650, 550, ctx, './docs/assets/images/minicat.png');

let game;


const startBtn = document.getElementById('start');

startBtn.addEventListener('click', () => {
  if (!game) {
    canvas.classList.remove("hidden")
    game = new Game(ctx, cWidth, cHeight, player, document);
    game.start();
  } else if (game && !game.isRunning) {
    game.reset();
  } 
});

document.addEventListener('keydown', (e) => {
    switch (e.code) {
      case 'ArrowLeft':
        player.speedX -= 1;
        break;
      case 'ArrowRight':
        player.speedX += 1;
        break;
    }
  });

  document.addEventListener('keyup', (e) => {
    player.speedX = 0;
    player.speedY = 0;
  });


}




