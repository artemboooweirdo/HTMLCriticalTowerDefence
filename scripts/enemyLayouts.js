import Enemy from "./enemyClass.js"; // Imports the enemy class
import templates from "./enemyTemplates.js"; // Imports enemy templates
import maps from "./mapTemplates.js"; // Imports map templates

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





  ],
};
export default enemyLayouts;
