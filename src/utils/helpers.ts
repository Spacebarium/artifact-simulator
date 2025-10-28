export function roundTo(value: number, decimal: number): number {
    return +(Math.round(Number(value + "e+" + decimal)) + "e-" + decimal);
}

export function el<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id);
    if (!element) throw new Error(`Element with ID "${id}" not found`);
    return element as T;
}