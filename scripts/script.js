"use strict";

// Imports for cleaner code :D
import Enemy from "./enemyClass.js"; //Imports the enemy class
import templates from "./enemyTemplates.js";
import maps from "./mapTemplates.js";

// spawnButton and the spawnInput dorpdown menu (I realized i misspelled dropdown)
const spawnButton = document.getElementById("spawnButton");
const spawnInput = document.getElementById("spawnInput");
const customInputs = document.getElementById("customStats");
const hpInput = document.getElementById("hpInput");
const speedInput = document.getElementById("speedInput");
const typeInput = document.getElementById("typeInput");

//initialize the canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Rounds and other misc
let round = 0;
let idCounter = 1;
let baseHp = 100;
// The map and the coords for da movement
// Enemy templates




const normalEnemies = [
  new Enemy(templates.slow, maps.map1, [1, 0]),
  new Enemy(templates.slow, maps.map1, [1, 1]),
  new Enemy(templates.slow, maps.map1, [1, 2]),
  new Enemy(templates.slow, maps.map1, [1, 3]),
  new Enemy(templates.slow, maps.map1, [1, 4]),
  new Enemy(templates.slow, maps.map1, [1, 5]),
  new Enemy(templates.slow, maps.map1, [1, 6]),
  new Enemy(templates.slow, maps.map1, [1, 7]),
  new Enemy(templates.slow, maps.map1, [1, 8]),
  new Enemy(templates.slow, maps.map1, [1, 9]),
  new Enemy(templates.slow, maps.map1, [1, 10]),
  new Enemy(templates.slow, maps.map1, [1, 10]),
];
const queuedEnemies = [];
const currentEnemies = [];

function queueEnemy(enemy) {
  queuedEnemies.push(enemy);
}

// This queues the enemies that appear in the normal diff
function queueNormalEnemies() {
  normalEnemies.forEach((enemy) => {
    queueEnemy(enemy);
  });
}

// Works
function calcMovement(
  xPos,
  yPos,
  xTarget,
  yTarget,
  speed,
  deltaTime,
) {
  // this is the x component
  const xComponent = xTarget - xPos;

  //this is the y component
  const yComponent = yTarget - yPos;

  //length of vector math.hypotenuse
  const magnitude = Math.hypot(xComponent, yComponent);

  //unit vector components
  const unitVectorX = Number.isNaN(xComponent / magnitude)
    ? 0
    : xComponent / magnitude;
  const unitVectorY = Number.isNaN(yComponent / magnitude)
    ? 0
    : yComponent / magnitude;

  //apply speed to those vectors
  const deltaX = speed * unitVectorX * (deltaTime / (1000 / 60));
  const deltaY = speed * unitVectorY * (deltaTime / (1000 / 60));

  //the variables to return
  let newX = deltaX + xPos;
  let newY = deltaY + yPos;
  // let overshootX = 0;
  // let overshootY = 0;

  //check for overshoots
  // if (the new x overshoots target) set the newX to the target MAY CAUSE BUGS IDK
  // ADD EXCESS MOVEMENT TO NEXT MOVEMENT IN THE NEW DIRECTION
  // if (overshootX === 0 && overshootY === 0) {
    if (
      (newX > xTarget && xPos < xTarget) ||
      (newX < xTarget && xPos > xTarget)
    ) {
      newX = xTarget;
      // const overshootX = Math.abs(newX - xTarget);
      console.log("overshoot on x axis");
    }
    if (
      (newY > yTarget && yPos < yTarget) ||
      (newY < yTarget && yPos > yTarget)
    ) {
      newY = yTarget;
      // const overshootY = Math.abs(newY - yTarget);
      console.log("overshoot on y axis");
    }
  // }

  return {
    x: newX,
    y: newY,
    // overshoot: Math.hypot(overshootX, overshootY),
  };
}
// Exapmle input is queuedEnemies[0]
function checkTarget(enemy) {
  if (
    enemy.xPos == enemy.targetLocation.x &&
    enemy.yPos == enemy.targetLocation.y
  ) {
    if (enemy.targetIndex == maps.map1.pathCoords.length - 1) {
      enemy.targetLocation = maps.map1.finish;
    } else {
      enemy.targetIndex++;
      enemy.targetLocation = maps.map1.pathCoords[enemy.targetIndex];
    }
  }
}
// same as previous comment
function spawnEnemy(enemy) {
  currentEnemies.unshift(enemy);
}

queueNormalEnemies();

//queue all enemies
queuedEnemies.forEach((enemy) => {
  setTimeout(() => {
    spawnEnemy(enemy);
  }, enemy.sendTime * 1000);
});

// Main Game Loop
let lastTime = 0;
function gameLoop(timestamp) {
  // calculate deltaTime (time between frames)

  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  // 1. Clear the canvas from previous frame #IMPORTANT
  // can improve this
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  // DRAW
  ctx.beginPath();
  ctx.moveTo(maps.map1.start.x , maps.map1.start.y);
  for (let i = 0; i < maps.map1.pathCoords.length; i++) {
    ctx.lineTo(maps.map1.pathCoords[i].x, maps.map1.pathCoords[i].y);
  }
  ctx.lineTo(maps.map1.finish.x, maps.map1.finish.y);
  ctx.stroke()

  // draw enemies
  if (!(currentEnemies.length === 0)) {
    currentEnemies.forEach((enemy, index) => {
      if (enemy.health <= 0) {
        currentEnemies.splice(index, 1);
        console.log(`Enemy at index ${index} died`);
      }
    })
    currentEnemies.forEach((enemy, index) => {
      checkTarget(enemy);
      const nextPos = calcMovement(
        enemy.xPos,
        enemy.yPos,
        enemy.targetLocation.x,
        enemy.targetLocation.y,
        enemy.speed,
        deltaTime,
      );
      enemy.xPos = nextPos.x;
      enemy.yPos = nextPos.y;
      ctx.fillStyle = enemy.type;
      ctx.fillRect(enemy.xPos - 20, enemy.yPos - 20, 40, 40);
      ctx.font = "15px Impact, Charcoal, sans-serif";
      ctx.lineWidth = 1;
      ctx.strokeText(enemy.health, enemy.xPos - 10, enemy.yPos - 10);
      ctx.fillStyle = "#0000ff";
      ctx.fillText(enemy.health, enemy.xPos - 10, enemy.yPos - 10);

      // enemy reaches base
      if (enemy.yPos == enemy.finish.y && enemy.xPos == enemy.finish.x) {
        currentEnemies.splice(index, 1);
        baseHp -= enemy.health;
        console.log(`deleted enemy at ${index} it had ${enemy.health} hp`);
        console.log(`you now have ${baseHp} hp left`);
      }
    });
  }

  // draw text
  ctx.font = "bold 56px Impact, Charcoal, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 8;
  ctx.lineJoin = "round"
  ctx.fillStyle = "#aa0000";
  ctx.strokeText(baseHp, 0, 0);
  ctx.fillText(baseHp, 0, 0);

  // draw towers??

  //DRAW

  // Request next frame (approx. 60 FPS)
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

spawnButton.addEventListener("click", () => {
  const selectedEnemy = spawnInput.value;
  console.log(`Spawning ${selectedEnemy}`);
  if (selectedEnemy == "custom") {
    if (speedInput.value == 0) {
      throw new Error("Enemy cant have a speed of 0!");
    }
    const newEnemy = new Enemy({health: hpInput.value, speed: speedInput.value, type: typeInput.value,}, maps.map1, [1, 0]);
    currentEnemies.unshift(newEnemy);
  } else if (templates[selectedEnemy]) {
    //Error here WHY
    const newEnemy = new Enemy(templates[selectedEnemy], maps.map1, [1, 0]);
    spawnEnemy(newEnemy);
  } else {
    console.log(`Invalid enemy type: ${selectedEnemy}`);
  }
});

spawnInput.addEventListener("change", () => {
  if (spawnInput.value == "custom") {
    customInputs.style.visibility = "visible";
  } else {
    customInputs.style.visibility = "hidden";
  }
})


// DEBUG
setInterval(
  () => {
    currentEnemies.forEach((enemy) => {
      enemy.health--;
    });
  },
  1000,
);
