export default class Enemy {

  // Enemy template from ./enemyTemplates.js
  // Map to go along from maps in ./mapTemplates.js
  // Deploy wave and time in the form of [round, timeAfterRoundStart]

  constructor(template, map, deploy) {

    // Constructor variables (its a lot)

    // Map and set the position to the map start
    this.map = map;
    this.targetIndex = 0;
    this.targetLocationOld = map.start;
    this.targetLocation = map.pathCoords[this.targetIndex];
    this.finish = map.finish;
    this.xPos = map.start.x;
    this.yPos = map.start.y;
    
    // Overshoot in the map (genuine pain)
    this.overshoot = 0;
    this.distanceRemaining = 0;

    //Targeting variable for first and last targeting
    this.totalDistance = 0;

    // Deploy times (do later when making the actual game)
    this.round = deploy[0];
    this.sendTime = deploy[1];
    
    // Health, speed, type, and UUID for all of the enemies
    this.health = template.health;
    this.speed = template.speed;
    this.type = template.type;
    this.id = 0;

    // Effects on the enemies eg shatter and sinking
    this.shatter = 0;
    this.sinking = 0;

    // ARTS idk what this stands for
    this.energyARTS = 0;
    this.magicARTS = 0;
    this.physicalARTS = 0;

  }

  // 100 lines of code to NOT review :D
  
  calcMovement(deltaTime) {

    // OVERSHOOT DETECTION THIS SHOULD WORK
    while (true) {

      // Calculates distance remaining

      this.distanceRemaining = Math.hypot(
        this.targetLocation.x - this.xPos,
        this.targetLocation.y - this.yPos,
      );

      // Breaks loop if there isnt any overshoot
      // ALL I HAD TO DO WAS BREAK THE CODE BREHHHH
      if (this.overshoot == 0) {
        break;
      }

      // Checks if the overshoot lands in a specific segment of the map
      if (this.distanceRemaining >= this.overshoot) {

        // If the overshoot isnt large enough subtract overshoot from distance remaining and do calculations
        this.distanceRemaining -= this.overshoot;
        this.totalDistance += this.overshoot;
        // MOVE TO OVERSHOOT

        // Get old target location, if it dosent exist e.g. this.map.pathCoords[-1], then return the start
        const targetLocationOld = this.map.pathCoords[this.targetIndex - 1] ?? this.map.start;

        // Calculate the components from the old location to the target location
        const xComponent = this.targetLocation.x - targetLocationOld.x;
        const yComponent = this.targetLocation.y - targetLocationOld.y;
        // Caclulate magnitude and the unit vectors in the direction
        const magnitude = Math.hypot(xComponent, yComponent);
        const unitVectorX = Number.isNaN(xComponent / magnitude)
          ? 0
          : xComponent / magnitude;
        const unitVectorY = Number.isNaN(yComponent / magnitude)
          ? 0
          : yComponent / magnitude;
        this.xPos = this.targetLocation.x - unitVectorX * this.distanceRemaining;
        this.yPos = this.targetLocation.y - unitVectorY * this.distanceRemaining;

        this.overshoot = 0;
        break;
      } else if (this.distanceRemaining < this.overshoot) {
        this.totalDistance += this.distanceRemaining;
        this.overshoot -= this.distanceRemaining;
        this.targetIndex++;
        this.targetLocation = this.map.pathCoords[this.targetIndex] ?? this.map.finish;
      }
    }

    // this is the x component
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
    this.totalDistance += Math.hypot(deltaX, deltaY);
    let overshootX = 0;
    let overshootY = 0;
    if (
      (newX > this.targetLocation.x && this.xPos < this.targetLocation.x) ||
      (newX < this.targetLocation.x && this.xPos > this.targetLocation.x)
    ) {
      overshootX = Math.abs(newX - this.targetLocation.x);
      newX = this.targetLocation.x;
      console.log("overshoot on x axis");
    }
    if (
      (newY > this.targetLocation.y && this.yPos < this.targetLocation.y) ||
      (newY < this.targetLocation.y && this.yPos > this.targetLocation.y)
    ) {
      overshootY = Math.abs(newY - this.targetLocation.y);
      newY = this.targetLocation.y;
      console.log("overshoot on y axis");
    }

    // Basically the return statement
    this.overshoot = Math.hypot(overshootX, overshootY);
    this.xPos = newX;
    this.yPos = newY;
  }


  
  checkTarget() {
    if (this.xPos == this.targetLocation.x && this.yPos == this.targetLocation.y) {
      if (this.targetIndex >= this.map.pathCoords.length) {
        return;
      }
      if (this.targetIndex == this.map.pathCoords.length - 1) {
        this.targetLocation = this.map.finish;
        this.targetIndex = this.map.pathCoords.length;
    } else {
      this.targetIndex++;
      this.targetLocation = this.map.pathCoords[this.targetIndex];
    }
  }
  }




// 
// 
// 
// MISC METHODS THERE
//          ||
//          ||
//          \/
//
// 
// 


  damage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      console.log(`Enemy ${this.id} has died`);
    }
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
