import Enemy from "./enemyClass.js"; // Imports the enemy class
import templates from "./enemyTemplates.js"; // Imports enemy templates
import maps from "./mapTemplates.js"; // Imports map templates
import waveTimer from "./waveTimerClass.js" // Imports the wave timer class

const enemyLayouts = {
  normalEnemies: [
    new Enemy(templates.dummy, maps.map1, [1, 0]),
    new Enemy(templates.dummy, maps.map1, [1, 1]),
    new Enemy(templates.dummy, maps.map1, [1, 2]),
    new Enemy(templates.dummy, maps.map1, [1, 3]),
    new Enemy(templates.dummy, maps.map1, [2, 0]),
    new Enemy(templates.dummy, maps.map1, [2, 1]),
    new Enemy(templates.dummy, maps.map1, [2, 2]),
    new Enemy(templates.dummy, maps.map1, [2, 3]),
    new Enemy(templates.dummy, maps.map1, [2, 4]),
    new Enemy(templates.dummy, maps.map1, [2, 5]),
    new Enemy(templates.dummy, maps.map1, [2, 6]),
    new Enemy(templates.speedy, maps.map1, [3, 0]),
    new Enemy(templates.speedy, maps.map1, [3, 1]),
    new Enemy(templates.speedy, maps.map1, [3, 2]),
    new Enemy(templates.speedy, maps.map1, [3, 3]),
    new Enemy(templates.speedy, maps.map1, [3, 4]),
    new Enemy(templates.speedy, maps.map1, [3, 5]),
    new Enemy(templates.speedy, maps.map1, [3, 6]),
    new Enemy(templates.dummy, maps.map1, [4, 0]),
    new Enemy(templates.dummy, maps.map1, [4, 1]),
    new Enemy(templates.dummy, maps.map1, [4, 2]),
    new Enemy(templates.dummy, maps.map1, [4, 3]),
    new Enemy(templates.dummy, maps.map1, [4, 4]),
    new Enemy(templates.speedy, maps.map1, [4, 5]),
    new Enemy(templates.speedy, maps.map1, [4, 6]),
    new Enemy(templates.speedy, maps.map1, [4, 7]),
    new Enemy(templates.slow, maps.map1, [5, 0]),
    new Enemy(templates.slow, maps.map1, [5, 1]),
    new Enemy(templates.slow, maps.map1, [5, 2]),
    new Enemy(templates.slow, maps.map1, [5, 3]),
    new Enemy(templates.dummy, maps.map1, [6, 1]),
    new Enemy(templates.dummy, maps.map1, [6, 2]),
    new Enemy(templates.dummy, maps.map1, [6, 3]),
    new Enemy(templates.dummy, maps.map1, [6, 4]),
    new Enemy(templates.slow, maps.map1, [6, 5]),
    new Enemy(templates.slow, maps.map1, [6, 6]),
    new Enemy(templates.slow, maps.map1, [6, 7]),
    new Enemy(templates.slow, maps.map1, [6, 8]),
    new Enemy(templates.slow, maps.map1, [6, 9]),
    new Enemy(templates.dummy, maps.map1, [7, 1]),
    new Enemy(templates.dummy, maps.map1, [7, 2]),
    new Enemy(templates.dummy, maps.map1, [7, 3]),
    new Enemy(templates.dummy, maps.map1, [7, 4]),
    new Enemy(templates.dummy, maps.map1, [7, 5]),
    new Enemy(templates.dummy, maps.map1, [7, 6]),
    new Enemy(templates.dummy, maps.map1, [7, 7]),
    new Enemy(templates.speedy, maps.map1, [7, 8]),
    new Enemy(templates.speedy, maps.map1, [7, 9]),
    new Enemy(templates.speedy, maps.map1, [7, 10]),
    new Enemy(templates.speedy, maps.map1, [7, 11]),
    new Enemy(templates.speedy, maps.map1, [7, 12]),
    new Enemy(templates.speedy, maps.map1, [7, 13]),
    new Enemy(templates.speedy, maps.map1, [7, 15]),
    new Enemy(templates.speedy, maps.map1, [7, 16]),
    new Enemy(templates.speedy, maps.map1, [7, 17]),
    new Enemy(templates.rusher, maps.map1, [8, 1]),
    new Enemy(templates.rusher, maps.map1, [8, 2]),
    new Enemy(templates.rusher, maps.map1, [8, 3]),
    new Enemy(templates.rusher, maps.map1, [8, 4]),
    new Enemy(templates.rusher, maps.map1, [8, 5]),
    new Enemy(templates.rusher, maps.map1, [8, 6]),
    new Enemy(templates.dummy, maps.map1, [9, 1]),
    new Enemy(templates.dummy, maps.map1, [9, 2]),
    new Enemy(templates.dummy, maps.map1, [9, 3]),
    new Enemy(templates.dummy, maps.map1, [9, 4]),
    new Enemy(templates.slow, maps.map1, [9, 5]),
    new Enemy(templates.slow, maps.map1, [9, 6]),
    new Enemy(templates.slow, maps.map1, [9, 7]),
    new Enemy(templates.rusher, maps.map1, [9, 8]),
    new Enemy(templates.rusher, maps.map1, [9, 9]),
    new Enemy(templates.rusher, maps.map1, [9, 10]),
    new Enemy(templates.rusher, maps.map1, [9, 11]),
    new Enemy(templates.rusher, maps.map1, [9, 12]),
















  ],
  roundTime: [
    new waveTimer(10), // Wave 0
    new waveTimer(35), // Wave 1
    new waveTimer(35), //   |
    new waveTimer(35), //   |
    new waveTimer(35), //   |
    new waveTimer(35), // Wave 5
    new waveTimer(35), //   |
    new waveTimer(35), //   |
    new waveTimer(35), //   |
    new waveTimer(35), // Wave 9



  ]
};
export default enemyLayouts;
