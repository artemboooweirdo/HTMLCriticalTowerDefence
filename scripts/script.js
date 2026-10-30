"use strict";

// Imports for cleaner code :D
import Enemy from "./enemyClass.js"; //Imports the enemy class
import templates from "./enemyTemplates.js";
import maps from "./mapTemplates.js";
import enemyLayouts from "./enemyLayouts.js";
import waveTimer from "./waveTimerClass.js";

// Load the UI font. It is called UIFont
async function loadCustomFont() {
  try {
    // 1. Define the FontFace with a name and the relative path to your asset
    const UIFont = new FontFace("UIFont", "url(./assets/ui-font.ttf)");

    // 2. Wait for the font file to download and parse
    const loadedFont = await UIFont.load();

    // 3. Add the loaded font to the document's FontFaceSet
    document.fonts.add(loadedFont);

    // 4. (Optional) Apply it immediately to the body or specific element

    console.log("Font loaded successfully!");
  } catch (error) {
    console.error("Failed to load font:", error);
  }
}
// guess what this does lmao
loadCustomFont();

// spawnButton and the spawnInput dorpdown menu (I realized i misspelled dropdown)
const spawnButton = document.getElementById("spawnButton");
const spawnInput = document.getElementById("spawnInput");
const customInputs = document.getElementById("customStats");
const hpInput = document.getElementById("hpInput");
const speedInput = document.getElementById("speedInput");
const typeInput = document.getElementById("typeInput");
const startButton = document.getElementById("startButton");

//initialize the canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Rounds and other misc
let idCounter = 1;
let round = 0;
let baseHp = 100;

// The map and the coords for da movement

// Enemies that appear in the normal diff

const queuedEnemies = [];
let roundEnemies = [];
const currentEnemies = [];

// Gives each enemy a unique ID and puts them into the queued enemies for the "game"
function queueEnemy(enemy) {
  enemy.id = idCounter++;
  queuedEnemies.push(enemy);
}

// This queues the enemies that appear in the normal diff REWORK
function queueNormalEnemies() {
  enemyLayouts.normalEnemies.forEach((enemy) => {
    queueEnemy(enemy);
  });
}

function queueEnemiesForRound(number) {
  roundEnemies = queuedEnemies.filter((enemy) => enemy.round === number);
  enemyLayouts.roundTime[number].start();
  round = number;
}

// Function to put an enemy into current enemies WORKS
function spawnEnemy(enemy) {
  currentEnemies.unshift(enemy);
  console.log(`Enemy with ID ${enemy.id} spawned`);
}

queueNormalEnemies();

//queue all enemies REWORK
function loadEnemies() {
  roundEnemies.forEach((enemy) => {
    setTimeout(() => {
      spawnEnemy(enemy);
    }, enemy.sendTime * 1000);
  });
}

// Main Game Loop
let lastTime = null;
function gameLoop(timestamp) {
  // calculate deltaTime (time between frames)
  if (lastTime === null) {
    lastTime = timestamp;
  }
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  //Checks if the wave timer exists
  const timer = enemyLayouts.roundTime[round];

  if (!timer) {
    console.log("All waves complete");
    return;
  }
  timer.update();

  if (timer.getTime() <= 0) {
    round++;

    if (round < enemyLayouts.roundTime.length) {
      queueEnemiesForRound(round);
      loadEnemies();
    } else {
      console.log("All waves complete");
    }
  }

  // 1. Clear the canvas from previous frame #IMPORTANT
  // can improve this probably
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // DRAW PATH
  ctx.beginPath();
  ctx.moveTo(maps.map1.start.x, maps.map1.start.y);
  for (let i = 0; i < maps.map1.pathCoords.length; i++) {
    ctx.lineTo(maps.map1.pathCoords[i].x, maps.map1.pathCoords[i].y);
  }
  ctx.lineTo(maps.map1.finish.x, maps.map1.finish.y);
  ctx.stroke();
  //DRAW PATH

  // draw enemies

  // Handles death of enemies
  for (let i = currentEnemies.length - 1; i >= 0; i--) {
    if (i < 0) {
      break;
    }
    if (currentEnemies[i].health <= 0) {
      currentEnemies.splice(i, 1);
      console.log(`Enemy at index ${i} died`);
    }
  }

  for (let i = currentEnemies.length - 1; i >= 0; i--) {
    if (i < 0) {
      throw new Error("No enemies");
    }
    // Calculates the movement of the enemies
    currentEnemies[i].calcMovement(deltaTime);
    currentEnemies[i].checkTarget();

    // enemy reaches base
    if (
      currentEnemies[i].yPos == currentEnemies[i].finish.y &&
      currentEnemies[i].xPos == currentEnemies[i].finish.x
    ) {
      console.log(currentEnemies[i]);
      baseHp -= currentEnemies[i].health;
      console.log(
        `deleted enemy at ${i} it had ${currentEnemies[i].health} hp`,
      );
      console.log(`you now have ${baseHp} hp left`);
      currentEnemies.splice(i, 1);
    }
  }

  // Actually draws the enemies
  for (let i = 0; i < currentEnemies.length; i++) {
    ctx.fillStyle = currentEnemies[i].type;
    ctx.fillRect(
      currentEnemies[i].xPos - 20,
      currentEnemies[i].yPos - 20,
      40,
      40,
    );
    ctx.font = "15px UIFont";
    ctx.lineWidth = 1;
    ctx.strokeText(
      currentEnemies[i].health,
      currentEnemies[i].xPos - 10,
      currentEnemies[i].yPos - 10,
    );
    ctx.fillStyle = "#0000ff";
    ctx.fillText(
      currentEnemies[i].health,
      currentEnemies[i].xPos - 10,
      currentEnemies[i].yPos - 10,
    );
  }


  // draw time left
  ctx.font = "14px UIFont";
  ctx.fillStyle = "#000000"
  ctx.fillText(`Time left: ${enemyLayouts.roundTime[round].getTime().toFixed(0)}`, 300, 0);

  // draw text
  ctx.font = "56px UIFont";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#000000";
  ctx.fillText(baseHp, 0, 0);

  // draw towers??

  //DRAW

  // Request next frame (approx. 60 FPS)
  requestAnimationFrame(gameLoop);
}

// Other stuff such as event listeners and such

requestAnimationFrame(gameLoop);

// Spawn button FULLY WORKS
spawnButton.addEventListener("click", () => {
  const selectedEnemy = spawnInput.value;
  console.log(`Spawning ${selectedEnemy}`);
  if (selectedEnemy == "custom") {
    if (speedInput.value == 0) {
      throw new Error("Enemy cant have a speed of 0!");
    }
    const newEnemy = new Enemy(
      { health: hpInput.value, speed: speedInput.value, type: typeInput.value },
      maps.map1,
      [1, 0],
    );
    currentEnemies.unshift(newEnemy);
  } else if (templates[selectedEnemy]) {
    const newEnemy = new Enemy(templates[selectedEnemy], maps.map1, [1, 0]);
    spawnEnemy(newEnemy);
  } else {
    console.log(`Invalid enemy type: ${selectedEnemy}`);
  }
});

startButton.addEventListener("click", () => {
  queueEnemiesForRound(1);
  loadEnemies();
  startButton.style.visibility = "hidden";
});

// Checks if the dropdown menu is on custom FULLY WORKS
spawnInput.addEventListener("change", () => {
  if (spawnInput.value == "custom") {
    customInputs.style.visibility = "visible";
  } else {
    customInputs.style.visibility = "hidden";
  }
});

// FULLY WORKS (returns the x and y based on the canvas)
canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  // 2. Calculate the mouse position relative to the canvas element (in CSS pixels)
  const cssX = event.offsetX - rect.left;
  const cssY = event.offsetY - rect.top;
  // 3. Scale the CSS coordinates to match the internal canvas resolution
  const canvasX = Math.round((cssX / rect.width) * canvas.width);
  const canvasY = Math.round((cssY / rect.height) * canvas.height);
});
