export default class Gameboard {
  constructor(oppName, size = 10) {
    this.oppName = oppName;
    this.size = size;
    this.board = this.initBoard(this.size);
    this.placedShips = [];
  }

  initBoard = (size) => {
    const board = new Array(size);
    for (let i = 0; i < size; i++) {
      board[i] = new Array(size);
    }
    return board;
  };

  placeShip = (ship, x, y) => {
    if (x >= this.size) throw new Error('invalid x');
    if (ship.length + y - 1 >= this.size)
      throw new Error(`invalid y ${ship.length} ${y}`);

    this.board[x][y] = ship;
    if (ship.length > 1) {
      for (let i = 2; i <= ship.length; i++) {
        this.board[x][y + i - 1] = ship;
      }
    }
    if (x - 1 >= 0) {
      for (let i = y - 1; i <= y + ship.length; i++) {
        if (i < this.size && i >= 0) {
          this.board[x - 1][i] = 'no-placed';
        }
      }
    }
    if (x + 1 < this.size) {
      for (let i = y - 1; i <= y + ship.length; i++) {
        if (i < this.size && i >= 0) {
          this.board[x + 1][i] = 'no-placed';
        }
      }
    }
    if (y - 1 >= 0) this.board[x][y - 1] = 'no-placed';
    if (y + ship.length < this.size)
      this.board[x][y + ship.length] = 'no-placed';
    ship.placement = [x, y];
    this.placedShips.push([x, y]);
  };

  placeShipRandomly = (ship) => {
    let x = Math.floor(Math.random() * this.size);
    let y = Math.floor(Math.random() * this.size);

    while (
      this.board[x][y] ||
      ship.length + y - 1 >= this.size ||
      this.board[x][y + ship.length - 1]
    ) {
      x = Math.floor(Math.random() * this.size);
      y = Math.floor(Math.random() * this.size);
    }

    this.placeShip(ship, x, y);
  };

  receiveAttack = (x, y) => {
    if (
      !this.board[x][y] ||
      this.board[x][y] === 'missed' ||
      this.board[x][y] === 'no-placed'
    )
      return (this.board[x][y] = 'missed');

    const hitResult = this.board[x][y].hit();
    if (hitResult.sunk) {
      if (this.isAllSunk() === true) return 'all sunk';
      return 'sunk';
    }

    if (hitResult.hitCount > 0) {
      if (+x + 1 < this.size && +y + 1 < this.size)
        this.board[+x + 1][+y + 1] = 'four';
      if (+x + 1 < this.size && +y - 1 >= 0)
        this.board[+x + 1][+y - 1] = 'four';
      if (+x - 1 >= 0 && +y + 1 < this.size)
        this.board[+x - 1][+y + 1] = 'four';
      if (+x - 1 >= 0 && +y - 1 >= 0) this.board[+x - 1][+y - 1] = 'four';
    }
    return hitResult.hitCount;
  };

  isAllSunk = () => {
    let result = true;
    this.placedShips.forEach((ship) => {
      if (!this.board[ship[0]][ship[1]].isSunk()) result = false;
    });
    return result;
  };
}
