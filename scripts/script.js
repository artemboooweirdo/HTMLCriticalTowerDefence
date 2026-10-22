const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const map1 = {
  start: {
    x: 200,
    y: 200,
  },
  pathCoords: [
    {
      x: 300,
      y: 200,
    },
    {
      x: 300,
      y: 300,
    },
    {
      x: 200,
      y: 300,
    },
    {
      x: 200,
      y: 400,
    },
    {
      x: 300,
      y: 400,
    },
  ],
  finish: {
    x: 400,
    y: 500,
  },
};
let targetIndex = 0;
let targetLocation = map1.pathCoords[targetIndex];
const queuedEnemies = [];
const currentEnemies = [];
let lastTime = 0;
let baseHp = 100;

class Enemy {
  constructor(map, round, sendTime, xPos, yPos, health, speed, type) {
    this.map = map;
    this.round = round;
    this.sendTime = sendTime;
    this.xPos = xPos;
    this.yPos = yPos;
    this.health = health;
    this.speed = speed;
    this.type = type;
  }
  damage(damage) {
    this.health -= damage;
  }
  freeze(length) {
    // This can freeze the enemy for a short period of time
    const oldSpeed = this.speed;
    this.speed = 0;
    setTimeout(() => {
      this.speed = oldSpeed;
    }, length);
  }
}

function queueEnemy(map, speed, type, round, sendTime, id) {
  queuedEnemies.push({
    finish: map.finish,
    xPos: map.start.x,
    yPos: map.start.y,
    speed: speed,
    color: type,
    targetIndex: 0,
    targetLocation: map.pathCoords[targetIndex],
    sendTime: sendTime,
    round: round,
    id: id,
  });
}

// This queues the enemies that appear in the normal diff
function queueNormalEnemies() {
  queueEnemy(map1, 1.0, "#000000", 1, 0, 1);
  queueEnemy(map1, 1.1, "#111111", 1, 0, 1);
  queueEnemy(map1, 1.2, "#222222", 1, 0, 1);
  queueEnemy(map1, 1.3, "#333333", 1, 0, 2);
  queueEnemy(map1, 1.4, "#444444", 1, 0, 1);
  queueEnemy(map1, 1.5, "#555555", 1, 0, 1);
  queueEnemy(map1, 1.6, "#666666", 1, 0, 3);
  queueEnemy(map1, 1.7, "#777777", 1, 0, 3);
  queueEnemy(map1, 1.8, "#888888", 1, 0, 3);
  queueEnemy(map1, 1.9, "#999999", 1, 0, 4);
  queueEnemy(map1, 2.0, "#aaaaaa", 1, 0, 4);
  queueEnemy(map1, 2.1, "#bbbbbb", 1, 0, 5);
  queueEnemy(map1, 2.2, "#cccccc", 1, 0, 5);
  queueEnemy(map1, 2.3, "#dddddd", 1, 0, 5);
  queueEnemy(map1, 2.4, "#eeeeee", 1, 0, 5);
  queueEnemy(map1, 2.5, "#000000", 1, 0, 5);
  queueEnemy(map1, 5, "#FF0000", 1, 0, 1);
}

// Works
function calcMovement(xPos, yPos, xTarget, yTarget, speed) {
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
  const deltaX = speed * unitVectorX;
  const deltaY = speed * unitVectorY;

  //the variables to return
  let newX = deltaX + xPos;
  let newY = deltaY + yPos;

  //check for overshoots
  // if (the new x overshoots target) set the newX to the target MAY CAUSE BUGS IDK
  // ADD EXCESS MOVEMENT TO NEXT MOVEMENT IN THE NEW DIRECTION
  if (
    (newX > xTarget && xPos < xTarget) ||
    (newX < xTarget && xPos > xTarget)
  ) {
    newX = xTarget;
    console.log("overshoot on x axis");
  }
  if (
    (newY > yTarget && yPos < yTarget) ||
    (newY < yTarget && yPos > yTarget)
  ) {
    newY = yTarget;
    console.log("overshoot on y axis");
  }

  return {
    x: newX,
    y: newY,
  };
}
// Exapmle input is queuedEnemies[0]
function checkTarget(enemy) {
  if (
    enemy.xPos == enemy.targetLocation.x &&
    enemy.yPos == enemy.targetLocation.y
  ) {
    if (enemy.targetIndex == map1.pathCoords.length - 1) {
      enemy.targetLocation = map1.finish;
    } else {
      enemy.targetIndex++;
      enemy.targetLocation = map1.pathCoords[enemy.targetIndex];
    }
  }
}
// same here
function spawnEnemy(enemy) {
  currentEnemies.push(enemy);
}

queueNormalEnemies();

queuedEnemies.forEach((element) => {
  spawnEnemy(element);
});

// Main Game Loop
function gameLoop(timestamp) {
  // calculate deltaTime (time between frames)
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  // 1. Clear the canvas from previous frame #IMPORTANT
  // can improve this
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 2. Update positions/logic here # VERY IMPORTANT (e.g., enemy movement, tower targeting)
  // 3. Render graphics here  Example: Draw a simple grid block to represent a tile/tower spot

  if (!(currentEnemies == [])) {
    currentEnemies.forEach((enemy, index) => {
      checkTarget(enemy);
      const nextPos = calcMovement(
        enemy.xPos,
        enemy.yPos,
        enemy.targetLocation.x,
        enemy.targetLocation.y,
        enemy.speed,
      );
      enemy.xPos = nextPos.x;
      enemy.yPos = nextPos.y;

      ctx.fillStyle = enemy.color;
      ctx.fillRect(enemy.xPos - 20, enemy.yPos - 20, 40, 40);
      if (enemy.yPos == enemy.finish.y && enemy.xPos == enemy.finish.x) {
        currentEnemies.splice(index);
      }
    });
  }

  // Request next frame (approx. 60 FPS)
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

// DEBUG

setTimeout(() => {
  console.log("test for code continuity");
  console.log(calcMovement(100, 100, 200, 200, 2));
  console.log(Number.isNaN(5 / 0));
  console.log([1, 2, 3].length);
}, 100);
