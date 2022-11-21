import assert from 'assert';
import TicTacToe from '../src/TicTacToe';

describe('Game of tic tac toe', () => {
  it('creates an empty board', () => {
    const game = new TicTacToe();

    game.board.forEach((cell) => {
      assert.equal(cell, '#');
    });
  });
});
