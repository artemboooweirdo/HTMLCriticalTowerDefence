const towerTemplates = {
    blaster: {
        name: "Blaster",
        type: "energy",
        size: 1, // Base size (priest will be half of this)
        placementCost: 1750,
        // Base Stats
        range: 16,
        damage: 3,
        atkSpd: 0.45,
        levels: {
            0: {
                upgradeCost: 400,
                range: 16,
                damage: 3,
                atkSpd: 0.45,
                upgName: "Base Stats",
                desc: ["Base range, damage, and attack speed"],
            },
            1: {
                upgradeCost: 750,
                range: 19,
                damage: 3,
                atkSpd: 0.45,
                upgName: "Ranged Blasting",
                desc: ["+3 Range"],
            },
            2: {
                upgradeCost: 1600,
                range: 19,
                damage: 3,
                atkSpd: 0.3,
                upgName: "Enhanced Module",
                desc: ["0.45 > 0.3 Attack Speed"],
            },
            3: {
                upgradeCost: 5500,
                range: 19,
                damage: 5,
                atkSpd: 0.35,
                upgName: "Energy Cannon",
                desc: ["+2 Damage", "Core Blast: If the target has 15+ Shatter, spend 15 Shatter on target to deal (5xatk)^1.3 AOE DMG (does not stack, the highest leveled Blaster takes priority)"],
            },
            4: {
                upgradeCost: 12050,
                range: 20,
                damage: 8,
                atkSpd: 0.2,
                upgName: "Supercharge",
                desc: ["+1 Range", "+3 Damage", "0.35 > 0.2 Attack Speed"],
            },
            5: {
                upgradeCost: null,
                range: 25,
                damage: 18,
                atkSpd: 0.2,
                upgName: "Mega Blaster",
                desc: ["+5 Range", "+10 Damage"],
            },
        },
    },
};
export default towerTemplates;