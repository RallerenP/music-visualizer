import analyzer from './analysis/analyzer.js';
import { CircleDancer } from './dancers/CircleDancer.js';
import dancerManager from './dancers/DancerManager.js';
import { dancerbar, mediabar } from './manager.js';
import { globals } from './settings.js';

let canvas;
let bins = 1024;
let spectrum;
let sound;
let dancer;

/**
 *
 * @param p {P5S}
 */
const sketch = function(p) {
    let sound;
    
    p.preload = function() {
        sound = p.loadSound('/assets/music/serenity.mp3');
        
        
        globals.sketch = p;
        globals.sound = sound;
        globals.icons_solid = p.loadFont('/assets/fonts/icons-solid.otf');
        globals.icons_regular = p.loadFont('/assets/fonts/icons-regular.otf');

        analyzer.setup();
    }

    p.setup = function() {
        const content = document.getElementById('content');

        const h = window.innerHeight;
        const w = window.innerWidth;

        const canvas = p.createCanvas(w, h);
        canvas.parent(content);
        
        //dancerManager = new DancerManager();
        //dancer = new CircleDancer(200, 200, 100)

        sound.loop()
    }

    p.draw = function() {
        const { width, height } = globals

        p.background(255)

        globals.cursor = "default";
        analyzer.update();
        mediabar();
        dancerbar();

        //dancer.draw();
        dancerManager.draw();

        p.cursor(globals.cursor)
    }

    p.keyPressed = function() {
        if (p.key === " ") sound.isPaused() ? sound.play() :  sound.pause();
    }

    p.windowResized = function() {
        const h = document.body.clientHeight;
        const w = document.body.clientWidth;

        globals.height = h;
        globals.width = w;

        p.resizeCanvas(w,h);
    }
}

new p5(sketch);

