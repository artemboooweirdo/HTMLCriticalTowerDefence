'use strict';

const bgImage = new Image();
bgImage.src = "./assets/images/Grassland.png";



// IMPLEMENT THIS
export default class Game {
  constructor(canvas, map, backgroundImage) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.map = map;
    this.round = 0;
    this.timeleft = 0;
    this.queuedEnemies = [];
    this.roundTimes = [];
    this.currentEnemies = [];
    this.towers = [];
    this.baseHp = 100;
    this.state = "ready";
    this.lastTime = null;
    this.deltaTime = null;
    this.bgImage = backgroundImage;
    
  }
  update(timestamp) {

  if (this.lastTime === null) {
    this.lastTime = timestamp;
  }
  this.deltaTime = timestamp - this.lastTime;
  this.lastTime = timestamp;


  // Timer stuff like starting new rounds
  const timer = this.roundTimes[this.round];
  if (!timer) {
    console.log("All waves complete");
    return;
  }
  timer.update();
      if (timer.getTime() <= 0) {
    this.round++;

    if (this.round < this.roundTimes.length) {
      this.spawnEnemiesForRound(this.round);
      this.roundTimes[this.round].start();
    } else {
      console.log("All waves complete");
    }
  }
  // Timer stuff


    // Handles death of enemies
  for (let i = this.currentEnemies.length - 1; i >= 0; i--) {
    if (i < 0) {
      console.log("No enemies");
      break;
    }
    if (this.currentEnemies[i].health <= 0) {
      this.currentEnemies.splice(i, 1);
      console.log(`Enemy at index ${i} died`);
    }
  }
  // When the enemy reaches the base
  for (let i = this.currentEnemies.length - 1; i >= 0; i--) {
    if (i < 0) {
      console.log("No enemies");
      throw new Error("No enemies");
    }
    // Calculates the movement of the enemies
    this.currentEnemies[i].calcMovement(this.deltaTime);
    this.currentEnemies[i].checkTarget();

    // enemy reaches base
    if (
      this.currentEnemies[i].yPos == this.currentEnemies[i].finish.y &&
      this.currentEnemies[i].xPos == this.currentEnemies[i].finish.x
    ) {
      console.log(this.currentEnemies[i]);
      this.baseHp -= this.currentEnemies[i].health;
      console.log(
        `deleted enemy at ${i} it had ${this.currentEnemies[i].health} hp`,
      );
      console.log(`you now have ${this.baseHp} hp left`);
      this.currentEnemies.splice(i, 1);
    }
  }



  }
  draw() {


      // 1. Clear the canvas from previous frame #IMPORTANT
    // can improve this probably
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Draw the map background image
    this.ctx.drawImage(this.bgImage, 0, 0, this.canvas.width, this.canvas.height);
    // Draws each enemy and their hp
    this.currentEnemies.forEach((enemy) => {
      this.ctx.fillStyle = enemy.type;
      this.ctx.fillRect(
        enemy.xPos - 20,
        enemy.yPos - 20,
        40,
        40,
      );
      this.ctx.font = "15px UIFont";
      this.ctx.lineWidth = 1;
      this.ctx.strokeText(
      enemy.health,
      enemy.xPos - 10,
      enemy.yPos - 10,
      );
      this.ctx.fillStyle = "#0000ff";
      this.ctx.fillText(
      enemy.health,
      enemy.xPos - 10,
      enemy.yPos - 10,
      );
    });


    
    // Draw HP Bar
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(298, 0, 404, 40);
    this.ctx.fillStyle = "#00ff00"
    this.ctx.strokeStyle = "#000000";
    this.ctx.fillRect(300, 2, this.baseHp * 4, 36);

    // Draw HP Left
    this.ctx.font = "40px UIFont";
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "top";
    this.ctx.fillStyle = "#a007d8";
    this.ctx.fillText(this.baseHp, 300, 0);

      // draw time left
    this.ctx.font = "14px UIFont";
    this.ctx.fillStyle = "#000000"
    const timer = this.roundTimes[this.round];
    const timeLeft = timer ? timer.getTime().toFixed(0) : "You Win!";
    this.ctx.fillText(`Time left: ${timeLeft}`, 300, 40);
  }
  queueEnemies(enemies) {
    this.queuedEnemies.push(...enemies.enemies);
    this.roundTimes.push(...enemies.roundTimes);
  }
  spawnEnemiesForRound(round) {
    this.round = round;
    const roundEnemies = this.queuedEnemies.filter(enemy => enemy.round === round);
    roundEnemies.forEach((enemy) => {
      setTimeout(() => {
        this.currentEnemies.push(enemy);
      }, enemy.sendTime * 1000);
    });
  }
}
