import { drawCreature } from './drawCreature'

let cbClick = () => {}

const init = (creature) => (p) => {
  // Nothing
}
const render = (creature) => (p) => {
  p.fill(0,0,0,0)
  p.stroke(255,255,255)
  p.rect(20, 20, 100, 50)
  p.textSize(32);
  p.text('Back', 30, 50);
  p.translate(30, 80)
  drawCreature(p, 10, 10, creature, 300, 300, 10)
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