import { drawCreature } from './drawCreature'
import * as gravity from './environment/gravity'

let cbClick = () => {}

const applyForces = (creature) => {
  gravity.apply(creature)
}

const drawnEnvironment = (p) => {
  p.fill(107,147,226) // Blue
  p.rect(0, 0, p.width , p.height - 500)

  p.fill(105, 75, 29) // Brown
  p.rect(0, p.height - 500, p.width, 500)
}

const init = (creature) => (p) => {
  // Nothing
}


const render = (creature) => (p) => {
  drawnEnvironment(p)

  p.fill(0,0,0,0)
  p.stroke(255,255,255)
  p.rect(20, 20, 100, 50)
  p.textSize(32);
  p.text('Back', 30, 50);
  p.translate(30, 80)

  applyForces(creature)
  creature.update()
  drawCreature(p, 10, 10, creature, 300, 300, 10)
  creature.checkEdges(300)
}

const mouseClicked  = (p) => {
  const x = p.mouseX
  const y = p.mouseY
  
  if (x > 20 && x < 120 && y > 20 && y < 70 ) {
    cbClick()
  }
}

export const onClick = (cb) => {
  cbClick = cb
}

export const forCreature = (creature) =>  {
  return {
    init: init(creature),
    render: render(creature),
    mouseClicked: mouseClicked
  }
}