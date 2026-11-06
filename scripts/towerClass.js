export default class Tower {
    constructor(template, xPos, yPos) {
        this.cooldown = 0;
        this.rotation = 0;
        this.xPos = xPos;
        this.yPos = yPos;
        this.damage = template.damage;
        this.atkSpd = template.atkSpd;
        this.range = template.range;
        this.type = template.type;
        this.name = template.name;
        this.atkSpdBuff = 0;
        this.damageBuff = 0;
        this.rangeBuff = 0;
        this.targeting = "first"
    }
    attack(enemy, deltaTime) {
        if (this.cooldown > 0) {
            this.cooldown -= deltaTime;
            return enemy.health;
        } else {
            // cooldown = atkspd (cd) - 1 / (1/atkspd (atk/sec) * 1 + (this.atkSpdBuff / 100) (buff in percent))
            this.cooldown = this.atkSpd - (1 / ((1 / this.atkSpd) * (1 + (this.atkSpdBuff / 100))));
            return enemy.health - (this.damage + (this.damage * this.damageBuff / 100)); 
        }
    }
    isInRange(enemy) {
        return Math.sqrt((enemy.xPos - this.xPos) ** 2 + (enemy.yPos - this.yPos) ** 2) <= (this.range + (this.range * this.rangeBuff / 100));
    }
}