import analyzer from "../../analysis/analyzer.js";
import { globals, settings } from "../../settings.js";
import { colors, scheme } from "../../UI/color.js";
import { MediaButton } from "./buttons/mediabutton.js";

export class Mediabar {
    static ID = "mediabar"

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.gap = 2;
        this.padding = 10;

        // TODO add volume slider
        this.playButton = new MediaButton(
            "\uf04b",
            this.x + (this.width / 2) - 15,
            this.y + (36 / 2) - 15,
            30,
            30,
            scheme.gray.primary,
            scheme.gray.brighter,
            scheme.green.primary,
            scheme.green.primary,
        )

        this.playButton.onclick = () => {
            analyzer.toggle();
        }
    }

    draw() {
        const { height, width, gap, padding } = this;
        const { unhex } = colors;
        const p = globals.sketch;
        const spectrum = analyzer.spectrum();
        const { BINS: bins } = settings;

        let rel_y = this.y;
        let rel_height = this.height;

        p.noStroke();

        p.fill(unhex(scheme.gray.primary));

        p.rect(this.x, rel_y, this.width, this.height)

        rel_y += 36;
        rel_height -= 36;
        
        p.fill(unhex(scheme.yellow.primary));

        p.rect(this.x, rel_y, p.map(analyzer.duratio(), 0, 1, 0, this.width), 2);

        p.fill(unhex(scheme.green.primary));

        for (let i = 0; i < spectrum.length / 4; i++) {
            const mapped = Math.max(p.map(spectrum[i], 0, 255, 0, rel_height) - padding, 2);

            const x = this.x + (i * (width / bins) * 4);
            const y = rel_y + ((rel_height / 2) - mapped / 2) ; 
            const w = (width / bins * 4) - gap;
            const h = mapped;

            p.fill(unhex(scheme.green.primary));

            p.rect(x,y,w,h);

            
            if (i % 10 === 0) {
                p.textFont('Consolas');
                p.textSize(10);
                p.fill(255);
                p.text(i, x, this.y + this.height - 5)
            }
        }

        if (analyzer.isPlaying()) {
            this.playButton.icon = "\uf04c";
        } else {
            this.playButton.icon = "\uf04b";
        }

        this.playButton.draw();
    }

    update(x, y, width, height) {
        if (x) this.x = x;
        if (y) this.y = y;
        if (width) this.width = width;
        if (height) this.height = height;

        this.playButton.update(
            this.x + (this.width / 2) - 15,
            this.y + (36 / 2) - 15,
            30,
            30,
        )
        
    }
}
