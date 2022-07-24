interface IMouse {
    x2: number;
    y2: number;
    x: number;
    y: number;
    pressed: boolean;
}

const dpr = window.devicePixelRatio;
const x = window.innerWidth / 2 * dpr;
const y = window.innerHeight / 2 * dpr;
const mouse: IMouse = {
    x2: x,
    y2: y,
    x: x,
    y: y,
    pressed: false
}

window.addEventListener("mousemove", event => {
    const dpr = window.devicePixelRatio;
    mouse.x2 = event.clientX * dpr;
    mouse.y2 = event.clientY * dpr;
})

const handlePress = (event: MouseEvent) => {
    mouse.pressed = event.type === "mousedown";
}

window.addEventListener("mousedown", handlePress);
window.addEventListener("mouseup", handlePress);

export default mouse;