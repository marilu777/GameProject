class Game{
    constructor(ctx, width, height, player) {
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
        this.bomb = [];
        
}
start = () => {
    this.interval = setInterval(this.updateGameArea, 10);
    this.isRunning = true;
}

reset = () => {
    this.player.x = 0;
    this.player.y = 110;
    this.frames = 0;
    this.obstacles = [];
    this.start();
}

clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
}

stop() {
    clearInterval(this.interval);
    this.isRunning = false;
}

// damage obstacle 
createObstacles() {
    if(this.frames % 30 === 0) {
        let width = Math.floor(Math.random() * this.width);
        this.badObstacles.push(new Component(40, 40 , "red", width, 10, this.ctx))
    }
    if(this.frames % 250 === 0) {
        let width = Math.floor(Math.random() * this.width);
        this.goodObstacles.push(new Component(40, 40, "yellow", width, 10, this.ctx))
    }
    if(this.frames % 300 === 0) {
        let width = Math.floor(Math.random() * this.width);
        this.bigObstacles.push(new Component(40, 40, "orange", width, 10, this.ctx))
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
            return true
        }
    })
    const goodCrash = this.goodObstacles.some((obstacle) => {
        if(this.player.crashWith(obstacle)){
            this.goodObstacles.splice(this.goodObstacles.indexOf(obstacle), 1)
            return true
        }
    })
    const bigCrash = this.bigObstacles.some((obstacle) => {
        if(this.player.crashWith(obstacle)){
            this.bigObstacles.splice(this.bigObstacles.indexOf(obstacle), 1)
            return true
        }
    })
    /*counter(){
        let counting = Math.floor(this.frames / 90);
    } */
    if(badCrash) this.life--
    if(goodCrash) this.life++
    if(bigCrash){
        this.player.width = 70
        this.player.height = 70
        this.player.y = 480;
    } /*else if(counter === 10){
        this.player.width = 35
        this.player.height = 35
    } */
}

/*checkGameOver(){
    if(this.life === 0)
        this.stop();
}*/
    
drawLife(){
    this.ctx.font = '24px serif'
    this.ctx.fillStyle = 'black'
    this.ctx.fillText(`Life: ${this.life}`, 1050, 40)
}
drawScore(){
    let points = Math.floor(this.frames / 90);
    this.ctx.font = '24px serif'
    this.ctx.fillStyle = 'black'
    this.ctx.fillText(`Score: ${points}`, 1140, 40)

}
  
bullet(){
    this.bomb.push(new this.bomb());

}

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
    this.bullet()
    //this.createObstacle()
/*     this.getRandom.updateBadObstacles();
    this.getRandom.updateGoodObstacles();
    this.getRandom.updateBigObstacles(); */

    
   /*  this.fallRandom(); */
/* this.myGameArea.start();
    this.myGameArea.clear(); */
 /*    this.player.update(); */
};

};
