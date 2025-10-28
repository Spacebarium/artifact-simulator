import { ARTIFACT_SLOTS, MAINSTAT_WEIGHTS, SUBSTAT_WEIGHTS, SUBSTAT_RV, FOURTH_SUBSTAT_CHANCE } from "../data/constants";
import type { SlotKey, MainStatKey, SubstatKey, ArtifactSourceKey } from "../data/constants";
import type { ArtifactSet } from "../utils/loadArtifactSets";


export class Artifact {
    setKey: string
    slotKey: SlotKey
    level: number
    mainStatKey: MainStatKey
    substats: Substat[]
    source: ArtifactSourceKey

    constructor(
        setKey: string,
        slotKey: SlotKey | null = null,
        level = 0,
        mainStatKey: MainStatKey | null = null,
        substats: Substat[] = [],
        source: ArtifactSourceKey = "domain",
    ) {
        this.setKey = setKey;                                           // EmblemOfSeveredFate
        this.slotKey = slotKey ?? this.initializeSlot();                // plume
        this.level = level;                                             // 0
        this.mainStatKey = mainStatKey ?? this.initializeMainStat();    // ATK
        this.substats = substats.length ? substats : this.initializeSubstats(source);
        this.source = source;
    }

    private initializeSlot(): SlotKey {
        const slotOptions = Object.keys(ARTIFACT_SLOTS) as SlotKey[];
        return slotOptions[Math.floor(Math.random() * slotOptions.length)];
    }

    private initializeMainStat(): MainStatKey {
        const mainStatOptions = MAINSTAT_WEIGHTS[this.slotKey];
        const entries = Object.entries(mainStatOptions) as [MainStatKey, number][];
        const totalWeight = entries.reduce((sum, [, weight]) => sum + weight, 0);

        const random = Math.random() * totalWeight;
        let cumulativeWeight = 0;

        for (const [mainStat, weight] of entries) {
            cumulativeWeight += weight;
            if (random <= cumulativeWeight) return mainStat;
        }
        return entries[0][0]  // fallback
    }

    private initializeSubstats(source: ArtifactSourceKey): Substat[] {
        const substats: Substat[] = [];
        const available: Record<SubstatKey, number> = { ...SUBSTAT_WEIGHTS };
        delete available[this.mainStatKey as SubstatKey];

        for (let i = 0; i < 4; i++) {
            const totalWeight = Object.values(available).reduce((sum, w) => sum + w, 0);
            const random = Math.random() * totalWeight;

            let cumulativeWeight = 0;
            for (const [substat, weight] of Object.entries(available) as [SubstatKey, number][]) {
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

    levelUp(levels = 1): void {
        const targetLevel = Math.min(this.level + levels, 20);

        for (let lvl = this.level + 1; lvl <= targetLevel; lvl++) {
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
        this.level = targetLevel;
    }

    getDisplayData(artifactSets: Record<string, ArtifactSet>): ArtifactDisplayData {
        const set = artifactSets[this.setKey]!;
        return {
            artifactName: set["slotNames"][this.slotKey],
            slotName: ARTIFACT_SLOTS[this.slotKey].displayName,
            mainStatKey: this.mainStatKey,
            level: this.level,
            setName: set.displayName,
            substats: this.substats,
        };
    }
}

export interface SubstatRoll {
    tier: number
    value: number
}

export interface Substat {
    statKey: SubstatKey
    rolls: SubstatRoll[]
    isActive: boolean
}

export interface ArtifactDisplayData {
    artifactName: string
    slotName: string
    mainStatKey: MainStatKey
    level: number
    setName: string
    substats: Substat[]
}