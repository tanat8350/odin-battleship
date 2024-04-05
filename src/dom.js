import Player from './player';

const gridBoard = document.querySelectorAll('.grid-board');

const dom = (function () {
  const size = 10;
  const game = new Player(size);
  const initBoard = () => {
    const gridSize = 30;

    for (let board of gridBoard) {
      for (let i = 0; i <= size; i++) {
        for (let j = 0; j <= size; j++) {
          if (!i && !j) {
            const blankGrid = document.createElement('div');
            board.appendChild(blankGrid);
          } else if (!i) {
            const colLetter = document.createElement('div');
            colLetter.classList.add('col-letter');
            colLetter.textContent = String.fromCharCode(65 + j - 1);
            board.appendChild(colLetter);
          } else if (!j) {
            const rowLetter = document.createElement('div');
            rowLetter.classList.add('row-letter');
            rowLetter.textContent = i;
            board.appendChild(rowLetter);
          } else {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.setAttribute('data-x', i - 1);
            gridItem.setAttribute('data-y', j - 1);
            board.appendChild(gridItem);
          }
        }
      }
      board.style.gridTemplateColumns = `repeat(${size + 1}, ${gridSize}px)`;
      board.style.gridAutoRows = `${gridSize}px`;
    }
  };
  initBoard();

  game.initBoardRandomly(game.playerBoard);
  game.initBoardRandomly(game.computerBoard);

  const renderShip = () => {
    game.playerBoard.board.forEach((row, x) => {
      row.forEach((col, y) => {
        if (col) {
          const grid = document.querySelector(
            `.player-board .grid-item[data-x="${x}"][data-y="${y}"]`
          );
          if (col === 'no-placed') {
            grid.classList.add('no-placed');
          } else {
            grid.classList.add('ship');
          }
        }
      });
    });
  };

  renderShip();

  const renderShipCom = () => {
    game.computerBoard.board.forEach((row, x) => {
      row.forEach((col, y) => {
        if (col) {
          const grid = document.querySelector(
            `.computer-board .grid-item[data-x="${x}"][data-y="${y}"]`
          );
          if (col === 'no-placed') {
            grid.classList.add('no-placed');
          } else {
            grid.classList.add('ship');
          }
        }
      });
    });
  };
  renderShipCom();
  const computerBoard = document.querySelector('.computer-board .grid-board');
  computerBoard.addEventListener('click', (e) => {
    const target = e.target;
    const result = game.playerMove(target.dataset.x, target.dataset.y);

    if (result === 'sunk') target.classList.add('sunk');

    if (result > 0) target.classList.add('hit');
    if (result === 'missed') target.classList.add('missed');
  });
})();
