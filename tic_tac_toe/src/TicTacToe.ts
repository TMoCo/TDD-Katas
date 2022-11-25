export default class TicTacToe {
  readonly moves: number[][];
  readonly board: string[][];

  constructor() {
    this.moves = [];
    this.board = Array<string>(3)
      .fill('#')
      .map(() => Array<string>(3).fill('#'));
  }

  getCurrentPlayerToken(): string {
    return this.turnsPlayed() & 1 ? 'O' : 'X';
  }

  nextMove(row: number, col: number): void {
    if (this.board[row][col] !== '#') {
      throw new Error('Invalid move - Board place already occupied!');
    }
    
    this.moves.push([row, col]);
    this.board[row][col] = this.getCurrentPlayerToken();
  }

  turnsPlayed(): number {
    return this.moves.length;
  }
}
