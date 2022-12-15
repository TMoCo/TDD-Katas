import TicTacToe, { Move, BoardState, MAX_MOVES } from './TicTacToe';

const moves: Move[] = [
  [0, 0],
  [0, 1],
  [1, 1],
  [0, 2],
  [2, 2],
  [3, 0],
];

const game = new TicTacToe();

try {
  for (const [index, move] of moves.entries()) {
    if (game.state == BoardState.WIN) {
      console.log('Congratulations to player ' + (index & 1));
      break;
    }
    game.nextMove(move);
  }
} catch (error) {
  console.error(error.message);
}

game.printBoard();
