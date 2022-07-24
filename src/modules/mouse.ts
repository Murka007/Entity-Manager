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

const handleMove = (event: MouseEvent | TouchEvent) => {
    const dpr = window.devicePixelRatio;
    const { clientX, clientY } = event instanceof TouchEvent ? event.changedTouches[0] : event;
    mouse.x2 = clientX * dpr;
    mouse.y2 = clientY * dpr;
}

window.addEventListener("mousemove", handleMove);
window.addEventListener("touchmove", handleMove);

const handlePress = (event: MouseEvent | TouchEvent) => {
    mouse.pressed = event.type === "mousedown" || event.type === "touchstart";
    handleMove(event);
}

window.addEventListener("mousedown", handlePress);
window.addEventListener("mouseup", handlePress);
window.addEventListener("touchstart", handlePress);
window.addEventListener("touchend", handlePress);

export default mouse;