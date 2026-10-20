const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d")
let lastTime = 0;
let xPosBox = 200;
let direction = 1;
// chat here i think
// use if statements for logic plezburger
//

    // Main Game Loop
function gameLoop(timestamp) {
    // Calculate delta time (time passed between frames)
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    // 1. Clear the canvas from previous frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Update positions/logic here
    // (e.g., enemy movement, tower targeting)
    if (direction == 1) {
        xPosBox++;
    } else if (direction == -1) {
        xPosBox--;
    }
    if (xPosBox <= 100) {
        direction = 1
    }
    if (xPosBox >= 400) {
        direction = -1
    }
      // 3. Render graphics here
      // Example: Draw a simple grid block to represent a tile/tower spot
      ctx.fillStyle = '#4CAF50';
      ctx.fillRect(xPosBox, 100, 40, 40);
      ctx.fillStyle = '#af4c4c';
      ctx.fillRect(100, xPosBox, 40, 40);

      // Request next frame (approx. 60 FPS)
      requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);