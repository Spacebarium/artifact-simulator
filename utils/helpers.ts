export function roundTo(value: number, decimal: number): number {
    return +(Math.round(Number(value + "e+" + decimal)) + "e-" + decimal);
}

export function el<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id);
    if (!element) throw new Error(`Element with ID "${id}" not found`);
    return element as T;
}

function preloadSingleImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => { resolve(img) };
        img.src = url;
    });
}

export async function preloadAllImages(urls: string[]): Promise<void> {
    const promises = urls.map(preloadSingleImage);

    try {
        await Promise.all(promises);
        console.log("All artifact icons preloaded and cached");
    } catch (error) {
        console.error(`An error occurred while preloading images: ${error}`);
    }
}