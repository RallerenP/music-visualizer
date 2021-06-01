import { globals, settings } from "../settings.js";

// TODO: 
// Possibly calculate all features every frame (or cache results).
// Could possibly increase performance, if necessary.
class Analyzer {

    _spectrum;
    _average;

    constructor() {
        
    }

    
    setup() {
        this.fft = new p5.FFT(0.5, settings.BINS);
        this.fft.setInput(globals.sound)
        
        

        const lowpass = new p5.LowPass();
        lowpass.freq(50);
        globals.sound.connect(lowpass);
        
        lowpass.disconnect();
        
        

        this.low = new Analyzer();
        this.low.fft = new p5.FFT(0.5, settings.BINS);
        this.low.fft.setInput(lowpass);
        this.low._calculate();

        const highpass = new p5.HighPass();
        highpass.freq(300);
        globals.sound.connect(highpass);
        highpass.disconnect();

        this.high = new Analyzer();
        this.high.fft = new p5.FFT(0.5, settings.BINS);
        this.high.fft.setInput(highpass);
        this.high._calculate();
    }

    update() {
        const sound = globals.sound;
        
        // Maybe add functionality to pause analysis while song is paused

        this._calculate();
        this.low._calculate();
        this.high._calculate();
    }

    spectrum() {
        return this._spectrum;
    }

    average(low, high) {
        if (low !== undefined) {
            if (high === undefined) throw new Error("Invalid usage. Examples: average(), average(low, high)");
            if (low === high || low > high) throw new Error("Invalid usage. Parameter 'low' must be greater than parameter 'high'");

            return this._spectrum.slice(low, high).reduce((a,b) => a+b,0) / high - low;
        }
        return this._average;
    }

    length() {
        const sound = globals.sound;

        return sound.duration();
    }

    time() {
        const sound = globals.sound;
        
        return sound.currentTime();
    }

    isPlaying() {
        const sound = globals.sound;
        
        return sound.isPlaying();
    }

    play() {
        const sound = globals.sound;
        sound.play();
    }

    pause() {
        const sound = globals.sound;
        sound.pause();
    }

    toggle() {
        if (this.isPlaying()) {
            this.pause();
        } else {
            this.play();
        }
    }

    // Duration ratio (How far, from 0 to 1, has the sound played)
    duratio() {
        return this.time() / this.length();
    }

    _calculate() {
        this._spectrum = this.fft.analyze()
        this._average = this._spectrum.reduce((a,b) => a + b,0) / settings.BINS;
    }


}

export default new Analyzer();
