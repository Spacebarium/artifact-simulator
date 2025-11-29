import "../css/reset.css";
import "../css/index.css";

import { Artifact } from "../models/Artifact";
import { type ArtifactSet, loadArtifactSets } from "../utils/loadArtifactSets";
import { MAINSTAT_DISPLAY_MAPPINGS, SUBSTAT_DISPLAY_MAPPINGS, MAINSTAT_LEVEL_VALUES } from "../data/constants";
import { roundTo, el, shrinkArtifactName, formatMainStatValue } from "../utils/helpers";

let artifactSets: Record<string, ArtifactSet> | null = null;
let currentArtifact: Artifact | null = null;
let rerollsSpent: number = 0;

const setSelector = el<HTMLSelectElement>("set-selector");
const generateButton = el<HTMLButtonElement>("generate-btn");
const rerollCount = el<HTMLParagraphElement>("reroll-count");

init();

// el<HTMLInputElement>("opacity-slider").addEventListener("input", (event) => {
//     const target = event.target as HTMLInputElement;
//     const overlay = el<HTMLDivElement>("reference-overlay");
//     overlay.style.opacity = target.value;
// });

async function init() {
    artifactSets = await loadArtifactSets();
    initializeSetSelector();
    setLevelButtonsEnabled(false);
    registerLevelUpButtons();
    el<HTMLButtonElement>("reroll").disabled = true;
    el<HTMLDivElement>("artifact-card").style.visibility = "hidden";
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

    rerollsSpent = 0;
    currentArtifact = generateArtifact(setKey);

    displayArtifact(currentArtifact);
    setLevelButtonsEnabled(true);
    el<HTMLDivElement>("artifact-card").style.visibility = "visible";
}

function generateArtifact(setKey: string): Artifact {
    const wantsDoubleCrit = el<HTMLInputElement>("double-crit-checkbox").checked;
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

    el<HTMLDivElement>("slot-name").textContent = displayData.slotName;
    el<HTMLDivElement>("main-stat-name").textContent = MAINSTAT_DISPLAY_MAPPINGS[displayData.mainStatKey as keyof typeof MAINSTAT_DISPLAY_MAPPINGS].displayName;
    el<HTMLDivElement>("level").textContent = `+${displayData.level}`;;
    el<HTMLDivElement>("set-name").textContent = `${displayData.setName}:`;

    artifact.substats.forEach((substat, index) => {
        const div = el<HTMLDivElement>(`substat-${index + 1}`);
        const totalValue = substat.rolls.reduce((sum, roll) => sum + roll.value, 0);
        const mapping = SUBSTAT_DISPLAY_MAPPINGS[substat.statKey];

        const formattedValue = roundTo(totalValue, Number(mapping.hasPercentage)).toFixed(Number(mapping.hasPercentage));
        const percentageSymbol = mapping.hasPercentage ? "%" : "";
        let displayText = `${mapping.displayName}+${formattedValue}${percentageSymbol}`;

        if (!substat.isActive) {
            displayText += "  (unactivated)";
            div.style.color = "gray";
        } else {
            div.style.color = "";
        }

        div.textContent = `·${displayText}`;
    });

    el<HTMLImageElement>("artifact-img").src = `data/icons/${artifact.setKey}/${artifact.slotKey}.webp`;

    const nameEl = el<HTMLDivElement>("artifact-name").firstChild as HTMLDivElement;
    nameEl.textContent = displayData.artifactName;
    shrinkArtifactName(nameEl)

    const mainStatLevelValue = MAINSTAT_LEVEL_VALUES[displayData.mainStatKey as keyof typeof MAINSTAT_LEVEL_VALUES][artifact.level];
    const mainStatHasPercentage = MAINSTAT_DISPLAY_MAPPINGS[displayData.mainStatKey].hasPercentage;
    const percentageSymbol = mainStatHasPercentage ? "%" : "";
    const formattedValueString = formatMainStatValue(mainStatLevelValue, mainStatHasPercentage);
    el<HTMLDivElement>("main-stat-value").textContent = `${formattedValueString}${percentageSymbol}`;

    rerollCount.textContent = `Rerolls: ${rerollsSpent}`;
    setRerollButtonEnabled(artifact.level);
    // console.log(currentArtifact);
}

function setRerollButtonEnabled(level: number) {
    el<HTMLButtonElement>("reroll").disabled = level !== 20; 
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

    el<HTMLButtonElement>("reroll").addEventListener("click", () => {
        if (!currentArtifact) return;
        rerollsSpent += 1;
        currentArtifact.rerollSubstats();
        displayArtifact(currentArtifact);
    });
}