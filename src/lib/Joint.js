export default class Joint {
  constructor() {
    this.pos = null
    this.friction = 0
    this.connections = []
  }

  setPosition(pos) {
    this.position = pos
  }

  setFriction(fr) {
    this.friction = fr
  }

  connect(muscle) {
    this.connections.push(muscle)
  }
}