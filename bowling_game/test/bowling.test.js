import TenPinBowling from '../src/bowling';

const bowlingFrames = [
  [9, 1, 2, 4, 2, 8, 10, 10],
  [10, 10, 10, 10, 10, 10, 10, 10, 10],
  [10, 10, 10, 10, 10, 10, 10, 10, 10, 2, 8, 10],
];

const throwBolwingBall = (game, throws) => {
  for (const pins of throws) {
    game.throw(pins);
  }
};

describe('Ten Pin Bowling', () => {
  it('Initialises a 10 frame game of bowling', () => {
    const game = new TenPinBowling();

    expect(game.frames.length).toEqual(10);
  });

  it('Determines the correct scoring at the end of the game', () => {
    const game = new TenPinBowling();
    throwBolwingBall(game, bowlingFrames[2]);
    expect(game.getScore()).toEqual(272);
  });

  describe('Generic Frames', () => {
    it('Gives the player two throws if not getting a strike', () => {
      const game = new TenPinBowling();

      throwBolwingBall(game, bowlingFrames[0]);
      game.printFrames();

      expect(game.currentFrame).toEqual(4);
      expect(game.frames[0]).toEqual({ throws: 2, pins: 10 });
      expect(game.frames[1]).toEqual({ throws: 2, pins: 6 });
      expect(game.frames[2]).toEqual({ throws: 2, pins: 10 });
      game.printFrames();
    });

    it('Gives the player one throw when getting a strike', () => {
      const game = new TenPinBowling();
      throwBolwingBall(game, bowlingFrames[0]);
      expect(game.frames[3].throws).toEqual(1);
    });
  });

  describe('Final Frame', () => {
    it('Gives the player three throws when getting a spare', () => {
      const game = new TenPinBowling();
      throwBolwingBall(game, bowlingFrames[1]);
      game.throw(9);
      game.throw(1);
      expect(game.currentFrame).toEqual(9);
      game.throw(10);
      const lastFrame = game.frames.at(-1);
      expect(lastFrame.throws).toEqual(3);
      expect(lastFrame.pins).toEqual(20);
    });

    it('Gives the player three throws when getting a strike', () => {
      const game = new TenPinBowling();
      throwBolwingBall(game, bowlingFrames[1]);
      game.throw(10);
      game.throw(10);
      game.throw(10);
      expect(game.currentFrame).toEqual(9);
      const lastFrame = game.frames.at(-1);
      expect(lastFrame.pins).toEqual(30);
      expect(lastFrame.throws).toEqual(3);
    });

    it('Gives the player two throws when not getting a strike or spare', () => {
      const game = new TenPinBowling();
      throwBolwingBall(game, bowlingFrames[1]);
      game.throw(0);
      game.throw(0);
      expect(game.currentFrame).toEqual(9);
      const lastFrame = game.frames.at(-1);
      expect(lastFrame.pins).toEqual(0);
      expect(lastFrame.throws).toEqual(2);
    });
  });
});
