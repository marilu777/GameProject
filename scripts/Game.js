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
}
start() {
    this.interval = setInterval(this.updateGameArea, 20);
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

updateObstacles() {
    
    for (let i = 0; i < this.obstacles.length; i++) {
        this.obstacles[i].draw();
        this.obstacles[i].y += 1;
}
}

createObstacle() {
    if(this.frames % 60 === 0) {
        let width = Math.floor(Math.random() * this.width);
        this.obstacles.push(new Component(500,100 , "red", width, 10, this.ctx))
    }
}
/* fallRandom(minWidth, maxWidth){
    
}; */
    

   
updateGameArea = () => {
    this.clear();
    this.player.draw();
    this.player.newPosition();
    this.createObstacle()
    /* this.myGameArea.start();
    this.myGameArea.clear(); */
 /*    this.player.update(); */
    this.updateObstacles();
   /*  this.fallRandom(); */

};

};
