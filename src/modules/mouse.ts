interface IMouse {
    x2: number;
    y2: number;
    x: number;
    y: number;
    pressed: boolean;
}

const mouse: IMouse = {
    x2: window.innerWidth / 2,
    y2: window.innerHeight / 2,
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
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