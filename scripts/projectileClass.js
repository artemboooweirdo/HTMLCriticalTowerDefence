export default class Projectile {
    constructor(template, tower, targetEnemy) {
        this.xPos = tower.xPos;
        this.yPos = tower.yPos;
        this.targetEnemy = targetEnemy;
        this.targetX = targetEnemy.xPos;
        this.targetY = targetEnemy.yPos;
        this.distance = Math.hypot(this.targetX - this.xPos, this.targetY - this.yPos);
        this.speed = template.speed;
        this.type = template.type;
        this.rotation = Math.atan2(this.targetY - this.yPos, this.targetX - this.xPos);

        if (this.type === "rect") {
            this.width = template.size.width;
            this.height = template.size.height;
        } else if (this.type === "circle") {
            this.radius = template.radius;
        }

        this.removal = false;
    }
    update(deltaTime) {
        this.xPos += Math.cos(this.rotation) * this.speed * deltaTime;
        this.yPos += Math.sin(this.rotation) * this.speed * deltaTime;
    }
}