
export const drawCreature = (p, x, y, creature, sizeX, sizeY, padding) => {
  p.fill(255, 204, 100);
  if (creature.hasProblem) {
    p.fill(155, 155, 100);
  }
  p.rect(x, y, sizeX + padding, sizeY + padding)
  p.fill(255, 204, 0);

  const origX = x + padding /2
  const origY = y  + padding /2

  creature.muscles.forEach(muscle => {
    const jointStart = muscle.start
    const jointStartX = (sizeX * jointStart.position.x) / 100
    const jointStartY = (sizeY * jointStart.position.y) / 100

    const jointEnd = muscle.end
    const jointEndX = (sizeX * jointEnd.position.x) / 100
    const jointEndY = (sizeY * jointEnd.position.y) / 100

    p.stroke(Math.ceil(muscle.strength * 255) , Math.ceil(muscle.strength * 255), Math.ceil(muscle.strength * 255));
    const strokeWeight = (sizeX * 5 ) / 100
    p.strokeWeight(strokeWeight)
    p.line(origX + jointStartX, origY + jointStartY,  origX + jointEndX, origY + jointEndY)
  })

  p.stroke(0, 0, 0);
  // Reset
  p.strokeWeight(1)

  creature.joints.forEach(joint => {
    const jointX = (sizeX * joint.position.x) / 100
    const jointY = (sizeY * joint.position.y) / 100
    p.fill(Math.ceil(joint.friction * 255), Math.ceil(joint.friction * 255), Math.ceil(joint.friction * 255))
    p.circle(origX + jointX, origY + jointY, (sizeX * 5)/ 100)
  })

}
