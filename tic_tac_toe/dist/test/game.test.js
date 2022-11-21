"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const TicTacToe_1 = __importDefault(require("../src/TicTacToe"));
describe('Game of tic tac toe', () => {
    it('creates an empty board', () => {
        const game = new TicTacToe_1.default();
        game.board.forEach((cell) => {
            assert_1.default.equal(cell, '#');
        });
    });
});
//# sourceMappingURL=game.test.js.map