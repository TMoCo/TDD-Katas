export type Move = number[];

export enum BoardState {
  PLAY = 'PLAY',
  DRAW = 'DRAW',
  WIN = 'WIN',
}

export const MAX_MOVES: number = 9;

function checkDiagonals(board: string[][]): boolean {
  const won =
    (board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
    (board[0][2] === board[1][1] && board[1][1] === board[2][0]);

  return won && board[1][1] !== '#';
}

function checkRowColPair(board: string[][], index: number): boolean {
  const wonRow =
    board[index][0] === board[index][1] && board[index][1] === board[index][2];
  const wonCol =
    board[0][index] === board[1][index] && board[1][index] === board[2][index];

  return (wonRow || wonCol) && board[index][index] !== '#';
}

export default class TicTacToe {
  readonly moves: Move[];
  readonly board: string[][];
  state: BoardState;

  constructor() {
    this.moves = [];
    this.board = Array<string>(3)
      .fill('#')
      .map(() => Array<string>(3).fill('#'));
    this.state = BoardState.PLAY;
  }

  getCurrentPlayerToken(): string {
    return this.turnsPlayed() & 1 ? 'O' : 'X';
  }

  nextMove(move: Move): void {
    if (this.state !== BoardState.PLAY) {
      throw new Error('Invalid move - game is over!');
    }

    if (this.board[move[0]][move[1]] !== '#') {
      throw new Error('Invalid move - Board place already occupied!');
    }

    this.moves.push(move);
    this.board[move[0]][move[1]] = this.getCurrentPlayerToken();

    if (!this.won() && this.moves.length === MAX_MOVES) {
      this.state = BoardState.DRAW;
    }
  }

  turnsPlayed(): number {
    return this.moves.length;
  }

  won(): boolean {
    for (const [index, _] of this.board.entries()) {
      if (checkRowColPair(this.board, index)) {
        this.state = BoardState.WIN;
        return true;
      }
    }

    if (checkDiagonals(this.board)) {
      this.state = BoardState.WIN;
      return true;
    }

    return false;
  }
}
