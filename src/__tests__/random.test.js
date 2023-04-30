import { randomNumber } from '../random.js'

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
