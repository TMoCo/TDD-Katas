import assert from 'assert';
import TicTacToe from '../src/TicTacToe';

const gameStates = [
  [
    [0, 0],
    [0, 1],
  ],
];

function advanceGameToState(game: TicTacToe, state: number[][]) {
  for (const move of state) {
    game.nextMove(move[0], move[1]);
  }
}

describe('Game of tic tac toe', () => {
  it('initialises a board and an array of moves', () => {
    const game = new TicTacToe();

    assert(game.board);
    assert(game.moves);
  });

  describe('Player moves', () => {
    it("Processes a player's next move", () => {
      const game = new TicTacToe();
      advanceGameToState(game, gameStates[0]);

      assert.deepEqual(game.moves[0], [0, 0]);
      assert.deepEqual(game.moves[1], [0, 1]);
    });

    it('Keeps track of the number of turns played', () => {
      const game = new TicTacToe();
      advanceGameToState(game, gameStates[0]);

      assert.strictEqual(game.turnsPlayed(), 2);
    });

    it('Throws an error when placing a token on an occupied board place', () => {
      const game = new TicTacToe();
      const error = new Error('Invalid move - Board place already occupied!'); 
      advanceGameToState(game, gameStates[0]);
      
      assert.throws(
        () => { game.nextMove(0, 0) },
        error
      )
    })
  });

  describe('The board', () => {
    it('creates an empty board', () => {
      const game = new TicTacToe();

      game.board.flat().forEach((el) => {
        assert.equal(el, '#');
      });
    });

    it('Places a nought at the correct position', () => {
      const game = new TicTacToe();
      advanceGameToState(game, gameStates[0]);

      assert.strictEqual(game.board[0][0], 'O');
    });

    it('Places a cross at the correct position', () => {
      const game = new TicTacToe();
      advanceGameToState(game, gameStates[0]);

      assert.strictEqual(game.board[0][1], 'X');
    });
  });
});
