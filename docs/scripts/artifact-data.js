export const ARTIFACT_SLOTS = {
    flower: { displayName: "Flower of Life" },
    plume: { displayName: "Plume of Death" },
    sands: { displayName: "Sands of Eon" },
    goblet: { displayName: "Goblet of Eonothem" },
    circlet: { displayName: "Circlet of Logos" },
}

export const MAINSTAT_WEIGHTS = {
    flower: {
        "HP": 1,
    },
    plume: {
        "ATK": 1,
    },
    sands: {
        "HP%": 8,
        "ATK%": 8,
        "DEF%": 8,
        "EM": 3,
        "ER": 3,
    },
    goblet: {
        "HP%": 77,
        "ATK%": 77,
        "DEF%": 76,
        "PYRO%": 20,
        "ELECTRO%": 20,
        "CRYO%": 20,
        "HYDRO%": 20,
        "DENDRO%": 20,
        "ANEMO%": 20,
        "GEO%": 20,
        "PHYSICAL%": 20,
        "EM": 10,
    },
    circlet: {
        "HP%": 11,
        "ATK%": 11,
        "DEF%": 11,
        "CR": 5,
        "CD": 5,
        "HB": 5,
        "EM": 2,
    },
}

export const SUBSTAT_WEIGHTS = {
    "HP": 6,
    "ATK": 6,
    "DEF": 6,
    "HP%": 4,
    "ATK%": 4,
    "DEF%": 4,
    "EM": 4,
    "ER": 4,
    "CR": 3,
    "CD": 3,
}

export const SUBSTAT_RV = {
    "HP": [209.13, 239.00, 268.88, 298.75],
    "ATK": [13.62, 15.56, 17.51, 19.45],
    "DEF": [16.20, 18.52, 20.83, 23.15],
    "HP%": [4.08, 4.66, 5.25, 5.83],
    "ATK%": [4.08, 4.66, 5.25, 5.83],
    "DEF%": [5.10, 5.83, 6.56, 7.29],
    "EM": [16.32, 18.65, 20.98, 23.31],
    "ER": [4.53, 5.18, 5.83, 6.48],
    "CR": [2.72, 3.11, 3.50, 3.89],
    "CD": [5.44, 6.22, 6.99, 7.77],
}

export const SUBSTAT_DISPLAY_MAPPINGS = {
    "HP": { displayName: "HP", hasPercentage: false, decimalPlaces: 0 },
    "ATK": { displayName: "ATK", hasPercentage: false, decimalPlaces: 0 },
    "DEF": { displayName: "DEF", hasPercentage: false, decimalPlaces: 0 },
    "HP%": { displayName: "HP", hasPercentage: true, decimalPlaces: 1 },
    "ATK%": { displayName: "ATK", hasPercentage: true, decimalPlaces: 1 },
    "DEF%": { displayName: "DEF", hasPercentage: true, decimalPlaces: 1 },
    "EM": { displayName: "Elemental Mastery", hasPercentage: false, decimalPlaces: 0 },
    "ER": { displayName: "Energy Recharge", hasPercentage: true, decimalPlaces: 1 },
    "CR": { displayName: "CRIT Rate", hasPercentage: true, decimalPlaces: 1 },
    "CD": { displayName: "CRIT DMG", hasPercentage: true, decimalPlaces: 1 },
}

export const MAINSTAT_DISPLAY_MAPPINGS = {
    "HP": { displayName: "HP" },
    "ATK": { displayName: "ATK" },
    "DEF": { displayName: "DEF" },
    "HP%": { displayName: "HP" },
    "ATK%": { displayName: "ATK" },
    "DEF%": { displayName: "DEF" },
    "EM": { displayName: "Elemental Mastery" },
    "ER": { displayName: "Energy Recharge" },
    "CR": { displayName: "CRIT Rate" },
    "CD": { displayName: "CRIT DMG" },
    "HB": { displayName: "Healing Bonus" },
    "PYRO%": { displayName: "Pyro DMG Bonus" },
    "ELECTRO%": { displayName: "Electro DMG Bonus" },
    "CRYO%": { displayName: "Cryo DMG Bonus" },
    "HYDRO%": { displayName: "Hydro DMG Bonus" },
    "DENDRO%": { displayName: "Dendro DMG Bonus" },
    "ANEMO%": { displayName: "Anemo DMG Bonus" },
    "GEO%": { displayName: "Geo DMG Bonus" },
    "PHYSICAL%": { displayName: "Physical DMG Bonus" },
}

export const FOURTH_SUBSTAT_CHANCE = {
    "domain": 1 / 5,
    "other": 1 / 3,
}