export default class Projectile {
    constructor(template, tower, targetEnemy) {
        this.xPos = tower.xPos;
        this.yPos = tower.yPos;
        this.targetEnemy = targetEnemy;
        this.targetX = targetEnemy.xPos;
        this.targetY = targetEnemy.yPos;
        this.distanceLeft = Math.hypot(this.targetX - this.xPos, this.targetY - this.yPos);
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
        if (this.distanceLeft <= 0) {
            this.removal = true;
            return;
        }
        const dy = Math.sin(this.rotation) * this.speed * deltaTime
        const dx = Math.cos(this.rotation) * this.speed * deltaTime
        const distanceMoved = Math.hypot(dx, dy);
        this.distanceLeft -= distanceMoved;
        this.xPos += dx
        this.yPos += dy
    }
}