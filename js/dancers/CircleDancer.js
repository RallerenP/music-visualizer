import analyzer from "../analysis/analyzer.js";
import { globals } from "../settings.js";
import { colors, scheme } from "../UI/color.js";
import { Dancer } from './dancer.js'
import DancerManager from "./DancerManager.js";

export class CircleDancer extends Dancer {
    
    
    constructor(x, y, d, color, moves) {
        super(x, y, d, d);
        this.d = d;
        this.moves = moves;

        window.addEventListener('click', () => {
            if (this._isMouseOver()) {
                DancerManager.select(this);
                this.selected = !this.selected;
            } else {
                if (this.selected) this.selected = false;
            }
        })
    }

    getMoveList() {
        return [
            {
                params: {
                    analyzer: String,
                    range: [String, String]
                }
            },
        ]
    }

    draw() {
        super.draw();

        const p = globals.sketch;
        const { unhex } = colors;

        p.smooth();
        p.noStroke();

        p.fill(unhex(scheme.red.primary));

        const moveBuiltinParams = { 
            initial_diameter: this.d ,
            p
        }

        let dancerParams = {
            x: this.x,
            y: this.y,
            d: this.d,
            color: this.color
        }

        this.moves.forEach(move => {
             const params = {...move.params, ...moveBuiltinParams};
            dancerParams = {...dancerParams, ...move.func(params)};
         })

        p.circle(dancerParams.x, dancerParams.y, dancerParams.d);
    }

    _isMouseOver() {
        const p = globals.sketch;        

        const a = this.x - p.mouseX;
        const b = this.y - p.mouseY;

        return Math.abs((a**2) + (b**2)) < ((this.d / 2)**2)
    }
}