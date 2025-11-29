export function roundTo(value: number, decimal: number): number {
    return +(Math.round(Number(value + "e+" + decimal)) + "e-" + decimal);
}

export function el<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id);
    if (!element) throw new Error(`Element with ID "${id}" not found`);
    return element as T;
}

export function shrinkArtifactName(nameEl: HTMLDivElement): void {
    const MAX_CQW = 6.91;
    const MIN_CQW = 4.85;
    let currentCqw = MAX_CQW;

    nameEl.style.fontSize = `${currentCqw}cqw`;
    nameEl.style.textWrap = "nowrap";

    while (nameEl.scrollWidth > nameEl.clientWidth && currentCqw > MIN_CQW) {
        currentCqw = Math.max(MIN_CQW, currentCqw - 0.01);
        nameEl.style.fontSize = `${currentCqw}cqw`;
    }

    if (nameEl.scrollWidth > nameEl.clientWidth) {
        nameEl.style.textWrap = "wrap";
    } else {
        nameEl.style.textWrap = "nowrap";
    }
}

export function formatMainStatValue(value: number, hasPercentage: boolean): string {
    if (hasPercentage) {
        return new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        }).format(value).toString();
    }
    
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 0
    }).format(value).toString();
}