import { ARTIFACT_SLOTS, MAINSTAT_WEIGHTS, SUBSTAT_WEIGHTS, SUBSTAT_RV, SUBSTAT_DISPLAY_MAPPINGS, MAINSTAT_DISPLAY_MAPPINGS, FOURTH_SUBSTAT_CHANCE } from "./artifact-data.js";

Number.prototype.roundTo = function (decimal) {
    return +(Math.round(this + "e+" + decimal) + "e-" + decimal);
}

const generateButton = document.getElementById("generate-btn").addEventListener("click", generateAndDisplayArtifact);
const setSelector = document.getElementById("set-selector");
const artifactOutput = document.getElementById("artifact-output");

let artifactSets = null;
let currentArtifact = null;

class Artifact {
    constructor(setKey, slotKey, level = 0, mainStatKey = null, substats = [], source = "domain") {
        this.setKey = setKey;                                           // EmblemOfSeveredFate
        this.slotKey = slotKey || this.initializeSlot();                // plume
        this.level = level;                                             // 0
        this.mainStatKey = mainStatKey || this.initializeMainStat();    // ATK
        this.substats = substats.length ? substats : this.initializeSubstats(source);
        // this.slotKey = "goblet"
        // this.mainStatKey = "ATK%"
    }

    initializeSlot() {
        const slotOptions = Object.keys(ARTIFACT_SLOTS);
        return slotOptions[Math.floor(Math.random() * slotOptions.length)];
    }

    initializeMainStat() {
        const mainStatOptions = MAINSTAT_WEIGHTS[this.slotKey];
        const totalWeight = Object.entries(mainStatOptions).reduce((sum, [, weight]) => sum + weight, 0);
        const random = Math.random() * totalWeight;

        let cumulativeWeight = 0;
        for (const [mainStat, weight] of Object.entries(mainStatOptions)) {
            cumulativeWeight += weight;
            if (random <= cumulativeWeight) {
                return mainStat;
            }
        }
    }

    initializeSubstats(source) {
        const substats = [];
        const available = { ...SUBSTAT_WEIGHTS };
        delete available[this.mainStatKey];

        for (let i = 0; i < 4; i++) {
            const totalWeight = Object.values(available).reduce((sum, w) => sum + w, 0);
            const random = Math.random() * totalWeight;

            let cumulativeWeight = 0;
            for (const [substat, weight] of Object.entries(available)) {
                cumulativeWeight += weight;
                if (random <= cumulativeWeight) {
                    const tier = Math.floor(Math.random() * 4);

                    substats.push({
                        statKey: substat,
                        rolls: [{
                            tier: tier,
                            value: SUBSTAT_RV[substat][tier],
                        }],
                        isActive: i < 3 || (Math.random() < FOURTH_SUBSTAT_CHANCE[source]),
                    });
                    delete available[substat];
                    break;
                }
            }
        }

        return substats;
    }

    levelUp(levels = 1) {
        const targetLevel = Math.min(this.level + levels, 20);
        const prevLevel = this.level;
        this.level = targetLevel;

        for (let lvl = prevLevel + 1; lvl <= targetLevel; lvl++) {
            if (lvl % 4 === 0) {
                if (!this.substats[3].isActive) {
                    this.substats[3].isActive = true;
                } else {
                    const chosen = this.substats[Math.floor(Math.random() * 4)];
                    const tier = Math.floor(Math.random() * 4);

                    chosen.rolls.push({
                        tier: tier,
                        value: SUBSTAT_RV[chosen.statKey][tier],
                    });
                }
            }
        }
    }

    getDisplayData() {  // ts kinda useless
        return {
            artifactName: artifactSets[this.setKey]["slotNames"][this.slotKey],
            slotName: ARTIFACT_SLOTS[this.slotKey].displayName,
            mainStatKey: this.mainStatKey,
            level: this.level,
            setName: artifactSets[this.setKey].displayName,
            substats: this.substats,
        };
    }
}


async function loadArtifactSets() {
    try {
        const res = await fetch("data/artifact_sets.json");
        return await res.json();
    } catch (err) {
        console.error("Artifact load failed", err);
        return null;
    }
}

async function initializeSetSelector() {
    artifactSets = await loadArtifactSets();
    Object.entries(artifactSets).forEach(([id, data]) => {
        setSelector.add(new Option(data["displayName"], id));
    });
}

function generateAndDisplayArtifact() {
    const setKey = setSelector.value;
    if (!setKey) { return; }    // force user to select a set
    currentArtifact = generateArtifact(setKey);
    // console.log(currentArtifact);
    displayArtifact(currentArtifact);
    setLevelButtonsEnabled(true);
}

function generateArtifact(setKey) {
    const wantsDoubleCrit = document.getElementById("double-crit-only").checked;
    if (!wantsDoubleCrit) {
        return new Artifact(setKey);
    }

    while (true) {
        const artifact = new Artifact(setKey);
        const hasCR = artifact.substats.some(s => s.statKey === "CR");
        const hasCD = artifact.substats.some(s => s.statKey === "CD");

        if (hasCR && hasCD) {
            return artifact;
        }
    }
}

function displayArtifact(artifact) {
    const displayData = artifact.getDisplayData();

    document.getElementById("artifact-name").innerText = displayData.artifactName;
    document.getElementById("slot-name").innerText = displayData.slotName;
    document.getElementById("main-stat-name").innerText = MAINSTAT_DISPLAY_MAPPINGS[displayData.mainStatKey].displayName;
    document.getElementById("level").innerText = `+${displayData.level}`;
    document.getElementById("set-name").innerText = displayData.setName;

    artifact.substats.forEach((substat, index) => {
        const li = document.getElementById(`substat-${index + 1}`);
        const totalValue = substat.rolls.reduce((sum, roll) => sum + roll.value, 0);
        const mapping = SUBSTAT_DISPLAY_MAPPINGS[substat.statKey];

        const formattedValue = totalValue.roundTo(mapping.decimalPlaces).toFixed(mapping.decimalPlaces);
        const percentageSymbol = mapping.hasPercentage ? "%" : "";
        let displayText = `${mapping.displayName}+${formattedValue}${percentageSymbol}`;

        if (!substat.isActive) {
            displayText += "  (unactivated)";
            li.style.color = "gray";
        } else {
            li.style.color = "";
        }

        li.textContent = `·${displayText}`;
    });

    document.getElementById("artifact-img").src = `data/icons/${artifact.setKey}/${artifact.slotKey}.webp`;
}

function setLevelButtonsEnabled(enabled) {
    document.getElementById("level-up-1").disabled = !enabled;
    document.getElementById("level-up-tier").disabled = !enabled;
    document.getElementById("level-up-max").disabled = !enabled;
}

document.getElementById("level-up-1").addEventListener("click", () => {
    if (!currentArtifact) { return; }
    currentArtifact.levelUp(1);
    displayArtifact(currentArtifact);
});

document.getElementById("level-up-tier").addEventListener("click", () => {
    if (!currentArtifact) { return; }
    const nextTier = Math.min(Math.ceil((currentArtifact.level + 1) / 4) * 4, 20);
    currentArtifact.levelUp(nextTier - currentArtifact.level);
    displayArtifact(currentArtifact);
});

document.getElementById("level-up-max").addEventListener("click", () => {
    if (!currentArtifact) { return; }
    currentArtifact.levelUp(20 - currentArtifact.level);
    displayArtifact(currentArtifact);
});

setLevelButtonsEnabled(false);
initializeSetSelector();