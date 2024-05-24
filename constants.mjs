const lieFrequencies = [0, 0.4, 0.575, 0.65, 0.8, 1, 0];
const lieInfo = [
    {
        id: 0,
        type: "tee",
        strong: [0, 1, 2, 3, 4], // metals, low irons
        weak: [5, 6, 7, 8, 9, 10], // high irons, wedges, putter
        strongMultiplier: [0.9, 1.2],
        weakMultiplier: [0.4, 0.7],
        frequency: 0 // only first shot
    },
    {
        id: 1,
        type: "fairway",
        strong: [1, 2, 3, 4, 5, 6, 7, 8, 9], // wood, hybrid, irons, wedges
        weak: [0, 10], // driver, putter
        strongMultiplier: [0.9, 1.15],
        weakMultiplier: [0.6, 0.85],
        frequency: 0.4
    },
    {
        id: 2, 
        type: "first-tier rough",
        strong: [2, 3, 4, 5, 6, 7, 8, 9], // hybrid, irons, wedges
        weak: [0, 1, 10], // driver, wood, putter
        strongMultiplier: [0.65, 0.85],
        weakMultiplier: [0.1, 0.35],
        frequency: 0.175
    },
    {
        id: 3,
        type: "second-tier rough",
        strong: [5, 6, 7, 8, 9], // high irons, wedges
        weak: [0, 1, 2, 3, 4, 10], // driver, wood, hybrid, low irons, putter
        strongMultiplier: [0.5, 0.75],
        weakMultiplier: [0.05, 0.2],
        frequency: 0.075
    },
    {
        id: 4,
        type: "bunker",
        strong: [3, 4, 5, 6, 7, 8, 9], // irons, wedges
        weak: [0, 1, 2, 10], // driver, wood, hybrid, putter
        strongMultiplier: [0.5, 0.65],
        weakMultiplier: [0.1, 0.35],
        frequency: 0.15
    },
    {
        id: 5, 
        type: "fringe",
        strong: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // wood, hybrid, irons, wedges, putter
        weak: [0], // driver
        strongMultiplier: [0.9, 1.1],
        weakMultiplier: [0.6, 0.85],
        frequency: 0.2
    },
    {
        id: 6,
        type: "green",
        strong: [10], // putter
        weak: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // driver, wood, hybrid, irons, wedges
        strongMultipler: [1],
        weakMultiplier: [1],
        frequency: 0
    }
]

const holeInfo = [
    // Add handicaps in the future?
    {
        id: 0,
        hole: 1,
        distance: 380,
        par: 4
    },
    {
        id: 1,
        hole: 2,
        distance: 400,
        par: 4,
    },
    {
        id: 2,
        hole: 3,
        distance: 160,
        par: 3
    },
    {
        id: 3,
        hole: 4,
        distance: 420,
        par: 4
    },
    {
        id: 4,
        hole: 5,
        distance: 390,
        par: 4
    },
    {
        id: 5,
        hole: 6,
        distance: 510,
        par: 5
    },
    {
        id: 6,
        hole: 7,
        distance: 410,
        par: 4
    },
    {
        id: 7,
        hole: 8,
        distance: 575,
        par: 5
    },
    {
        id: 8, 
        hole: 9,
        distance: 180,
        par: 3
    },
    {
        id: 9,
        hole: 10,
        distance: 440,
        par: 4
    },
    {
        id: 10,
        hole: 11,
        distance: 370,
        par: 4
    },
    {
        id: 11,
        hole: 12,
        distance: 400,
        par: 4
    },
    {
        id: 12,
        hole: 13,
        distance: 190,
        par: 3
    },
    {
        id: 13,
        hole: 14,
        distance: 340,
        par: 4
    },
    {
        id: 14,
        hole: 15,
        distance: 150,
        par: 3
    },
    {
        id: 15,
        hole: 16,
        distance: 550,
        par: 5
    },
    {
        id: 16,
        hole: 17,
        distance: 410,
        par: 4
    },
    {
        id: 17,
        hole: 18,
        distance: 530,
        par: 5
    }
]

const clubs = [
{
    id: 0,
    name: "Driver",
    type: "Metal",
    power: 225,
    accuracy: 0.75
},
{
    id: 1,
    name: "3 Wood",
    type: "Metal",
    power: 200,
    accuracy: 0.7
},
{
    id: 2,
    name: "5 Hybrid",
    type: "Metal",
    power: 185,
    accuracy: 0.7
},
{
    id: 3,
    name: "6 Iron", 
    type: "Iron",
    power: 175,
    accuracy: 0.75
},
{
    id: 4,
    name: "7 Iron",
    type: "Iron",
    power: 160,
    accuracy: 0.8
},
{
    id: 5,
    name: "8 Iron",
    type: "Iron",
    power: 145,
    accuracy: 0.85
},
{
    id: 6,
    name: "9 Iron",
    type: "Iron",
    power: 130,
    accuracy: 0.87
},
{
    id: 7,
    name: "Pitching Wedge",
    type: "Wedge",
    power: 100,
    accuracy: 0.9
},
{
    id: 8,
    name: "52 Degree Wedge",
    type: "Wedge",
    power: 75,
    accuracy: 0.9
},
{
    id: 9,
    name: "56 Degree Wedge",
    type: "Wedge",
    power: 50,
    accuracy: 0.9
},
{
    id: 10,
    name: "Putter",
    type: "Putter",
    power: 30,
    accuracy: 0.96
}
]

export { lieInfo, lieFrequencies, holeInfo, clubs };
