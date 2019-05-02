import p5 from 'p5'
import { createRandomCreature } from './createCreatures'
import { drawCreature } from './drawCreature'

const creatures = []
export const init = () => {
  let sketch = function(p) {
    p.setup = function() {
      p.createCanvas(1200, 1200)

      for (var i = 0; i < 625; i++) {
        creatures.push(createRandomCreature())
      }

      // Setup done
    }

    p.draw = () => {
      p.background(51)
      p.translate(50, 50)
      let index = 0
      for (var i = 0; i < 25; i++) {
        for (var j = 0; j < 25; j++) {
          const x = j * 45 
          const y = i * 45
          //p.translate(0,0)
          drawCreature(p, x, y, creatures[index], 30, 30, 10)
          index++
        }
      }
    }
  }

  new p5(sketch, window.document.getElementById('canvas'))
}
