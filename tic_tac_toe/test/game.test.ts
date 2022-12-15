import assert from 'assert';
import TicTacToe, {
  InvalidMoveError,
  BoardState,
  Move,
  MAX_MOVES,
} from '../src/TicTacToe';

const gameStates: Move[][] = [
  // two moves
  [
    [0, 0],
    [0, 1],
  ],
  // fast victory (vertical)
  [
    [0, 0],
    [0, 1],
    [1, 0],
    [0, 2],
    [2, 0],
  ],
  // fast victory (horizontal)
  [
    [0, 0],
    [1, 0],
    [0, 1],
    [2, 0],
    [0, 2],
  ],
  // fast victory (diagonal)
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 0],
    [2, 2],
  ],
  // draw
  [
    [2, 0],
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 2],
    [1, 1],
    [2, 1],
    [2, 2],
  ],
];

function advanceGameToState(game: TicTacToe, state: Move[]) {
  for (const move of state) {
    game.nextMove(move);
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

    describe('Detect invalid moves', () => {
      it('Throws an error when placing a token on an occupied board place', () => {
        const game = new TicTacToe();
        const error = new InvalidMoveError('Board place already occupied!');
        advanceGameToState(game, gameStates[0]);

        assert.throws(() => {
          game.nextMove([0, 0]);
        }, error);
      });

      it('Throws an error when placing a token on an invalid board place', () => {
        const game = new TicTacToe();
        const error = new InvalidMoveError('Move index out of bounds!');
        advanceGameToState(game, gameStates[0]);

        assert.throws(() => {
          game.nextMove([100000, 0]);
        }, error);
      });

      it('Throws an error when placing a token when not in a PLAY state', () => {
        const game = new TicTacToe();
        const error = new InvalidMoveError('Game is over!');
        advanceGameToState(game, gameStates[1]);

        assert.throws(() => {
          game.nextMove([2, 2]);
        }, error);
      });
    });
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

  describe('Player won', () => {
    it('Does not detect a win when a game is still in progress', () => {
      const game = new TicTacToe();
      advanceGameToState(game, gameStates[0]);

      assert(!game.won());
      assert.strictEqual(game.state, BoardState.PLAY);
    });

    it('Detects a win when a player has three identical tokens vertically', () => {
      const game = new TicTacToe();
      advanceGameToState(game, gameStates[1]);

      assert(game.won());
      assert.strictEqual(game.state, BoardState.WIN);
    });

    it('detects when a player has three identical tokens horizontally', () => {
      const game = new TicTacToe();
      advanceGameToState(game, gameStates[2]);

      assert(game.won());
      assert.strictEqual(game.state, BoardState.WIN);
    });

    it('detects when a player has three identical tokens diagonally', () => {
      const game = new TicTacToe();
      advanceGameToState(game, gameStates[3]);

      assert(game.won());
      assert.strictEqual(game.state, BoardState.WIN);
      assert.strictEqual;
    });
  });

  describe('Players draw', () => {
    it('detects when a board is in a draw state', () => {
      const game = new TicTacToe();
      advanceGameToState(game, gameStates[4]);

      assert.strictEqual(game.moves.length, MAX_MOVES);
      assert.strictEqual(game.state, BoardState.DRAW);
    });
  });
});
