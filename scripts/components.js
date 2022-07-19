class Component {
    constructor(width, height, color, x, y, ctx) {
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = x;
      this.y = y;
      this.ctx = ctx;
      this.speedX = 0;
      this.speedY = 0;
      this.bomb = [];
    }

newPosition() {
    this.x += this.speedX;
}
    
draw() {
     this.ctx.fillStyle = this.color;
     this.ctx.fillRect(this.x, this.y, this.width, this.height);
}
left() {
    return this.x;
  }

right() {
    return this.x + this.width;
}

top() {
    return this.y;
  }
space(){
    return this.bomb;
}

bottom() {
    return this.y + this.height;
}



crashWith(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  }

};

