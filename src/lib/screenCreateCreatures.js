
import { createRandomCreature } from './createCreatures'
import { drawCreature, drawSquareAround } from './drawCreature'

let creatures = []
let cbClick = () => {}

const rows = 25
const cols = 25
const sizeColRow = 45
const boardMargin = 50

export const init = (p) => {
  for (var i = 0; i < 625; i++) {
    creatures.push(createRandomCreature())
  }
}

const getCreatureIndexByMouse = (p) => {
  const mouseX = p.mouseX - boardMargin
  const mouseY = p.mouseY - boardMargin
  
  const creaturePosX = Math.ceil(mouseX / sizeColRow)
  const creaturePosY = Math.floor(mouseY / sizeColRow)

  const index = creaturePosX + (creaturePosY * cols) - 1 ;
  return index
}

const highlightCreature = (index) => {
  for(var i = 0; i < creatures.length; i++) {
    creatures[i].highlighted = false
  }
  if (creatures[index]) {
    creatures[index].highlighted = true
  }
}

export const mouseMoved = (p) => {
  const index = getCreatureIndexByMouse(p)
  highlightCreature(index)
}

export const mouseClicked = (p ) => {
  const index = getCreatureIndexByMouse(p)
  if(creatures[index]) {
    cbClick(creatures[index])
  }
}

export const onClick = (cb) => {
  cbClick = cb
}

export const render = (p) => {
  p.translate(boardMargin, boardMargin)
  let index = 0
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      const x = j * sizeColRow 
      const y = i * sizeColRow
      //p.translate(0,0)
      drawSquareAround(p, x, y, creatures[index], 30, 30, 10)
      drawCreature(p, x, y, creatures[index], 30, 30, 10)
      // Reset
      p.fill(134, 134, 134) 
      
      if (creatures[index].highlighted) {
        p.stroke(55, 55, 55);
        p.square(x, y, 40)
      }
      index++
    }
  }
}