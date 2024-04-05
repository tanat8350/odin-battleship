import Ship from './ship.js';
import Gameboard from './gameboard.js';

export default class Player {
  constructor(size) {
    this.playerBoard = new Gameboard(size);
    this.computerBoard = new Gameboard(size);
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

// const player1 = new Player();
// player1.computerMove();
// player1.computerMove();
// player1.computerMove();
// console.log(player1.playerBoard);
// player1.playerMove(4, 4);
// player1.playerMove(4, 4);
// player1.playerMove(4, 5);
// player1.initBoardRandomly(player1.computerBoard);
// console.log(player1.computerBoard);
