export default class Ship {
  constructor(length) {
    this.length = length;
    this.hitCount = 0;
    this.sunk = false;
  }
  hit = () => {
    this.hitCount++;
    if (this.hitCount === this.length) {
      this.sunk = true;
    }
    return { hitCount: this.hitCount, sunk: this.sunk };
  };

  isSunk = () => this.sunk;
}
