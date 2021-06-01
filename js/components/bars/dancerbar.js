import dancerManager from "../../dancers/DancerManager.js";
import { globals } from "../../settings.js";
import { scheme } from "../../UI/color.js";
import { IconButton } from "./buttons/iconbutton.js";
import analyzer from '../../analysis/analyzer.js'

export class DancerBar {

    static ID = "componentbar"

    constructor(x, y, width, height) {
        
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.buttons = [];

        const circleButton = new IconButton(
            "\uf111",
            "Circle",
            this.x,
            this.y,
            this.width,
            this.width,
            scheme.red.primary,
            scheme.red.brighter,
            "#ffffff",
            "#ffffff"
        )

        circleButton.onclick = () => {
            dancerManager.register(
                {
                    type: "CircleDancer",
                    position: {
                        x: Math.random() * (globals.width - 64),
                        y: Math.random() * (globals.height - 100),
                    },
                    diameter: 50,
                    color: scheme.red.primary,
                    moves: [
                        {
                            params: {
                                analyzer: analyzer.low,
                                sensitivity_threshold: 10,
                                range_min: 5,
                                range_max: 7,
                                diameter_delta_min: 0,
                                diameter_delta_max: 50
                            },
                            func: ({ analyzer, sensitivity_threshold, range_min, range_max, diameter_delta_min, diameter_delta_max, initial_diameter, p }) => {
                                const avg = analyzer.average(range_min, range_max)
                                return {d: initial_diameter + p.map(avg > sensitivity_threshold ? avg : 0, 0, 255, diameter_delta_min, diameter_delta_max)};

                            }
                        }
                        
                    ]
                }
            )
        }

        this.buttons.push(
            circleButton
        )
    }

    draw() {
        const p = globals.sketch;

        p.fill(scheme.red.primary);
        
        p.rect(this.x, this.y, this.width, this.height);

        this.buttons.forEach(button => {
            button.draw();
        })
    }

    update(x, y, width, height) {
        if (x) this.x = x;
        if (y) this.y = y;
        if (width) this.width = width;
        if (height) this.height = height;
    }

}