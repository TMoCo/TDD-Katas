export type Move = number[];

export enum BoardState {
  PLAY = 'PLAY',
  DRAW = 'DRAW',
  WIN = 'WIN',
}

export const MAX_MOVES: number = 9;

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
    this.board.forEach((row, index) => {
      if (
        row.every((el) => el === row[0]) ||
        (this.board[0][index] === this.board[1][index] &&
          this.board[1][index] === this.board[2][index])
      ) {
        if (row[index] !== '#') {
          this.state = BoardState.WIN;
        }
      }
    });

    if (
      (this.board[0][0] === this.board[1][1] &&
        this.board[1][1] === this.board[2][2]) ||
      (this.board[0][2] === this.board[1][1] &&
        this.board[1][1] === this.board[2][0])
    ) {
      if (this.board[1][1] !== '#') {
        this.state = BoardState.WIN;
      }
    }

    return this.state === BoardState.WIN;
  }
}
