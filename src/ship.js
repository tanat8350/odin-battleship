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
      return 'sunk';
    }
    return this.hitCount;
  };
  isSunk = () => this.sunk;
}

// const testShip = new Ship(5);
// testShip.hit();
// console.log(testShip.isSunk());
// testShip.hit();
// testShip.hit();
// testShip.hit();
// testShip.hit();
// console.log(testShip.isSunk());
