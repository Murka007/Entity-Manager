interface IMouse {
    x2: number;
    y2: number;
    x: number;
    y: number;
    pressed: boolean;
}

const mouse: IMouse = {
    x2: 0,
    y2: 0,
    x: 0,
    y: 0,
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