export interface ArtifactSet {
    displayName: string
    slotNames: Record<string, string>
}

export async function loadArtifactSets(): Promise<Record<string, ArtifactSet>> {
    const res = await fetch("./data/artifact_sets.json");
    if (!res.ok) throw new Error(`Failed to load artifact sets: ${res.statusText}`);
    return await res.json();
}