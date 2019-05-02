export default class Joint {
  constructor() {
    this.pos = null
    this.connections = []
  }

  setPosition(pos) {
    this.position = pos
  }

  connect(muscle) {
    this.connections.push(muscle)
  }
}