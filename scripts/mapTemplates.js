const grasslandMap = {
  start: {
      x: 155,
      y: 0,
    },
    pathCoords: [
      {
        x: 155,
        y: 245,
      },
      {
        x: 355,
        y: 245,
      },
      {
        x: 355,
        y: 375,
      },
      {
        x: 155,
        y: 375,
      },
      {
        x: 155,
        y: 605,
      },
      {
        x: 1055,
        y: 605,
      },
      {
        x: 1055,
        y: 375,
      },
      {
        x: 855,
        y: 375,
      },
      {
        x: 855,
        y: 245,
      },
      { x: 1055, y: 245,},
    ],
    finish: {
      x: 1055,
      y: 0,
    },
  }




const maps = {
  grassland: grasslandMap,
  spookyGrassland: grasslandMap,
    
  cemeterySeasonP1: {
    start: {
      x: 400,
      y: 2110,
    },
    pathCoords: [
      {x: 680, y: 2110},
      {x: 680, y: 1800},
      {x: 1560, y: 1800},
      {x: 1560, y: 1710},
      {x: 1790, y: 1710},
      {x: 1790, y: 1230},
      {x: 1390, y: 1230},
      {x: 1390, y: 830},
      {x: 510, y: 830},
      {x: 510, y: 1080},
      {x: 280, y: 1080},
      {x: 280, y: 1240},
    ],
    finish: {
      x: 90,
      y: 1240,
    },
  }, 
  cemeterySeasonP2: {
    start: {
      x: 2270,
      y: 1770,
    },
    pathCoords: [
      {x: 2270, y: 2190},
      {x: 1560, y: 2190},
      {x: 1560, y: 1710},
      {x: 1790, y: 1710},
      {x: 1790, y: 1230},
      {x: 1390, y: 1230},
      {x: 1390, y: 830},
      {x: 510, y: 830},
      {x: 510, y: 1080},
      {x: 280, y: 1080},
      {x: 280, y: 1240},
    ],
    finish: {
      x: 90,
      y: 1240,
    },
  }

};
export default maps;