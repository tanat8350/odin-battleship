import Ship from './ship.js';
import Gameboard from './gameboard.js';

export default class Player {
  constructor(size) {
    this.playerBoard = new Gameboard(size);
    this.computerBoard = new Gameboard(size);
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

  checkMove(player, x, y) {
    if (player.board[x][y] === 'missed') return false;
    if (player.board[x][y] === 'four') return false;
    if (player.moveRecord[x][y]) return false;
    return true;
  }

  playerMove(x, y) {
    if (!this.checkMove(this.computerBoard, x, y)) return 'invalid';
    this.computerBoard.moveRecord[x][y] = true;
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
