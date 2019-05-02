export default class Muscle {
  constructor() {
    this.moving = false
    this.start = null
    this.end = null
  }

  setPos(pos) {
    this.pos = pos
  }

  connectStart(joint) {
    this.start = joint
  }

  connectEnd(joint) {
    this.end = joint
  }
}