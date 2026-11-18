// This is the blaster tower
// It uses shatter
// Pretty coolio idk why this is in the game rn

export default class Blaster {
    constructor(xPos, yPos, appliedPerks) {
        // Basic Stats (Every tower has these)

        // Position Tracking
        this.xPos = xPos;
        this.yPos = yPos;
        this.rotation = 0;
        // Size so that towers cannot be placed too close to each other
        this.placementSize = 1 * 30;
        // Attack CD
        this.cooldown = 0;
        // Base Stats
        this.damage = 3;
        this.atkSpd = 0.45;
        this.range = 16;
        // Current Level
        this.level = 0;

        this.name = "Blaster";
        this.targeting = "first";
        this.type = "energy";

        // Buffs on self
        this.atkSpdBuff = 0;
        this.damageBuff = 0;
        this.rangeBuff = 0;

        // Applied Perks (buffs from perks)
        this.appliedPerks = appliedPerks || [];
        if (this.appliedPerks.includes("crimsonCatseyeRipoff")) {
            this.rangeBuff += 30;
        }

        // Unique stats (like abilities, etc)

        this.coreBlastAbility = false;
    }

    // Methods that I need for the tower to function
    
    draw(ctx, zoom, offsetX, offsetY) {
        ctx.save();
        ctx.translate(this.xPos * zoom + offsetX, this.yPos * zoom + offsetY);
        ctx.rotate(this.rotation);
        ctx.fillStyle = "blue";

        // set size for now because i dont have a sprite
        ctx.fillRect(this.xPos + offsetX, this.yPos + offsetY, 10, 10);
        ctx.restore();
    }

    isInRange(enemy) {
        return (
            Math.sqrt(
                (enemy.xPos - this.xPos) ** 2 + (enemy.yPos - this.yPos) ** 2,
            ) <=
            this.range + (this.range * this.rangeBuff) / 100
        );
    }

    levelUp() {
        if (this.level < 5) {
            this.level++;
            switch (this.level) {
                case 1:
                    this.range = 19;
                    this.atkSpd = 0.45;
                    this.damage = 3;
                    break;
                case 2:
                    this.range = 19;
                    this.atkSpd = 0.3;
                    this.damage = 3;
                    break;
                case 3:
                    this.range = 19;
                    this.atkSpd = 0.35;
                    this.damage = 5;
                    this.coreBlastAbility = true;
                    break;
                case 4:
                    this.range = 20;
                    this.atkSpd = 0.2;
                    this.damage = 8;
                    break;
                case 5:
                    this.range = 25;
                    this.atkSpd = 0.2;
                    this.damage = 18;
                    break;
                default:
                    break;
            }
        }
    }

    // Attack handler
    // Attack with the aoe attack if permits otherwise,
    // Attack using the basic attack cause y not yk
    attack(enemy, deltaTime) {
        if (this.cooldown > 0) {
            this.cooldown -= deltaTime;
            return enemy.health;
        } else {
            turnToFace(enemy);
            if (enemy.shatter >= 15 && this.coreBlastAbility) {
                return this.coreBlastAttack(enemy);
            } else {
                return this.basicAttack(enemy);
            }
        }
    }

    // Methods that are unique to the tower

    coreBlastAttack(enemy) {
            this.cooldown = (this.atkSpd * 1000) / (1 + this.atkSpdBuff / 100) * 3;
            enemy.shatter -= 15;
            return enemy.health - Math.pow(5 * this.damage, 1.3);
    }

    basicAttack(enemy) {
        this.cooldown = (this.atkSpd * 1000) / (1 + this.atkSpdBuff / 100);
        return enemy.health - (this.damage + (this.damage * this.damageBuff) / 100);
    }

    turnToFace(enemy) {
        const dx = enemy.xPos - this.xPos;
        const dy = enemy.yPos - this.yPos;
        this.rotation = Math.atan2(dy, dx);
    }

}
