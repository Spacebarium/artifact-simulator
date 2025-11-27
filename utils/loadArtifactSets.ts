export interface ArtifactSet {
    displayName: string
    slotNames: Record<string, string>
}

export interface ArtifactData {
    sets: Record<string, ArtifactSet>
    imagePaths: string[]
}

const imageBaseDir = "data/icons";

export async function loadArtifactSets(): Promise<ArtifactData> {
    const res = await fetch("./data/artifact_sets.json");
    if (!res.ok) throw new Error(`Failed to load artifact sets: ${res.statusText}`);

    const artifactSetsData: Record<string, ArtifactSet> = await res.json();
    const allImagePaths: string[] = [];

    for (const setKey of Object.keys(artifactSetsData)) {
        const slotNames = artifactSetsData[setKey].slotNames;
        for (const slotKey of Object.keys(slotNames)) {
            const path = `${imageBaseDir}/${setKey}/${slotKey}.webp`;
            allImagePaths.push(path);
        }
    }

    console.log(`Generated ${allImagePaths.length} image paths for preloading.`)
    
    return {
        sets: artifactSetsData,
        imagePaths: allImagePaths
    };
}