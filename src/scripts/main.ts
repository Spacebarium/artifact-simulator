import "../css/reset.css";
import "../css/index.css";

import { Artifact } from "../models/Artifact";
import { type ArtifactSet, loadArtifactSets } from "../utils/loadArtifactSets";
import { MAINSTAT_DISPLAY_MAPPINGS, SUBSTAT_DISPLAY_MAPPINGS } from "../data/constants";
import { roundTo, el } from "../utils/helpers";

let artifactSets: Record<string, ArtifactSet> | null = null;
let currentArtifact: Artifact | null = null;

const setSelector = el<HTMLSelectElement>("set-selector");
const generateButton = el<HTMLButtonElement>("generate-btn");

init();

async function init() {
    artifactSets = await loadArtifactSets();
    initializeSetSelector();
    setLevelButtonsEnabled(false);
    registerLevelUpButtons();
}

function initializeSetSelector() {
    if (!artifactSets) return;

    Object.entries(artifactSets).forEach(([id, data]) => {
        setSelector.add(new Option(data.displayName, id));
    });

    generateButton.addEventListener("click", generateAndDisplayArtifact);
}

function generateAndDisplayArtifact() {
    if (!artifactSets) return;

    const setKey = setSelector.value;
    if (!setKey) return;    // force user to select a set
    currentArtifact = generateArtifact(setKey);
    displayArtifact(currentArtifact);
    setLevelButtonsEnabled(true);
}

function generateArtifact(setKey: string): Artifact {
    const wantsDoubleCrit = el<HTMLInputElement>("double-crit-only").checked;
    if (!wantsDoubleCrit) return new Artifact(setKey);

    while (true) {
        const artifact = new Artifact(setKey);
        const hasCR = artifact.substats.some(s => s.statKey === "CR");
        const hasCD = artifact.substats.some(s => s.statKey === "CD");

        if (hasCR && hasCD) return artifact;
    }
}

function displayArtifact(artifact: Artifact) {
    if (!artifactSets) return;

    const displayData = artifact.getDisplayData(artifactSets);

    el<HTMLParagraphElement>("artifact-name").textContent = displayData.artifactName;
    el<HTMLParagraphElement>("slot-name").textContent = displayData.slotName;
    el<HTMLParagraphElement>("main-stat-name").textContent = MAINSTAT_DISPLAY_MAPPINGS[displayData.mainStatKey as keyof typeof MAINSTAT_DISPLAY_MAPPINGS].displayName;
    el<HTMLParagraphElement>("level").textContent = `+${displayData.level}`;
    el<HTMLParagraphElement>("set-name").textContent = displayData.setName;

    artifact.substats.forEach((substat, index) => {
        const li = el<HTMLLIElement>(`substat-${index + 1}`);
        const totalValue = substat.rolls.reduce((sum, roll) => sum + roll.value, 0);
        const mapping = SUBSTAT_DISPLAY_MAPPINGS[substat.statKey];

        const formattedValue = roundTo(totalValue, mapping.decimalPlaces).toFixed(mapping.decimalPlaces);
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

    el<HTMLImageElement>("artifact-img").src = `data/icons/${artifact.setKey}/${artifact.slotKey}.webp`;
}

function setLevelButtonsEnabled(enabled: boolean) {
    el<HTMLButtonElement>("level-up-1").disabled = !enabled;
    el<HTMLButtonElement>("level-up-tier").disabled = !enabled;
    el<HTMLButtonElement>("level-up-max").disabled = !enabled;
}

function registerLevelUpButtons() {
    el<HTMLButtonElement>("level-up-1").addEventListener("click", () => {
        if (!currentArtifact) return;
        currentArtifact.levelUp(1);
        displayArtifact(currentArtifact);
    });

    el<HTMLButtonElement>("level-up-tier").addEventListener("click", () => {
        if (!currentArtifact) return;
        const nextTier = Math.min(Math.ceil((currentArtifact.level + 1) / 4) * 4, 20);
        currentArtifact.levelUp(nextTier - currentArtifact.level);
        displayArtifact(currentArtifact);
    });

    el<HTMLButtonElement>("level-up-max").addEventListener("click", () => {
        if (!currentArtifact) return;
        currentArtifact.levelUp(20 - currentArtifact.level);
        displayArtifact(currentArtifact);
    });
}