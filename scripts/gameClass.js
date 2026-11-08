'use strict';

const bgImage = new Image();
bgImage.src = "./assets/images/bg/Grassland.png";

const dummySprite = new Image();
dummySprite.src = "./assets/images/sprites/dummy.png"
import Enemy from "./enemyClass.js";
import Projectile from "./projectileClass.js";

let idCounter = 0;


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

    this.selectedTower = null;
    this.towers = [];

    this.projectiles = [];

    this.baseHp = 100;

    this.lastTime = null;
    this.deltaTime = null;

    this.bgImage = backgroundImage;

    this.cursorPos = { x: 0, y: 0 };

    this.money = 0;

    this.xOffset = 0;
    this.yOffset = 0;
    this.zoom = 1;
    this.dxOffset = 0;
    this.dyOffset = 0;

    this.alert = "Welcome to the game!";
    this.alertAlpha = 1;

  }
  update(timestamp) {

  if (this.lastTime === null) {
    this.lastTime = timestamp;
  }
  this.deltaTime = timestamp - this.lastTime;
  this.lastTime = timestamp;


  // Calculate the camera offset
  this.xOffset += this.dxOffset * (1000/60);
  this.yOffset += this.dyOffset * (1000/60);

  // Update the alert
  if (this.alert) {
    this.alertAlpha -= 0.01;
    if (this.alertAlpha <= 0) {
      this.alert = null;
    }
  }

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

  //Handles Enemy Damage 

  this.towers.forEach((tower) => {
    const attackableEnemies = this.currentEnemies.filter((enemy) => tower.isInRange(enemy));
    if (attackableEnemies.length > 0) {
      let targetEnemy;
      switch (tower.targeting) {
        case "first":
          targetEnemy = attackableEnemies.reduce((first, enemy) => {
            return enemy.totalDistance > first.totalDistance ? enemy : first;
          });
          break;
        case "last":
          targetEnemy = attackableEnemies.reduce((last, enemy) => {
            return enemy.totalDistance < last.totalDistance ? enemy : last;
          });
          break;
        case "strongest":
          targetEnemy = attackableEnemies.reduce((strongest, enemy) => {
            return enemy.health > strongest.health ? enemy : strongest;
          });
          break;
        case "weakest":
          targetEnemy = attackableEnemies.reduce((weakest, enemy) => {
            return enemy.health < weakest.health ? enemy : weakest;
          });
          break;
        default:
          targetEnemy = attackableEnemies[0];
      }
      const targetEnemyHp = this.currentEnemies[this.currentEnemies.findIndex((enemy) => enemy.id === targetEnemy.id)].health;
      const newHealth = tower.attack(targetEnemy, this.deltaTime);
      if (newHealth < targetEnemyHp) {
        console.log(`Tower attacked enemy ${targetEnemy.id} for ${targetEnemyHp - newHealth} damage`);
        targetEnemy.health = newHealth;
        this.projectiles.push(new Projectile({ speed: 0.5, type: "circle", radius: 5 }, tower, targetEnemy));
      }
      
    }
  });

  this.projectiles.forEach((projectile, index) => {
    projectile.update(this.deltaTime);
    if (Math.sqrt((projectile.targetEnemy.xPos - projectile.xPos) ** 2 + (projectile.targetEnemy.yPos - projectile.yPos) ** 2) <= 5) {
      console.log(`Projectile hit enemy ${projectile.targetEnemy.id}`);
      this.projectiles.splice(index, 1);
    }
  });
      


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
  clearCanvas() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.scale(this.zoom, this.zoom);
  }
  drawBGImage() {
    this.ctx.drawImage(this.bgImage, 0 + this.xOffset, 0 + this.yOffset, this.canvas.width, this.canvas.height);
  }
  drawEnemies() { 
    this.currentEnemies.forEach((enemy) => {
      this.ctx.fillStyle = enemy.type;
      this.ctx.fillRect(
        enemy.xPos - 20  + this.xOffset,
        enemy.yPos - 20  + this.yOffset,
        40,
        40,
      );
      this.ctx.font = `${15}px UIFont`;
      this.ctx.lineWidth = 1;
      this.ctx.strokeText(
      enemy.health,
      enemy.xPos - 10  + this.xOffset,
      enemy.yPos - 10  + this.yOffset,
      );
      this.ctx.fillStyle = "#0000ff";
      this.ctx.fillText(
      enemy.health,
      enemy.xPos - 10 + this.xOffset,
      enemy.yPos - 10 + this.yOffset,
      );
    });
  }
  drawPlacedTowers() {
    this.towers.forEach((tower) => {
      this.ctx.fillStyle = "#000000";
      this.ctx.fillRect(
        tower.xPos - 10 + this.xOffset,
        tower.yPos - 10 + this.yOffset,
        20,
        20,
      );
      this.ctx.beginPath();
      this.ctx.arc(
        tower.xPos + this.xOffset,
        tower.yPos + this.yOffset,
        (tower.range + (tower.range * tower.rangeBuff / 100)),
        0,
        2 * Math.PI,
      );
      this.ctx.strokeStyle = "#000000";
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
      this.ctx.fillStyle = "rgba(11, 113, 223, 0.64)";
      this.ctx.fill();
    });
  }
  drawSelectedTower() { 
    //Draw Selected Tower
    if (this.selectedTower) {
      this.ctx.fillStyle = "#000000";
      this.ctx.fillRect(
        this.cursorPos.x - 10,
        this.cursorPos.y - 10,
        20,
        20,
      );
    }
    // And its range
    if (this.selectedTower) {
      this.ctx.beginPath();
      this.ctx.arc(
        this.cursorPos.x,
        this.cursorPos.y,
        (this.selectedTower.range + this.selectedTower.range * this.selectedTower.rangeBuff / 100),
        0,
        2 * Math.PI,
      );
      this.ctx.strokeStyle = "#000000";
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
      this.ctx.fillStyle = "rgba(11, 113, 223, 0.64)";
      this.ctx.fill();
    }
  }
  drawHpBar() { 
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(298, 0, 404, 40);
    this.ctx.fillStyle = "#00ff00"
    this.ctx.strokeStyle = "#000000";
    this.ctx.fillRect(300, 2, this.baseHp * 4, 36);
  }
  drawMiscText() {
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
  drawProjectiles() {
    this.projectiles.forEach((projectile) => {

      //Saves the current state of the canvas
      this.ctx.save();
      this.ctx.translate(projectile.xPos + this.xOffset, projectile.yPos + this.yOffset);
      this.ctx.rotate(projectile.rotation);

      if (projectile.type === "rect") {
        this.ctx.fillStyle = "#ff0000";
        this.ctx.fillRect(-projectile.width / 2, -projectile.height / 2, projectile.width / 2, projectile.height / 2);
      } else if (projectile.type === "circle") {
        this.ctx.fillStyle = "#ff0000";
        this.ctx.beginPath();
        this.ctx.arc(0, 0, projectile.radius, 0, 2 * Math.PI);
        this.ctx.fill();
      }
      this.ctx.restore();
    });
  }
  drawAlert() {
    if (this.alert) {
      this.ctx.font = "50px UIFont";
      this.ctx.fillStyle = `rgba(0, 0, 0, ${this.alertAlpha})`;
      this.ctx.fillText(this.alert, 0, 670);
    }
  }
  draw() {
    // Draw the map background image

    this.clearCanvas();

    this.drawBGImage();

    // Draws each enemy and their hp
    this.drawEnemies();

    //Draw Towers
    this.drawPlacedTowers();

    //Draw the projectiles
    this.drawProjectiles();

    // Draw the selected tower and its range
    this.drawSelectedTower();


    //Make these scaled normally

    this.ctx.scale(1 / this.zoom, 1 / this.zoom);

    // Draw HP Bar
    this.drawHpBar();

    // Draw Misc Text
    this.drawMiscText();

    // Draw Alert
    this.drawAlert();
    
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
        enemy.id = idCounter++;
        this.currentEnemies.push(enemy);
      }, enemy.sendTime * 1000);
    });
  }
  placingTowerStart(tower) {
    this.selectedTower = tower;
  }
  placingTowerCancel() {
    this.selectedTower = null;
  }
  placingTowerEnd() {
    if (this.selectedTower) {
      this.selectedTower.xPos = this.cursorPos.x - this.xOffset;
      this.selectedTower.yPos = this.cursorPos.y - this.yOffset;
      this.towers.push(this.selectedTower);
      this.selectedTower = null;
    }
  }
  alert(message) {
    this.alert = message;

  }
}
