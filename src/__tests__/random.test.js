import { randomNumber, randomCharacter, getRandomSlots } from '../random.js'

import { reelOptions } from '../reel.js'

it('Returns a random number', () => {
  expect(randomNumber()).toBeDefined()
})

it('Should return a number at least higher than 0', () => {
  expect(randomNumber()).toBeGreaterThanOrEqual(0)
})

it('Should return a number equal or below 4', () => {
  expect(randomNumber()).toBeLessThanOrEqual(4)
})

it('Should have returned many numbers within our range', () => {
  /**
   * Here we want to generate at least 200 numbers so we get a good
   * idea that we are actually within our range of 0-4
   */
  const count = 200
  let withinRange = true
  for (let index = 0; index < count; index++) {
    const number = randomNumber()
    if (number > 0 && number > 4) {
      // The number is not within our range so lets just break out the loop now
      withinRange = false
      break
    }
  }

  expect(withinRange).toBe(true)
})

it('Should return a random characters', () => {
  expect(randomCharacter()).toBeDefined()
})

it('Should return a random character between A and E', () => {
  /**
   * Here we want to generate at least 200 characters so we get a good
   * idea that we are actually within our range of A to E
   */
  const count = 200
  let withinRange = true
  for (let index = 0; index < count; index++) {
    const character = randomCharacter()
    if (reelOptions.indexOf(character) === -1) {
      // We are not within our range of A-E
      withinRange = false
      break
    }
  }

  expect(withinRange).toBe(true)
})

it('Should be defined', () => {
  expect(getRandomSlots).toBeDefined()
})

it('Should return something', () => {
  expect(getRandomSlots()).toBeDefined()
})

it('Should return a default of 4 slots', () => {
  expect(getRandomSlots().length).toEqual(4)
})

it('Should return 2 slots', () => {
  expect(getRandomSlots(2).length).toEqual(2)
})

it('Should return 4 slots, each slot within range', () => {
  const result = getRandomSlots(4)
  let withinRange = true
  for (let index = 0; index < result.length; index++) {
    const element = result[index]
    if (reelOptions.indexOf(element) === -1) {
      withinRange = false
      break
    }
  }
  expect(withinRange).toBe(true)
})
