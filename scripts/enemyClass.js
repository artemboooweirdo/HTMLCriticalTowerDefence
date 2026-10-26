let idCounter = 1;

export default class Enemy {
  constructor(template, map, deploy) {
    this.map = map;
    this.targetIndex = 0;
    this.targetLocation = map.pathCoords[this.targetIndex];
    this.finish = map.finish;
    this.round = deploy[0];
    this.sendTime = deploy[1];
    this.xPos = map.start.x;
    this.yPos = map.start.y;
    this.overshoot = 0;
    this.health = template.health;
    this.speed = template.speed;
    this.type = template.type;
    this.id = idCounter++;
  }
  calcMovement(deltaTime) {
    // this is the x component

    //WOKING ON THIS
    while (true) {
      let distanceRemaining = Math.hypot(
        this.targetLocation.x - this.xPos,
        this.targetLocation.y - this.yPos,
      );
      if (this.overshoot >= distanceRemaining) {
        this.targetIndex++;
        this.targetLocation = map.pathCoords[this.targetIndex];
      }
      this.overshoot -= distance
      if (this.overshoot === 0) {
        break;
      }
    }
    const xComponent = this.targetLocation.x - this.xPos;
    //this is the y component
    const yComponent = this.targetLocation.y - this.yPos;

    //length of vector math.hypotenuse
    const magnitude = Math.hypot(xComponent, yComponent);

    //unit vector components
    const unitVectorX = Number.isNaN(xComponent / magnitude)
      ? 0
      : xComponent / magnitude;
    const unitVectorY = Number.isNaN(yComponent / magnitude)
      ? 0
      : yComponent / magnitude;

    //apply speed to those vectors
    const deltaX = this.speed * unitVectorX * (deltaTime / (1000 / 60));
    const deltaY = this.speed * unitVectorY * (deltaTime / (1000 / 60));

    //the variables to return
    let newX = deltaX + this.xPos;
    let newY = deltaY + this.yPos;
  }
  damage(damage) {
    this.health -= damage;
  }
  freeze(length) {
    // This can freeze the enemy for a short period of time
    const oldSpeed = this.speed;
    this.speed = 0;
    setTimeout(() => {
      this.speed = oldSpeed;
    }, length);
  }
  slow(slow, length) {
    const oldSpeed = this.speed;
    this.speed = this.speed * slow;
    setTimeout(() => {
      this.speed = oldSpeed;
    }, length);
  }
}

// LATER
// class Boss extends Enemy {
//   super()
// }
