import p5 from 'p5';
import random from 'random';

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

  calculateLength() {
    this.maxLength = p5.Vector.sub(this.start.position, this.end.position).mag()
    this.minLength = this.maxLength / 10
  }

  contract() {
    this.velocity = new p5.Vector(0)
    this.acceleration = new p5.Vector(-this.strength * 0.2)
  }

  extend() {
    this.velocity = new p5.Vector(0)
    this.acceleration = new p5.Vector(this.strength* 0.2)
  }

  update() {
    this.velocity.add(this.acceleration)
    this.extension.add(this.velocity)

    // this.applyForcesToJoints()
    
    if( (this.extension.x < this.minLength) && this.acceleration.x < 0) {
      this.extend()
    } else if (this.extension.x > this.maxLength && this.acceleration.x > 0) {
      this.contract()
    }
  }

 
  getForce2Start(med) {
    var force = this.acceleration.x > 0 ? p5.Vector.sub(this.start.position, med)
     :  p5.Vector.sub(med, this.start.position);
    // Distance between objects       
    // var distance = force.mag();
    // Limiting the distance to eliminate "extreme" results for very close or very far objects                            
   // distance = constrain(distance, 5, 25);
    // Normalize vector (distance doesn't matter here, we just want this vector for direction)                                  
    force.normalize();
    force.limit(0.02);
    // Calculate gravitional force magnitude  
    //var strength = (this.G * this.mass * m.mass) / (distance * distance);
    // Get force vector --> magnitude * direction
    //force.mult(strength);
    return force;
  }

  getForce2End(med) {
    var force = this.acceleration.x <0 ? p5.Vector.sub(this.end.position, med)
    :  p5.Vector.sub(med, this.end.position);
   // Distance between objects       
   // var distance = force.mag();
   // Limiting the distance to eliminate "extreme" results for very close or very far objects                            
  // distance = constrain(distance, 5, 25);
   // Normalize vector (distance doesn't matter here, we just want this vector for direction)                                  
   force.normalize();
   force.limit(0.02);
   // Calculate gravitional force magnitude  
   //var strength = (this.G * this.mass * m.mass) / (distance * distance);
   // Get force vector --> magnitude * direction
   //force.mult(strength);
   return force;
  }

  applyForcesToJoints() {
    // this.calculateLength()
    // const distance = this.start.position.dist(this.end.position)
    // const half = distance/2
     const mediumPointX =((this.start.position.x - this.end.position.x) / 2) 
     const mediumPointY =((this.start.position.y - this.end.position.y) / 2) 

     const halfVector = new p5.Vector(mediumPointX, mediumPointY)

     const force = this.getForce2Start(halfVector)
     const forceEnd = this.getForce2End(halfVector)
    

    this.start.applyForce(force)
    this.end.applyForce(forceEnd)
  }

  connectStart(joint) {
    this.start = joint
  }

  connectEnd(joint) {
    this.end = joint
  }
}