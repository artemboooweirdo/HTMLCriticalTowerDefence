"use strict";

// Imports for cleaner code :D
import Enemy from "./enemyClass.js"; //Imports the enemy class
import templates from "./enemyTemplates.js";
import maps from "./mapTemplates.js";
import enemyLayouts from "./enemyLayouts.js";
import Tower from "./towerClass.js";
import towerTemplates from "./towerTemplates.js"
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
const playButton = document.getElementById("playButton");
const towersButton = document.getElementById("towersButton");
const perksButton = document.getElementById("perksButton");

const backButton = document.getElementById("backButton");

const settingsButton = document.getElementById("settingsButton");
const menuContainer = document.getElementById("menuContainer");


const perksMenu = document.getElementById("perksMenu");
const towersMenu = document.getElementById("towersMenu");
const settingsMenu = document.getElementById("settingsMenu");
const gameMenu = document.getElementById("gameMenu");
const towerButton = document.getElementById("placeTower");
const glowSelector = document.getElementById("glowSelector");
const grassland = document.getElementById("grasslandButton");
const spookyGrassland = document.getElementById("spookyGrasslandButton");
const mainMenu = document.getElementById("mainMenu");
const gameContainer = document.getElementById("gameContainer");
const gameCanvas = document.getElementById("gameCanvas");
const loadingScreen = document.getElementById("loadingScreen");



// Rounds and other misc
const equippedTowers = []; // Array to hold equipped towers
const equippedPerks = []; // Array to hold equipped perks
let currentGame = null;
let currentMenu = "main"; // Possible values: "main", "towers", "perks", "settings"
const canvas = document.getElementById("gameCanvas");

// Main Game Loop
function gameLoop(timestamp) {

  currentGame.update(timestamp);

  if (currentGame.baseHp <= 0) {
    currentGame.baseHp = 0;
    currentGame.draw(); // Draw the final state of the game before reloading
    window.alert("Game Over! You ran out of HP. The page will now reload.");
    location.reload();
    return; // Stop the game loop if the game is over
  }
  
  currentGame.draw();
  // Request next frame (approx. 60 FPS)
  requestAnimationFrame(gameLoop);
}

// Other stuff such as event listeners and such

// On page load, hide the loading screen after a short delay to ensure all assets are loaded
window.addEventListener("load", () => {
  loadingScreen.textContent = "Done!";
  setTimeout(() => {
    loadingScreen.style.visibility = "hidden";
    loadingScreen.setAttribute('inert', '');
  }, 500); // Adjust the delay as needed
});




// Spawn button FULLY WORKS

spookyGrassland.addEventListener("click", () => {
  // test
  //Init the bg image
  const bgImage = new Image();
  bgImage.src = "./assets/images/bg/SpookyGrassland.png";
  // test
  mainMenu.setAttribute('inert', '');
  playButton.style.visibility = "hidden";
  towerButton.style.visibility = "visible";
  menuContainer.style.visibility = "hidden";
  gameCanvas.style.visibility = "visible";
  gameContainer.style.visibility = "visible";
  bgImage.onload = () => {
  currentGame = new Game(document.getElementById("gameCanvas"), maps.map1, bgImage);
  currentGame.queueEnemies(enemyLayouts.normalEnemies);
  currentGame.spawnEnemiesForRound(0);
  currentGame.roundTimes[0].start();
  requestAnimationFrame(gameLoop);
}
});

grassland.addEventListener("click", () => {
  
  
  
  // test
  mainMenu.setAttribute('inert', '');
  //Init the bg image
  const bgImage = new Image();
  bgImage.src = "./assets/images/bg/Grassland.png";
  towerButton.style.visibility = "visible";
  playButton.style.visibility = "hidden";
  menuContainer.style.visibility = "hidden";
  gameContainer.style.visibility = "visible";
  gameCanvas.style.visibility = "visible";
  
  bgImage.onload = () => {
  currentGame = new Game(document.getElementById("gameCanvas"), maps.map1, bgImage);
  currentGame.queueEnemies(enemyLayouts.normalEnemies);
  currentGame.spawnEnemiesForRound(0);
  currentGame.roundTimes[0].start();
  requestAnimationFrame(gameLoop);
}
});
towerButton.addEventListener("click", () => {
  console.log("Tower button clicked");
  if (!currentGame) {
    console.log("Game not started. Click 'Start Game' first.");
    return;
  }
  if (currentGame.selectedTower) {
    currentGame.placingTowerCancel();
    console.log("Tower placement canceled");
  } else {
    currentGame.placingTowerStart(new Tower(towerTemplates.blaster));
    console.log("Tower placement started");
  }
});

// FULLY WORKS (returns the x and y based on the canvas)
canvas.addEventListener("mousemove", (e) => {
  if (!currentGame) {
    console.log("Game not started. Click 'Start Game' first.");
    return;
  }
  const rect = canvas.getBoundingClientRect();
  // 2. Calculate the mouse position relative to the canvas element (in CSS pixels)
  const cssX = e.clientX - rect.left;
  const cssY = e.clientY - rect.top;
  // 3. Scale the CSS coordinates to match the internal canvas resolution
  currentGame.cursorPos.x = Math.round((cssX / rect.width) * canvas.width) / currentGame.zoom;
  currentGame.cursorPos.y = Math.round((cssY / rect.height) * canvas.height) / currentGame.zoom;
});

canvas.addEventListener("click", (e) => {
  if (!currentGame) {
    console.log("Game not started. Click 'Start Game' first.");
    return;
  }
  currentGame.placingTowerEnd();
});

document.addEventListener("keydown" , (e) => {
  if (!currentGame) return;
  if (e.key == "w") currentGame.dyOffset = 1;
  if (e.key == "s") currentGame.dyOffset = -1;
  if (e.key == "a") currentGame.dxOffset = 1;
  if (e.key == "d") currentGame.dxOffset = -1;
  if (e.key == "-") {
    if (currentGame.zoom > 0.5) {
      currentGame.zoom =  Math.round((currentGame.zoom - 0.1) * 10) / 10; // Round to one decimal place
    } else {
      currentGame.zoom = 0.5;
    }
    currentGame.alert = `Zoom: ${currentGame.zoom}x`;
    currentGame.alertAlpha = 1;
  };
  if (e.key == "=") {
    if (currentGame.zoom < 2) {
      currentGame.zoom =  Math.round((currentGame.zoom + 0.1) * 10) / 10; // Round to one decimal place
    } else {
      currentGame.zoom = 2;
    }
    currentGame.alert = `Zoom: ${currentGame.zoom}x`;
    currentGame.alertAlpha = 1;
  };
  console.log(e.key);
})

document.addEventListener("keyup", (e) => {
  if (e.key == "w") currentGame.dyOffset = 0;
  if (e.key == "s") currentGame.dyOffset = 0;
  if (e.key == "a") currentGame.dxOffset = 0;
  if (e.key == "d") currentGame.dxOffset = 0;
  if (e.key == "Escape") currentGame.placingTowerCancel();
})
glowSelector.addEventListener("change", (e) => {
  if (!currentGame) {
    window.alert("Game not started. Click 'Start Game' first.");
    return;
  } else {
    currentGame.glow = e.target.value;
}});

// Event listeners for menu stuffs

towersButton.addEventListener("click", () => {
  currentMenu = "towers";
  mainMenu.style.visibility = "hidden";
  mainMenu.setAttribute('inert', '');
  towersMenu.style.visibility = "visible";
  backButton.style.visibility = "visible";
  backButton.removeAttribute('inert');
});

perksButton.addEventListener("click", () => {
  currentMenu = "perks";
  mainMenu.style.visibility = "hidden";
  mainMenu.setAttribute('inert', '');
  perksMenu.style.visibility = "visible";
  backButton.style.visibility = "visible";
  backButton.removeAttribute('inert');
});

settingsButton.addEventListener("click", () => {
  currentMenu = "settings";
  mainMenu.style.visibility = "hidden";
  mainMenu.setAttribute('inert', '');
  settingsMenu.style.visibility = "visible";
  backButton.style.visibility = "visible";
  backButton.removeAttribute('inert');
});
playButton.addEventListener("click", () => {
  currentMenu = "game";
  mainMenu.style.visibility = "hidden";
  gameMenu.removeAttribute('inert');
  gameMenu.style.visibility = "visible";
  backButton.style.visibility = "visible";
  backButton.removeAttribute('inert');
});

backButton.addEventListener("click", () => {
  currentMenu = "main";
  mainMenu.removeAttribute('inert');
  mainMenu.style.visibility = "visible";
  towersMenu.style.visibility = "hidden";
  perksMenu.style.visibility = "hidden";
  settingsMenu.style.visibility = "hidden";
  gameMenu.style.visibility = "hidden";
  backButton.style.visibility = "hidden";
  backButton.setAttribute('inert', '');
});