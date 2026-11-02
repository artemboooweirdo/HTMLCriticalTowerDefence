"use strict";

// Imports for cleaner code :D
import Enemy from "./enemyClass.js"; //Imports the enemy class
import templates from "./enemyTemplates.js";
import maps from "./mapTemplates.js";
import enemyLayouts from "./enemyLayouts.js";
// import Tower from "./towerClass.js";
// import waveTimer from "./waveTimerClass.js";
import Game from "./gameClass.js";
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
// const towerButton = document.getElementById("placeTower");

//Init the bg image
const bgImage = new Image();
bgImage.src = "./assets/images/Grassland.png";

// Rounds and other misc
let currentGame = null;
const canvas = document.getElementById("gameCanvas");
let canvasX = 0;
let canvasY = 0;
let placingTower = false;

// Main Game Loop
function gameLoop(timestamp) {

  currentGame.update(timestamp);

  if (currentGame.baseHp <= 0) {
    currentGame.baseHp = 0;
    currentGame.draw(); // Draw the final state of the game before reloading
    window.alert("Game Over! You ran out of HP. The page will now reload.");
    location.reload()
    return; // Stop the game loop if the game is over
  }
  currentGame.draw();
  // Request next frame (approx. 60 FPS)
  requestAnimationFrame(gameLoop);
}

// Other stuff such as event listeners and such


// Spawn button FULLY WORKS
spawnButton.addEventListener("click", () => {
  if (!currentGame) {
    console.log("Game not started. Click 'Start Game' first.");
    return;
  }
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
    currentGame.currentEnemies.unshift(newEnemy);
  } else if (templates[selectedEnemy]) {
    const newEnemy = new Enemy(templates[selectedEnemy], maps.map1, [1, 0]);
    currentGame.currentEnemies.unshift(newEnemy);
  } else {
    console.log(`Invalid enemy type: ${selectedEnemy}`);
  }
});

startButton.addEventListener("click", () => {
  // test
  
  currentGame = new Game(document.getElementById("gameCanvas"), maps.map1, bgImage);
  currentGame.queueEnemies(enemyLayouts.normalEnemies);
  currentGame.spawnEnemiesForRound(0);
  currentGame.roundTimes[0].start();


  
  // test
  startButton.style.visibility = "hidden";

  requestAnimationFrame(gameLoop);
});
// towerButton.addEventListener("click", () => {
//   console.log("Tower button clicked");
// });

// Checks if the dropdown menu is on custom FULLY WORKS
spawnInput.addEventListener("change", () => {
  if (spawnInput.value == "custom") {
    customInputs.style.visibility = "visible";
  } else {
    customInputs.style.visibility = "hidden";
  }
});

// FULLY WORKS (returns the x and y based on the canvas)
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  // 2. Calculate the mouse position relative to the canvas element (in CSS pixels)
  const cssX = e.offsetX - rect.left;
  const cssY = e.offsetY - rect.top;
  // 3. Scale the CSS coordinates to match the internal canvas resolution
  canvasX = Math.round((cssX / rect.width) * canvas.width);
  canvasY = Math.round((cssY / rect.height) * canvas.height);
});
canvas.addEventListener("click", (e) => {

  // Later work

  if (placingTower) {
    // console.log(`Placing tower at (${canvasX}, ${canvasY})`);
    // Implement tower placement logic here
    placingTower = false; // Reset after placing
  }
});
