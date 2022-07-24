import { canvas, ctx } from "./constants";
import { clamp, map, random } from "../utils/Common";
import Vector from "./Vector";
import mouse from "./mouse";

interface IParticle {
    needsRemove(): boolean
    clampPosition(): void
    resolveBounds(): void
    update(): void
    draw(): void
}

class Particle implements IParticle {
    id: number;
    private readonly radius: number;
    private readonly color: string;
    private readonly acceleration: Vector;
    private readonly velocity: Vector;
    private readonly position: Vector;
    private lifetime: number;

    constructor(x: number, y: number, radius: number, color: string) {
        this.id = -1;
        this.radius = radius;
        this.color = color;
        this.acceleration = new Vector(0, 0);
        this.velocity = Vector.random2D(Math.random() * Math.PI * 2).setMag(random(0, mouse.pressed ? 10 : 2));
        this.position = new Vector(x, y);
        this.lifetime = 175;
    }

    needsRemove(): boolean {
        return this.lifetime < 1;
    }

    clampPosition(): void {
        const pos = this.position;
        const r = this.radius;

        pos.x = clamp(pos.x, r, canvas.width - r);
        pos.y = clamp(pos.y, r, canvas.height - r);
    }

    resolveBounds(): void {
        const pos = this.position;
        const r = this.radius;

        // if touching one of the canvas sides, reflect particle velocity
        if (pos.x < r || pos.x > canvas.width - r) {
            this.velocity.x *= -1
        }
        if (pos.y < r || pos.y > canvas.height - r) {
            this.velocity.y *= -1;
        }
        this.clampPosition();
    }
    
    update(): void {
        this.resolveBounds();
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.setXY(0, 0);

        this.lifetime -= 5;
    }

    draw() {
        ctx.beginPath();
        ctx.globalAlpha = map(this.lifetime, 0, 255, 0, 1);
        ctx.fillStyle = this.color;
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

export default Particle;