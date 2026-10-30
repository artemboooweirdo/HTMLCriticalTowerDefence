export default class waveTimer {
    constructor(seconds) {
        this.waveDuration = seconds * 1000;
        this.timeLeft = this.waveDuration;
        this.lastTime = performance.now();
        this.isPaused = true;

    }
    start() {
        this.lastTime = performance.now();
        this.isPaused = false;
    }
    update() {
        if (this.isPaused) return;
        const currentTime = performance.now();
        const dt = currentTime - this.lastTime;
        this.timeLeft -= dt;
        this.lastTime = currentTime;
    }
    togglePause() {
        if (this.isPaused == false) {
            this.isPaused = true;
        } else if (this.isPaused == true) {
            this.isPaused = false;
        } else {
            throw new Error("Why did this happen... ")
        }
    }
    clTimeLeft() {
        console.log(this.lastTime);
    }
    getTime() {
        return Math.max(0, (this.timeLeft / 1000));
    }
} ;