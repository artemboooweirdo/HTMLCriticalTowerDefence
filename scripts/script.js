const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d")

let lastTime = 0;

    // Main Game Loop
    function gameLoop(timestamp) {
      // Calculate delta time (time passed between frames)
      let deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      // 1. Clear the canvas from previous frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 2. Update positions/logic here
      // (e.g., enemy movement, tower targeting)

      // 3. Render graphics here
      // Example: Draw a simple grid block to represent a tile/tower spot
      ctx.fillStyle = '#4CAF50';
      ctx.fillRect(100, 100, 40, 40);

      // Request next frame (approx. 60 FPS)
      requestAnimationFrame(gameLoop);
    }

      requestAnimationFrame(gameLoop);