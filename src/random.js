/**
 * The options for the slot machine reel
 */
import { reelOptions } from './reel.js'

/**
 * Return a number between 0 and 4
 * @returns {Number} A number between 0 and 4
 */
export function randomNumber () {
  /**
   * First we get a larger random number, picking between 0 and 4 gives us a tiny range
   * and more likely to produce the same number
   */
  const large = Math.floor(Math.random() * (500 - 1)) + 1
  /**
   * If a number falls within these ranges then the index will be our random number
   * which we can then use to pick a character out of our reel options.
   * e.g a number of 88 will be index 0. 357 will be index 3
   */
  const range = [0, 100, 200, 300, 400, 500]
  for (let index = 0; index < range.length; index++) {
    if (large >= range[index] && large <= range[index + 1]) {
      return index
    }
  }
  return 0
}

/**
 * Get a random character between A and E, in upper case
 * @returns {String} The random character
 */
export function randomCharacter () {
  const index = randomNumber()
  return reelOptions[index]
}

/**
 * Get the reels for a slot machine
 * @param {Number} slotCount Number of slots to populate, defaults to 4
 * @returns {String[]} Array of strings that contains the characters for the slot machine
 */
export function getRandomSlots (slotCount = 4) {
  const slots = []
  for (let index = 0; index < slotCount; index++) {
    slots.push(randomCharacter())
  }
  return slots
}
