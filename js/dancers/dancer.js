import { globals } from '../settings.js'
import { colors, scheme } from '../UI/color.js';

export class Dancer {
    x; y; width; height;
    
    constructor(x, y, width, height) {
        if(this.constructor === Dancer) throw new Error("Abstract class Dancer cannot be instantiated");

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.selected = false;

       
    }

    draw() {
        if (!this.selected) return;

        const p = globals.sketch;        
        const { unhex } = colors;
        p.noFill();
        p.stroke(unhex(scheme.gray.primary));
        p.strokeWeight(2);

        p.rect(this.x - ((this.width + 1) / 2), this.y - ((this.height + 1) / 2), this.width + 1, this.height + 1);
    }

    _isMouseOver() {
        return false;
    }
}