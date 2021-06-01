import analyzer from "../analysis/analyzer.js";
import editor from "../editor.js";
import { scheme } from "../UI/color.js";
import { CircleDancer } from "./CircleDancer.js";

class DancerManager {
    dancers = [];


    register(dancer) {
        if (dancer.type === "CircleDancer") {
            this.dancers.push(
                new CircleDancer(
                    dancer.position.x, 
                    dancer.position.y,
                    dancer.diameter,
                    dancer.color,
                    dancer.moves
                ));
        }
    }

    draw() {
        this.dancers.forEach(dancer => {
            dancer.draw();
        })
    }

    select(dancer) {
        if (dancer instanceof CircleDancer) {
            editor.registerUpDown(dancer.x, (val) => dancer.x = val);
        }
    }
}

export default new DancerManager();

