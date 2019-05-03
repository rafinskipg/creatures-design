import p5 from 'p5';

export const apply = (creature ) => {
  // Gravity is scaled by mass here!

  creature.joints.forEach((joint) => {
    let gravity = new p5.Vector(0, 0.1 * joint.mass);
    joint.applyForce(gravity);
  })
}