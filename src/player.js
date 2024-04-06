import Ship from './ship.js';
import Gameboard from './gameboard.js';

export default class Player {
  constructor(size) {
    // oppName, size
    this.playerBoard = new Gameboard('Computer', size);
    this.computerBoard = new Gameboard('Player', size);
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
    return true;
  }

  playerMove(x, y) {
    if (!this.checkMove(this.computerBoard.board, x, y))
      throw new Error('invalid move');
    return this.computerBoard.receiveAttack(x, y);
  }

  computerMove() {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);

    while (this.playerMove.board[x][y] === 'missed') {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }

    this.computerBoard.receiveAttack(x, y);
  }
}
