import { drawCreature } from './drawCreature'

const init = (creature) => (p) => {
  // Nothing
}
const render = (creature) => (p) => {
  p.translate(50, 50)
  drawCreature(p, 10, 10, creature, 300, 300, 10)
}

export const forCreature = (creature) =>  {
  return {
    init: init(creature),
    render: render(creature)
  }
}