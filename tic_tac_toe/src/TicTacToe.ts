export default class TicTacToe {
  constructor() {
    const turn: number[] = [];
    const board: string[][] = Array<string>(3)
      .fill('#')
      .map(() => Array<string>(3).fill('#'));
  }
}
