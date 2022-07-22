

class Game {
  constructor(ctx, width, height, player, document) {
      this.frames = 0;
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.player = player;
      this.obstacles = [];
      this.interval = null;
      this.isRunning = false;
      this.badObstacles = []
      this.goodObstacles = []
      this.bigObstacles = [];
      this.life = 7;       
      this.document = document;
      
      const gameOver = new Image();
      gameOver.addEventListener('load', () => {});
      gameOver.src = ("./docs/assets/images/catlower.jpg");
      this.gameOver = gameOver;
}
start = () => {
  this.document.getElementById("start").classList.add("hidden");
  this.interval = setInterval(this.updateGameArea, 4);
  this.isRunning = true;
  //music = new sound("./docs/assets/sounds/Kirby.mp3");
}


reset = () => {
  this.player.x = 0;
  this.player.y = 110;
  this.frames = 0;
  this.obstacles = [];
  this.start();
  this.gameOver.src = ("./docs/assets/sounds/Kirby.mp3")
}

clear() {
  this.ctx.clearRect(0, 0, this.width, this.height);
}

stop() {
  this.document.getElementById("start").classList.remove("hidden");

  /* let img = new Image()
  img.src = "../docs/assets/images/backgroundIMAGE.jpg";
  this.ctx.drawImage(img, 0, 0,this.width, this.height) */
  this.ctx.fillStyle = "./docs/assets/images/catlower.jpg"                 // nao funciona
  this.ctx.fillRect(0, 0, this.width, this.height)
  this.ctx.fillStyle = "black"
  this.ctx.fillText("Game Over", 500, 300)
  clearInterval(this.interval);
  this.isRunning = false;
}

// damage obstacle 
createObstacles() {
  if(this.frames % 30 === 0) {
      let width = Math.floor(Math.random() * this.width);
      this.badObstacles.push(new Component(30, 40 , "red", width, 10, this.ctx, './docs/assets/images/pickle.png'))
  }
  if(this.frames % 250 === 0) {
      let width = Math.floor(Math.random() * this.width);
      this.goodObstacles.push(new Component(40, 30, "yellow", width, 10, this.ctx, './docs/assets/images/sushi.png'))
  }
  if(this.frames % 300 === 0) {
      let width = Math.floor(Math.random() * this.width);
      this.bigObstacles.push(new Component(40, 30, "orange", width, 10, this.ctx, './docs/assets/images/flower.png'))
  }
}


updateObstacles() {
  for (let i = 0; i < this.goodObstacles.length; i++) {
      this.goodObstacles[i].y += 1;
      this.goodObstacles[i].draw();
  }
  for (let i = 0; i < this.bigObstacles.length; i++) {
      this.bigObstacles[i].y += 1;
      this.bigObstacles[i].draw();
  }
  for (let i = 0; i < this.badObstacles.length; i++) {
      this.badObstacles[i].y += 1;
      this.badObstacles[i].draw();
  }
}

getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

checkCollisions(){
  const badCrash = this.badObstacles.some((obstacle) => {
      if(this.player.crashWith(obstacle)){
          this.badObstacles.splice(this.badObstacles.indexOf(obstacle), 1)
          this.life --
          return true
      }
  })
  const goodCrash = this.goodObstacles.some((obstacle) => {
      if(this.player.crashWith(obstacle)){
          this.goodObstacles.splice(this.goodObstacles.indexOf(obstacle), 1)
          if (this.life < 7) {
              this.life++;
          }
          return true
      }
  })
  const bigCrash = this.bigObstacles.some((obstacle) => {
      if(this.player.crashWith(obstacle)){
          this.bigObstacles.splice(this.bigObstacles.indexOf(obstacle), 1)
          return true
      }
  })

      
  if(bigCrash){
      this.player.width = 70
      this.player.height = 70
      this.player.y = 480;
  } 
  }

checkGameOver(){
  if(this.life === 0){
    this.stop();
    this.ctx.drawImage(this.gameOver, 0, 0, this.width, this.height)

  }
}
  
drawLife(){
  this.ctx.font = '24px serif'
  this.ctx.fillStyle = 'white'
  this.ctx.fillText(`Life: ${this.life}`, 1050, 40)
}
drawScore(){
  let points = Math.floor(this.frames / 90);
  this.ctx.font = '24px serif'
  this.ctx.fillStyle = 'white'
  this.ctx.fillText(`Score: ${points}`, 1140, 40)
}
/*uplevel(){
  if(points > 10)
  this.start.interval = setInterval(this.updateGameArea, 2);    
} */

updateGameArea = () => {
  this.frames++
  this.clear();
  this.player.newPosition();
  this.player.draw();
  this.createObstacles()
  this.updateObstacles()
  this.checkCollisions()
  this.drawLife()
  this.drawScore()
  /*this.uplevel()  */
  this.checkGameOver()
};

};


const canvas = document.getElementById("base");
const ctx = canvas.getContext("2d");

const cWidth = canvas.width;
const cHeight = canvas.height;


const player = new Component(40, 40, 'brown', 650, 550, ctx, './docs/assets/images/minicat.png');

let game;


const startBtn = document.getElementById('start');
window.onload = () => {

  startBtn.addEventListener('click', () => {
    if (!game) {
      canvas.classList.remove("hidden")
      game = new Game(ctx, cWidth, cHeight, player, document);
      game.start();
    } else if (game && !game.isRunning) {
      game.reset();
    } 
  });
}
  
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






