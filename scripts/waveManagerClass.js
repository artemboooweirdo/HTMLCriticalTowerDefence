export default class WaveManager {
    constructor(waveData,) {
        this.waveLayout = waveLayout;
        this.waveData = waveData;
        this.currentWaveIndex = 0;
        this.currentWave = null;
        this.timeSinceLastSpawn = 0;
        this.enemiesToSpawn = [];
        this.waveTimer = 0;
    }

    startNextWave() {
        if (this.currentWaveIndex < this.waveLayout.length) {
            this.currentWave = this
        }
    }


}