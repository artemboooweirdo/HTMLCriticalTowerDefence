"use strict";

//initialize the canvas
setTimeout(() => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  let round = 0;
  let idCounter = 1;
  let baseHp = 100;
  // The map and the coords for da movement
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
  // Enemy templates
  const templates = {
    dummy: {
      health: 4,
      speed: 1,
      type: "#424451",
    },
    speedy: {
      health: 3,
      speed: 2,
      type: "#024487",
    },
    slow: {
      health: 20,
      speed: 3,
      type: "#514C50",
    },
  };

  class Enemy {
    constructor(template, map, deploy) {
      this.map = map;
      this.targetIndex = 0;
      this.targetLocation = map.pathCoords[this.targetIndex];
      this.finish = map.finish;
      this.round = deploy[0];
      this.sendTime = deploy[1];
      this.xPos = map.start.x;
      this.yPos = map.start.y;
      this.health = template.health;
      this.speed = template.speed;
      this.type = template.type;
      this.id = idCounter;
      idCounter++;
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
    slow(slow, length) {
      const oldSpeed = this.speed;
      this.speed = this.speed * slow;
      setTimeout(() => {
        this.speed = oldSpeed;
      }, length);
    }
  }

  // LATER
  // class Boss extends Enemy {
  //   super()
  // }

  const normalEnemies = [
    new Enemy(templates.slow, map1, [1, 0]),
    new Enemy(templates.slow, map1, [1, 1]),
    new Enemy(templates.slow, map1, [1, 2]),
    new Enemy(templates.slow, map1, [1, 3]),
    new Enemy(templates.slow, map1, [1, 4]),
    new Enemy(templates.slow, map1, [1, 5]),
    new Enemy(templates.slow, map1, [1, 6]),
    new Enemy(templates.slow, map1, [1, 7]),
    new Enemy(templates.slow, map1, [1, 8]),
    new Enemy(templates.slow, map1, [1, 9]),
    new Enemy(templates.slow, map1, [1, 10]),
    new Enemy(templates.slow, map1, [1, 10]),
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
  // same as previous comment
  function spawnEnemy(enemy) {
    currentEnemies.unshift(enemy);
  }

  queueNormalEnemies();

  queuedEnemies.forEach((enemy) => {
    setTimeout(() => {
      spawnEnemy(enemy);
    }, enemy.sendTime * 1000);
  });

  // Main Game Loop
  function gameLoop(timestamp) {
    // calculate deltaTime (time between frames)
    let lastTime = 0;
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    // 1. Clear the canvas from previous frame #IMPORTANT
    // can improve this
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    // DRAW

    // draw enemies
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
        ctx.fillStyle = enemy.type;
        ctx.fillRect(enemy.xPos - 20, enemy.yPos - 20, 40, 40);
        if (enemy.yPos == enemy.finish.y && enemy.xPos == enemy.finish.x) {
          currentEnemies.splice(index, 1);
          baseHp -= enemy.health;
          console.log(`deleted enemy at ${index} it had ${enemy.health} hp`);
          console.log(`you now have ${baseHp} hp left`);
        }
      });
    }

    // draw text

    ctx.strokeText(baseHp, 100, 100);
    ctx.fillText(baseHp, 100, 100);

    // draw towers??

    //DRAW

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
  setInterval(() => {
    currentEnemies.forEach((enemy) => {
      enemy.health--;
    });
  }, 1000);
}, 100);
