const grasslandMap = {
    // Anount of paths on da map
    pathAmt: 1,

    // Path width to calculate the path hitbox
    // this is to stop ppl from placing towers on the path
    pathWidth: 70,
    obstacles: [
      {
        x: 520,
        y: 240,
        width: 170,
        height: 130,
      },
      {
        x: 250,
        y: 450,
        width: 100,
        height: 100,
      },
      {
        x: 880,
        y: 440,
        width: 100,
        height: 100,
      },
    ],

    pathType: "single",
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
        { x: 1055, y: 245 },
    ],
    finish: {
        x: 1055,
        y: 0,
    },
};

const maps = {
    grassland: grasslandMap,
    spookyGrassland: grasslandMap,

    cemeterySeason: {
        pathAmt: 2,
        pathType: "split",
        pathWidth: 80,
        start: [
            // P1 start
            {
                x: 400,
                y: 2120,
            },
            // P2 start
            {
                x: 2270,
                y: 1770,
            },
        ],
        pathCoords: [
            // Path 1
            [
                { x: 680, y: 2120 },
                { x: 680, y: 1800 },
                { x: 1560, y: 1800 },
                { x: 1560, y: 1720 },
                { x: 1800, y: 1720 },
                { x: 1800, y: 1230 },
                { x: 1390, y: 1230 },
                { x: 1390, y: 830 },
                { x: 510, y: 830 },
                { x: 510, y: 1080 },
                { x: 280, y: 1080 },
                { x: 280, y: 1240 },
            ],
            // Path 2
            [
                { x: 2270, y: 2190 },
                { x: 1560, y: 2190 },
                { x: 1560, y: 1720 },
                { x: 1790, y: 1720 },
                { x: 1790, y: 1230 },
                { x: 1390, y: 1230 },
                { x: 1390, y: 830 },
                { x: 510, y: 830 },
                { x: 510, y: 1080 },
                { x: 280, y: 1080 },
                { x: 280, y: 1240 },
            ],
        ],
        finish: [
            // P1 finish
            {
                x: 90,
                y: 1240,
            },
            // P2 finish
            {
                x: 90,
                y: 1240,
            },
        ],
    },

    cemeterySeasonP1: {
        start: {
            x: 400,
            y: 2120,
        },
        pathCoords: [
            { x: 680, y: 2120 },
            { x: 680, y: 1800 },
            { x: 1560, y: 1800 },
            { x: 1560, y: 1720 },
            { x: 1800, y: 1720 },
            { x: 1800, y: 1230 },
            { x: 1390, y: 1230 },
            { x: 1390, y: 830 },
            { x: 510, y: 830 },
            { x: 510, y: 1080 },
            { x: 280, y: 1080 },
            { x: 280, y: 1240 },
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
            { x: 2270, y: 2190 },
            { x: 1560, y: 2190 },
            { x: 1560, y: 1720 },
            { x: 1790, y: 1720 },
            { x: 1790, y: 1230 },
            { x: 1390, y: 1230 },
            { x: 1390, y: 830 },
            { x: 510, y: 830 },
            { x: 510, y: 1080 },
            { x: 280, y: 1080 },
            { x: 280, y: 1240 },
        ],
        finish: {
            x: 90,
            y: 1240,
        },
    },
};
export default maps;
