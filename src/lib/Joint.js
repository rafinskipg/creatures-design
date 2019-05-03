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

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass)
    this.acceleration.add(f)
  }

  applyMuscleForce(force, otherPoint, maxDistance, minDistance) {
    this.velocity.add(force)
  
    this.position.add(this.velocity)
    const distance = p5.Vector.dist(this.position, otherPoint)
    const lessThanMinimum =  distance <= minDistance
    const moreThanMaximum = distance  >= maxDistance
    if (lessThanMinimum || moreThanMaximum) {
      console.log('avoid')
      this.position.sub(this.velocity)
      this.velocity.sub(force)
    }

  }

  update() {
    // Velocity changes according to acceleration
    this.velocity.add(this.acceleration)
    // position changes by velocity
    this.position.add(this.velocity)
    // We must clear acceleration each frame
    this.acceleration.mult(0)

    if (this.position.y === 0) {
      // Apply friction

      // Get angle of movement

      // Add friction as oposite force if movement is horizontal
    }
  }
}
