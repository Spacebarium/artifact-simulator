export const ARTIFACT_SLOTS = {
    flower: { displayName: "Flower of Life" },
    plume: { displayName: "Plume of Death" },
    sands: { displayName: "Sands of Eon" },
    goblet: { displayName: "Goblet of Eonothem" },
    circlet: { displayName: "Circlet of Logos" },
} as const

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
} as const

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
} as const

export const SUBSTAT_RV: Record<SubstatKey, number[]> = {
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
} as const

export const SUBSTAT_DISPLAY_MAPPINGS = {
    "HP": { displayName: "HP", hasPercentage: false },
    "ATK": { displayName: "ATK", hasPercentage: false },
    "DEF": { displayName: "DEF", hasPercentage: false },
    "HP%": { displayName: "HP", hasPercentage: true },
    "ATK%": { displayName: "ATK", hasPercentage: true },
    "DEF%": { displayName: "DEF", hasPercentage: true },
    "EM": { displayName: "Elemental Mastery", hasPercentage: false },
    "ER": { displayName: "Energy Recharge", hasPercentage: true },
    "CR": { displayName: "CRIT Rate", hasPercentage: true },
    "CD": { displayName: "CRIT DMG", hasPercentage: true },
} as const

export const MAINSTAT_DISPLAY_MAPPINGS = {
    "HP": { displayName: "HP", hasPercentage: false },
    "ATK": { displayName: "ATK", hasPercentage: false },
    "DEF": { displayName: "DEF", hasPercentage: false },
    "HP%": { displayName: "HP", hasPercentage: true },
    "ATK%": { displayName: "ATK", hasPercentage: true },
    "DEF%": { displayName: "DEF", hasPercentage: true },
    "EM": { displayName: "Elemental Mastery", hasPercentage: false },
    "ER": { displayName: "Energy Recharge", hasPercentage: true },
    "CR": { displayName: "CRIT Rate", hasPercentage: true },
    "CD": { displayName: "CRIT DMG", hasPercentage: true },
    "HB": { displayName: "Healing Bonus", hasPercentage: true },
    "PYRO%": { displayName: "Pyro DMG Bonus", hasPercentage: true },
    "ELECTRO%": { displayName: "Electro DMG Bonus", hasPercentage: true },
    "CRYO%": { displayName: "Cryo DMG Bonus", hasPercentage: true },
    "HYDRO%": { displayName: "Hydro DMG Bonus", hasPercentage: true },
    "DENDRO%": { displayName: "Dendro DMG Bonus", hasPercentage: true },
    "ANEMO%": { displayName: "Anemo DMG Bonus", hasPercentage: true },
    "GEO%": { displayName: "Geo DMG Bonus", hasPercentage: true },
    "PHYSICAL%": { displayName: "Physical DMG Bonus", hasPercentage: true },
} as const

export const MAINSTAT_LEVEL_VALUES = {
    "HP": [ 717, 920, 1123, 1326, 1530, 1733, 1936, 2139, 2342, 2545, 2749, 2952, 3155, 3358, 3561, 3764, 3967, 4171, 4374, 4577, 4780 ],
    "HP%": [ 7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6 ],
    "ATK": [ 47, 60, 73, 86, 100, 113, 126, 139, 152, 166, 179, 192, 205, 219, 232, 245, 258, 272, 285, 298, 311 ],
    "ATK%": [ 7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6 ],
    "DEF%": [ 8.7, 11.2, 13.7, 16.2, 18.6, 21.1, 23.6, 26.1, 28.6, 31.0, 33.5, 36.0, 38.5, 40.9, 43.4, 45.9, 48.4, 50.8, 53.3, 55.8, 58.3 ],
    "EM": [ 28, 36, 44, 52, 60, 68, 76, 84, 91, 99, 107, 115, 123, 131, 139, 147, 155, 163, 171, 179, 187 ],
    "ER": [ 7.8, 10.0, 12.2, 14.4, 16.6, 18.8, 21.0, 23.2, 25.4, 27.6, 29.8, 32.0, 34.2, 36.4, 38.6, 40.8, 43.0, 45.2, 47.4, 49.6, 51.8 ],
    "CR": [ 4.7, 6.0, 7.4, 8.7, 10.0, 11.4, 12.7, 14.0, 15.4, 16.7, 18.0, 19.3, 20.7, 22.0, 23.3, 24.7, 26.0, 27.3, 28.7, 30.0, 31.1 ],
    "CD": [ 9.3, 11.9, 14.6, 17.2, 19.9, 22.5, 25.2, 27.8, 30.5, 33.1, 35.8, 38.4, 41.1, 43.7, 46.3, 49.0, 51.6, 54.3, 56.9, 59.6, 62.2 ],
    "HB": [ 5.4, 6.9, 8.4, 10.0, 11.5, 13.0, 14.5, 16.1, 17.6, 19.1, 20.6, 22.2, 23.7, 25.2, 26.7, 28.3, 29.8, 31.3, 32.8, 34.4, 35.9 ],
    "PYRO%": [ 7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6 ],
    "ELECTRO%": [ 7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6 ],
    "CRYO%": [ 7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6 ],
    "HYDRO%": [ 7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6 ],
    "DENDRO%":[ 7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6 ],
    "ANEMO%": [ 7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6 ],
    "GEO%": [ 7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6 ],
    "PHYSICAL%": [ 8.7, 11.2, 13.7, 16.2, 16.2, 21.1, 23.6, 26.1, 28.6, 31.0, 33.5, 36.0, 38.5, 40.9, 43.4, 45.9, 48.4, 50.8, 53.3, 55.8, 58.3 ],
} as const

export const FOURTH_SUBSTAT_CHANCE = {
    "domain": 1 / 5,
    "other": 1 / 3,
} as const

export type SlotKey = keyof typeof ARTIFACT_SLOTS;
export type MainStatKey = keyof typeof MAINSTAT_DISPLAY_MAPPINGS;
export type SubstatKey = keyof typeof SUBSTAT_DISPLAY_MAPPINGS;
export type ArtifactSourceKey = keyof typeof FOURTH_SUBSTAT_CHANCE;

export const TIER_TO_RV_MAPPING: Record<number, number> = {
    0: 70,
    1: 80,
    2: 90,
    3: 100,
};