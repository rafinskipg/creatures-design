export default class Muscle {
  constructor(joints, muscles, hasProblem) {
    this.moving = false
    this.joints = joints
    this.muscles = muscles
    this.hasProblem = hasProblem
  }

  update() {
    this.muscles.forEach((muscle) => {
      muscle.update()
    })
    
    this.joints.forEach((joint) => {
      joint.update()
    })

  }

  checkEdges(height) {
    this.joints.forEach((joint) => {
      if (joint.position.y > (height - joint.mass * 8)) {
        // A little dampening when hitting the bottom
        joint.velocity.y *= -0.5;
        joint.position.y = (height - joint.mass * 8);
      }
    })
  }

}