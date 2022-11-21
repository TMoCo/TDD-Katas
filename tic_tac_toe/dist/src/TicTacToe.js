"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TicTacToe {
    constructor() {
        this.turn = [];
        this.board = Array(3)
            .fill('#')
            .map(() => Array(3).fill('#'));
        console.log(this.board);
    }
}
exports.default = TicTacToe;
//# sourceMappingURL=TicTacToe.js.map