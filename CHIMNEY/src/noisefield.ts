import p5 from "p5";

export class Noisefield {
  tiles: number[][] = [];
  zOffset = 0;
  constructor(
    public rows: number,
    public columns: number,
    public varianceOffset: number,
    public livelinessOffset: number,
    public p: p5
  ) {
    this.updateField();
  }

  getNoise(row: number, column: number): number {
    return this.tiles[row][column];
  }

  updateField() {
    let yOffset = 0;
    for (let y = 0; y < this.rows; y++) {
      let xOffset = 0;
      this.tiles[y] = [];
      for (let x = 0; x < this.columns; x++) {
        let tileNoise = this.p.noise(xOffset, yOffset, this.zOffset);
        this.tiles[y].push(tileNoise);
        xOffset += this.varianceOffset;
      }
      yOffset += this.varianceOffset;
      this.zOffset += this.livelinessOffset;
    }
  }
}
