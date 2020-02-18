import p5 from 'p5'
import random from 'random'

export default class Muscle {
  constructor() {
    this.moving = false
    this.start = null
    this.end = null
    this.strength = 0
    this.extension = new p5.Vector(0)
    this.contracting = false
    this.maximumContraction = 0.3
    this.maximumExpansion = 1
    this.velocity = new p5.Vector(0)
    this.acceleration = new p5.Vector(0)
  }

  setExtension(p) {
    if (p < this.maximumContraction) {
      this.extension = new p5.Vector(this.maximumContraction * 100)
    } else {
      this.extension = new p5.Vector(p * 100)
    }
  }

  setPos(pos) {
    this.pos = pos
  }

  setStrength(numb) {
    this.strength = numb
    this.velocity = new p5.Vector()
    this.setExtension(1)
    this.contract()
  }

  setInitialLength() {
    const length = this.calculateLength()
    this.maxLength = 0.7 * length
    this.minLength = length / 10
  }

  calculateLength() {
    return p5.Vector.dist(this.start.position, this.end.position)
  }

  contract() {
    this.velocity = new p5.Vector(0)
    this.acceleration = new p5.Vector(-this.strength * 0.2)
  }

  extend() {
    this.velocity = new p5.Vector(0)
    this.acceleration = new p5.Vector(this.strength * 0.2)
  }

  update() {
    this.velocity.add(this.acceleration)
    this.extension.add(this.velocity)

    const length = this.calculateLength() 
    // cosnst length = this.extension.x
    console.log(length, this.minLength, this.maxLength)
    if ( length <= this.minLength) {
      this.extend()
    } else if (length  >= this.maxLength) {
      this.contract()
    }
    this.applyForcesToJoints()
  }

  getForce2Start(med) {
    var force =
      this.acceleration.x < 0
        ? p5.Vector.sub(this.end.position, this.start.position)
        : p5.Vector.sub(this.start.position, this.end.position)
    // Distance between objects
    // var distance = force.mag();
    // Limiting the distance to eliminate "extreme" results for very close or very far objects
    // distance = constrain(distance, 5, 25);
    // Normalize vector (distance doesn't matter here, we just want this vector for direction)
    force.normalize()
    //force.limit(0.02)
    // Calculate gravitional force magnitude
    //var strength = (this.G * this.mass * m.mass) / (distance * distance);
    // Get force vector --> magnitude * direction
    //force.mult(strength);
    return force
  }

  getForce2End(med) {
    var force =
      this.acceleration.x > 0
        ? p5.Vector.sub(this.end.position, this.start.position)
        : p5.Vector.sub(this.start.position, this.end.position)
    // Distance between objects
    // var distance = force.mag();
    // Limiting the distance to eliminate "extreme" results for very close or very far objects
    // distance = constrain(distance, 5, 25);
    // Normalize vector (distance doesn't matter here, we just want this vector for direction)
    force.normalize()

    // Calculate gravitional force magnitude
    //var strength = (this.G * this.mass * m.mass) / (distance * distance);
    // Get force vector --> magnitude * direction
    //force.mult(strength);
    return force
  }

  applyForcesToJoints() {
    // const mediumPointX = (this.start.position.x - this.end.position.x) / 2
    // const mediumPointY = (this.start.position.y - this.end.position.y) / 2

    // const halfVector = new p5.Vector(mediumPointX, mediumPointY)

    const force = this.getForce2Start()
    const forceEnd = this.getForce2End()
    // this.start.applyMuscleForce(force)
    // this.end.applyMuscleForce(forceEnd)

    // const length = this.calculateLength()

    // if (length > this.maxLength) {

    // }

    this.start.applyMuscleForce(
      force,
      this.end.position.copy(),
      this.maxLength,
      Math.floor(this.maxLength / 2)
    )
    this.end.applyMuscleForce(
      forceEnd,
      this.start.position.copy(),
      this.maxLength,
      Math.floor(this.maxLength / 2)
    )
  }

  connectStart(joint) {
    this.start = joint
  }

  connectEnd(joint) {
    this.end = joint
  }
}
