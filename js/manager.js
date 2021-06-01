import { DancerBar } from "./components/bars/dancerbar.js";
import { Mediabar } from "./components/bars/mediabar.js";
import { globals } from "./settings.js";

const components = {};
let _sound;

export function mediabar() {
    if (!components[Mediabar.ID]) {
        const { width, height } = globals

        components[Mediabar.ID] = new Mediabar(0, height - 100, width, 100);

        window.addEventListener('resize', () => {
            const h = globals.height;
            const w = globals.width;

            components[Mediabar.ID].update(undefined, h - 100, w, undefined)
        });
    }

    const component = components[Mediabar.ID];
    component.draw();
}

export function dancerbar() {
    if (!components[DancerBar.ID]) {
        const { width, height } = globals;
        
        components[DancerBar.ID] = new DancerBar(0, 0, 64, height - 100);

        window.addEventListener('resize', () => {
            const w = globals.width;
            const h = globals.height;

            components[DancerBar.ID].update(undefined, undefined, undefined, h - 100)
        });
    }

    const component = components[DancerBar.ID];
    component.draw();
}