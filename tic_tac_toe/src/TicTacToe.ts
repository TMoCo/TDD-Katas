export default class TicTacToe {
  readonly turn: number[];
  readonly board: string[][];

  constructor() {
    this.turn = [];
    this.board = Array<string>(3)
      .fill('#')
      .map(() => Array<string>(3).fill('#'));

    console.log(this.board);
  }
}
