export default class GameRenderer {
    constructor(canvas, bgImg) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.bgImg = bgImg;
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawBackground() {
        this.ctx.drawImage(this.bgImg, 0, 0, this.canvas.width, this.canvas.height);
    }

    drawRestrictedAreas(restrictedAreas, zoom, offsetX, offsetY) {
        restrictedAreas.forEach((area) => {
            this.ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
            this.ctx.fillRect(
                area.x * zoom + offsetX,
                area.y * zoom + offsetY,
                area.width * zoom,
                area.height * zoom
            );
        });
    }

    drawTowers(towers, zoom, offsetX, offsetY) {
        towers.forEach((tower) => {
            tower.draw(this.ctx, zoom, offsetX + tower.xPos, offsetY + tower.yPos);
        });
    }
    drawEnemies(enemies, zoom, offsetX, offsetY) {
        enemies.forEach((enemy) => {
            enemy.draw(this.ctx, zoom, offsetX + enemy.xPos, offsetY + enemy.yPos);
        });
    }
    drawProjectiles(projectiles, zoom, offsetX, offsetY) {
        projectiles.forEach((projectile) => {
            projectile.draw(this.ctx, zoom, offsetX + projectile.xPos, offsetY + projectile.yPos);
        });
    }
    render(currentGame) {
        this.clear();
        this.drawBackground();
        this.drawTowers(currentGame.towers, currentGame.zoom, currentGame.offsetX, currentGame.offsetY);
        this.drawEnemies(currentGame.enemies, currentGame.zoom, currentGame.offsetX, currentGame.offsetY);
        this.drawProjectiles(currentGame.projectiles, currentGame.zoom, currentGame.offsetX, currentGame.offsetY);
    }
}