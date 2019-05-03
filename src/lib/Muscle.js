export default class Muscle {
  constructor() {
    this.moving = false
    this.start = null
    this.end = null
    this.strength = 0
  }

  setPos(pos) {
    this.pos = pos
  }

  setStrength(numb) {
    this.strength = numb
  }

  connectStart(joint) {
    this.start = joint
  }

  connectEnd(joint) {
    this.end = joint
  }
}