const ARTIFACT_SLOTS = {
    FLOWER: { id: "flower", displayName: "Flower of Life" },
    PLUME: { id: "plume", displayName: "Plume of Death" },
    SANDS: { id: "sands", displayName: "Sands of Eon" },
    GOBLET: { id: "goblet", displayName: "Goblet of Eonothem" },
    CIRCLET: { id: "circlet", displayName: "Circlet of Logos" },
};

const generateButton = document.getElementById("generate-btn").addEventListener("click", generateAndDisplayArtifact);
const setSelector = document.getElementById("set-selector");
const artifactOutput = document.getElementById("artifact-output");

let artifactSets = null;

class Artifact {
    constructor(setKey, slotData, level = 0, mainStatKey, substats = []) {
        this.setKey = setKey;                                   // EmblemOfSeveredFate
        this.setName = artifactSets[setKey]["displayName"];     // Emblem of Severed Fate
        this.slotKey = slotData["id"];                          // plumfe
        this.slotName = slotData["displayName"];                // Plume of Death
        this.level = level;                                     // 20
        this.mainStatKey = mainStatKey;                         // ATK
        this.substats = substats;
    }
}


async function loadArtifactSets() {
    try {
        const res = await fetch("../docs/data/artifact_sets.json");
        return await res.json();
    } catch (err) {
        console.error("Artifact load failed", err);
        return null;
    }
}

async function initSetSelector() {
    artifactSets = await loadArtifactSets();
    Object.entries(artifactSets).forEach(([id, data]) => {
        setSelector.add(new Option(data["displayName"], id));
    });
}


function generateAndDisplayArtifact() {
    const setKey = setSelector.value;
    if (!setKey) { return; }
    const artifact = generateArtifact(setKey);

    displayArtifact(artifact);
}

function generateArtifact(setKey) {
    const slots = Object.values(ARTIFACT_SLOTS);
    const slotData = slots[Math.floor(Math.random() * slots.length)];


    return new Artifact(setKey, slotData, 0, "HP", []);
}

function displayArtifact(artifact) {
    console.log(artifact);
}


// (async () => {
//     await initSetSelector();
//     console.log(artifactSets);
// })();
initSetSelector();