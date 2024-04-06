import Ship from './ship.js';
import Gameboard from './gameboard.js';

export default class Player {
  constructor(size) {
    // oppName, size
    this.playerBoard = new Gameboard('Computer', size);
    this.computerBoard = new Gameboard('Player', size);
    this.size = size;
    this.initBoardRandomly(this.playerBoard);
    this.initBoardRandomly(this.computerBoard);
  }

  initBoardRandomly(board) {
    const ships = [
      new Ship(4),
      new Ship(4),
      new Ship(4),
      new Ship(3),
      new Ship(2),
      new Ship(1),
    ];

    ships.forEach((ship) => {
      board.placeShipRandomly(ship);
    });
  }

  checkMove(board, x, y) {
    if (board[x][y] === 'missed') return false;
    if (board[x][y] === 'four') return false;
    return true;
  }

  playerMove(x, y) {
    if (!this.checkMove(this.computerBoard.board, x, y)) return 'invalid';
    return this.computerBoard.receiveAttack(x, y);
  }

  computerMove() {
    let x = Math.floor(Math.random() * this.size);
    let y = Math.floor(Math.random() * this.size);

    while (
      this.playerBoard.board[x][y] === 'missed' ||
      this.playerBoard.board[x][y] === 'four' ||
      this.playerBoard.board[x][y] === 'sunk' ||
      this.playerBoard.moveRecord[x][y]
    ) {
      x = Math.floor(Math.random() * this.size);
      y = Math.floor(Math.random() * this.size);
    }

    this.playerBoard.moveRecord[x][y] = true;

    return { result: this.playerBoard.receiveAttack(x, y), x, y };
  }
}
