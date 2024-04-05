import Ship from './ship';
import Gameboard from './gameboard';
import Player from './player';

// describe('Player', () => {
//   const player1 = new Player();
//   player1.computerMove();

//   test('computerMove', () => {
//     expect(player1.computerBoard).toEqual(
//       expect.arrayContaining([expect.arrayContaining('missed')])
//     );
//   });
// });

describe('Gameboard', () => {
  const ship2 = new Ship(5);
  const gameboard2 = new Gameboard();
  gameboard2.placeShip(ship2, 5, 5);

  test('placeShip 5 5', () => {
    expect(gameboard2.board[5][5]).toMatchObject({ length: 5 });
  });

  test('placeShip invalid x', () => {
    expect(() => gameboard2.placeShip(ship2, 10, 0)).toThrow();
  });

  test('placeShip invalid y', () => {
    expect(() => gameboard2.placeShip(ship2, 0, 6)).toThrow();
  });

  gameboard2.receiveAttack(4, 4);
  test('receive attack 4 4 missed', () => {
    expect(gameboard2.board[4][4]).toBe('missed');
  });

  gameboard2.receiveAttack(5, 5);
  test('receive attack 5 5 hitCount 1', () => {
    expect(gameboard2.board[5][5]).toMatchObject({ hitCount: 1 });
  });

  test('isAllSunk false', () => {
    expect(gameboard2.isAllSunk()).toBe(false);
  });

  test('isAllSunk false 2 ships', () => {
    gameboard2.receiveAttack(5, 5);
    gameboard2.receiveAttack(5, 5);
    gameboard2.receiveAttack(5, 5);
    expect(gameboard2.isAllSunk()).toBe(false);
  });

  test('isAllSunk true', () => {
    gameboard2.receiveAttack(5, 6);
    // gameboard2.receiveAttack(5, 5);
    // gameboard2.receiveAttack(5, 5);
    expect(gameboard2.isAllSunk()).toBe(true);
  });
});

describe('Ship', () => {
  const ship1 = new Ship(5);

  test('ship hit', () => expect(ship1.hit()).toBe(1));
  test('isSunk false 1 hit', () => expect(ship1.isSunk()).toBe(false));

  test('add 4 hits', () => {
    ship1.hit();
    ship1.hit();
    ship1.hit();
    ship1.hit();
  });

  test('isSunk true', () => expect(ship1.isSunk()).toBe(true));
});
