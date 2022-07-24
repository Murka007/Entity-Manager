import Particle from "./modules/Particle";
import EntityManager from "./modules/EntityManager";
import mouse from "./modules/mouse";
import resize from "./modules/resize";
import { lerp, random } from "./utils/Common";
import { canvas, ctx, ParticleColors } from "./modules/constants";

window.addEventListener("contextmenu", event => event.preventDefault());
resize();

// Create our manager, we will use it to add/remove particles from the array
const ParticleManager = new EntityManager<Particle>();

(function loop() {
    window.requestAnimationFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Make particles follow your cursor slowly
    mouse.x = lerp(mouse.x, mouse.x2, 0.1);
    mouse.y = lerp(mouse.y, mouse.y2, 0.1);

    for (let i=0;i<20;i++) {
        ParticleManager.add(
            new Particle(
                mouse.x,
                mouse.y,
                random(5, mouse.pressed ? 30 : 20),
                ParticleColors[random(0, ParticleColors.length-1)]
            )
        );
    }

    for (let i=0;i<ParticleManager.entities.length;i++) {
        const particle = ParticleManager.entities[i];

        particle.update();
        particle.draw();

        if (particle.needsRemove()) {
            ParticleManager.remove(particle);
        }
    }
})();