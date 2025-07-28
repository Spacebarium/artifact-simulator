const ARTIFACT_SLOTS = {
    flower: { displayName: "Flower of Life" },
    plume: { displayName: "Plume of Death" },
    sands: { displayName: "Sands of Eon" },
    goblet: { displayName: "Goblet of Eonothem" },
    circlet: { displayName: "Circlet of Logos" }
};

const generateButton = document.getElementById("generate-btn").addEventListener("click", generateAndDisplayArtifact);
const setSelector = document.getElementById("set-selector");
const artifactOutput = document.getElementById("artifact-output");

let artifactSets = null;

class Artifact {
    constructor(setKey, slotKey, level = 0, mainStatKey, substats = []) {
        this.setKey = setKey;               // EmblemOfSeveredFate
        this.slotKey = slotKey;             // plume
        this.level = level;                 // 20
        this.mainStatKey = mainStatKey;     // ATK
        this.substats = substats;
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
    const slots = Object.keys(ARTIFACT_SLOTS);
    const slotKey = slots[Math.floor(Math.random() * slots.length)];


    return new Artifact(setKey, slotKey, 0, "HP", []);
}

function displayArtifact(artifact) {
    const setName = artifactSets[artifact.setKey]["displayName"];
    const slotName = ARTIFACT_SLOTS[artifact.slotKey]["displayName"];
    
    console.log(artifact);
}


// (async () => {
//     await initSetSelector();
//     console.log(artifactSets);
// })();
initSetSelector();