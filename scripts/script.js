const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const map1Locations = {
  start: {
    x: 200,
    y: 200,
  },
  pathKeyPoints: [
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
let targetLocation = map1Locations.pathKeyPoints[targetIndex];
const normalEnemies = [
  {
    xPos: map1Locations.start.x,
    yPos: map1Locations.start.y,
    speed: 1,
    color: "#000000",
    targetIndex: 0,
    delay: 0,
    id: 1,
  },
  {
    xPos: map1Locations.start.x,
    yPos: map1Locations.start.y,
    speed: 2,
    color: "#FFFF00",
    targetIndex: 0,
    delay: 2,
    id: 2,
  },
  {
    xPos: map1Locations.start.x,
    yPos: map1Locations.start.y,
    speed: 5,
    color: "#FF0000",
    targetIndex: 0,
    delay: 5,
    id: 3,
  },
];
const currentEnemies = [];
let lastTime = 0;

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

function checkTarget(enemy) {
  if (enemy.xPos == targetLocation.x && enemy.yPos == targetLocation.y) {
    if (targetIndex == map1Locations.pathKeyPoints.length - 1) {
      targetLocation = map1Locations.finish;
    } else {
      enemy.targetIndex++;
      targetLocation = map1Locations.pathKeyPoints[enemy.targetIndex];
    }
  }
}
function spawnEnemy(enemy) {
  currentEnemies.push(enemy);
}

// Main Game Loop
function gameLoop(timestamp) {
  // Calculate delta time (time passed between frames) #IMPORTANT
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  // 1. Clear the canvas from previous frame #IMPORTANT
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 2. Update positions/logic here # VERY IMPORTANT
  // (e.g., enemy movement, tower targeting)

  // 3. Render graphics here
  // Example: Draw a simple grid block to represent a tile/tower spot

  currentEnemies.forEach((enemy) => {
    checkTarget(enemy);
    const nextPos = calcMovement(
      enemy.xPos,
      enemy.yPos,
      targetLocation.x,
      targetLocation.y,
      enemy.speed,
    );
    enemy.xPos = nextPos.x;
    enemy.yPos = nextPos.y;

    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.xPos - 20, enemy.yPos - 20, 40, 40);
  });

  // Request next frame (approx. 60 FPS)
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

let i = 0;
setInterval(() => {
  spawnEnemy(normalEnemies[i]);
  i++;
}, 3000);

// DEBUG
setTimeout(() => {
  console.log("test for code continuity");
  console.log(calcMovement(100, 100, 200, 200, 2));
  console.log(Number.isNaN(5 / 0));
  console.log([1, 2, 3].length);
}, 100);
