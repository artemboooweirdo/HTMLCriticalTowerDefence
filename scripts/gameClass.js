'use strict';

export default class Game {
  constructor(canvas, map) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.map = map;
    this.round = null;
    this.timeleft = null;
    this.enemies = [];
    this.towers = [];
    this.baseHp = 100;
    this.hpBar = document.getElementById
    this.round = null;
    this.state = "ready";
  }
  update(deltatime) {
    
  }
  draw() {
    this.enemies.forEach((enemy, i) => {
      this.ctx.fillStyle = enemy[i].type;
      this.ctx.fillRect(
        enemy[i].xPos - 20,
        enemy[i].yPos - 20,
        40,
        40,
      );
      this.ctx.font = "15px UIFont";
      this.ctx.lineWidth = 1;
      this.ctx.strokeText(
      currentEnemies[i].health,
      currentEnemies[i].xPos - 10,
      currentEnemies[i].yPos - 10,
      );
      this.ctx.fillStyle = "#0000ff";
      this.ctx.fillText(
      currentEnemies[i].health,
      currentEnemies[i].xPos - 10,
      currentEnemies[i].yPos - 10,
      );
    });


    
    // Draw HP Bar
    this.ctx.fillStyle = "#00ff00"
    this.ctx.strokeStyle = "#000000";
    this.ctx.fillRect(0,0, this.baseHp, 20);

    // Draw HP Left
    this.ctx.font = "40px UIFont";
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "top";
    this.ctx.fillStyle = "#000000";
    this.ctx.fillText(baseHp, 0, 0);
  }
}
