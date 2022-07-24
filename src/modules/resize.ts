import { canvas } from "./constants";

const resize = () => {
    const dpr = window.devicePixelRatio;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
}
window.addEventListener("resize", resize);

export default resize;