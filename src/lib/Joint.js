import p5 from 'p5'

export default class Joint {
  constructor() {
    this.position = new p5.Vector(0, 0)
    this.friction = 0
    this.connections = []
    this.mass = 10
    this.acceleration = new p5.Vector(0, 0)
    this.velocity = new p5.Vector(0, 0)
  }

  setPosition(pos) {
    this.position = new p5.Vector(pos.x, pos.y)
  }

  setFriction(fr) {
    this.friction = fr
  }

  connect(muscle) {
    this.connections.push(muscle)
  }

  applyForce(force, add) {
    let f = p5.Vector.div(force, this.mass)
    this.acceleration.add(f)
  }

  update() {
    // Velocity changes according to acceleration
    this.velocity.add(this.acceleration)
    // position changes by velocity
    this.position.add(this.velocity)
    // We must clear acceleration each frame
    this.acceleration.mult(0)
  }
}
