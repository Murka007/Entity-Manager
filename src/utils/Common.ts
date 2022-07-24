export const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const map = (...args: [number, number, number, number, number]) => {
    const [value, start1, stop1, start2, stop2] = args;
    return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
}

export const lerp = (start: number, stop: number, amt: number) => {
    return amt * (stop - start) + start;
}

export const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
}