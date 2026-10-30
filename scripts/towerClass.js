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
        this.atkSpdBuff = 0;
        this.damageBuff = 0;
        this.rangeBuff = 0;
    }
    attack(enemy) {
        if (this.cooldown > 0) {
            return enemy.health;
        } else {
            return enemy.health - (this.damage * this.damageBuff); 
        }
    }
}