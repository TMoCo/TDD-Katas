const MAX_FRAMES = 10;
const MAX_PINS = 10;

class Frame {
  constructor(throws = 0, pins = 0) {
    this.throws = throws;
    this.pins = pins;
  }
}

export default class TenPinBowling {
  constructor() {
    this.frames = Array.from({ length: MAX_FRAMES }, () => new Frame());
    // this.frames = new Array(MAX_FRAMES).fill(new Frame());
    // Array.fill will does not populate with clones of the object. Hence modifying the first element
    // will also modify all subsequent elements! This is avoided using Array.from and arrow functions
    this.currentFrame = 0;
  }

  shouldStartNewFrame = () => {
    const head = this.head();
    return (head.pins == MAX_PINS || head.throws == 2) && this.currentFrame != 9;
  };

  getScore = () => {
    return 0;
  }

  throw = (pins) => {
    if (this.shouldStartNewFrame()) {
      this.currentFrame++;
      this.frames[this.currentFrame] = new Frame(1, pins);
      return;
    }
    this.frames[this.currentFrame].throws++;
    this.frames[this.currentFrame].pins += pins;
  };

  head = () => {
    return this.frames.at(this.currentFrame);
  };

  printFrames = () => {
    for (const [index, frame] of this.frames.entries()) {
      console.debug(index, frame);
    }
  };
}
