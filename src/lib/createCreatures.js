import random from 'random'
import Joint from './Joint'
import Muscle from './Muscle'
import Creature from './Creature'

export const createRandomCreature = () => {
  const amountOfJoints = random.int(2, 6)
  const amountOfMuscles = random.int(amountOfJoints - 1, amountOfJoints * 2)

  const joints = []

  for (let i = 0; i < amountOfJoints; i++) {
    const j = new Joint()
    const friction = random.float(0, 1)
    j.setFriction(friction)
    joints.push(j)
  }

  const muscles = []

  let jointsAvailable = []

  const regenerate = () => {
    for (let i = 0; i < amountOfJoints; i++) {
      jointsAvailable.push(i)
    }
    jointsAvailable.sort(() => 0.5 - Math.random())
  }

  const getItem = () => {
    if (jointsAvailable.length > 0) {
      return jointsAvailable.pop()
    } else {
      regenerate()
      return getItem()
    }
  }

  regenerate()

  // Randomize the position of the joints initially
  const limitX = 100
  const limitY = 100

  for (let i = 0; i < amountOfJoints; i++) {
    joints[i].setPosition({
      x: random.int(0, limitX),
      y: random.int(0, limitY)
    })
  }

  // Connect the joints with muscles
  for (let i = 0; i < amountOfMuscles; i++) {
    const muscle = new Muscle()
    const strength = random.float(0, 1)
    muscle.setStrength(strength)
    const jointsForMuscle = [getItem(), getItem()]

    muscle.connectStart(joints[jointsForMuscle[0]])
    muscle.connectEnd(joints[jointsForMuscle[1]])

    muscle.setInitialLength()

    muscles.push(muscle)
  }

  // If any joint is left without muscle, is a problem
  const hasProblem = joints.reduce((prev, next) => {
    return (
      prev ||
      // The joint is not in any muscle
      !muscles.reduce(
        (prevM, nextM) => prevM || nextM.end === next || nextM.start === next,
        false
      )
    )
  }, false)

  return new Creature(joints, muscles, hasProblem)
}
