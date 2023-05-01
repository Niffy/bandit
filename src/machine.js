import { checkSlots } from './rules.js'
import { constants, costPerPlay } from './constants.js'
import { getRandomSlots } from './random.js'

/**
 * This class handles the slot machine process. i.e tie everything together
 *
 */
export class Machine {
  /**
   * Create an instance of the machine
   * @param {Number} startingBalance The starting balance of the user, using GBP pennies eg 20 = 20p, 200 - £2, defaults to 0
   */
  constructor (startingBalance = 0) {
    this.userBalance = startingBalance
    this.balance = 2000
  }

  handleResult (result) {

  }

  /**
   * Handle subtracting the cost of play from the users
   * @returns {Boolean} if the subtraction worked
   */
  userSubtract () {
    if (this.userBalance < costPerPlay) {
      return false
    }
    this.userBalance -= costPerPlay
    return true
  }

  /**
   * Check the user can do a spin by checking the user balance
   * @returns {Boolean} True if they have enoug credit, false if not
   */
  canExecute () {
    if (this.userBalance === 0 || this.userBalance < costPerPlay) {
      return false
    }
    return true
  }

  /**
   * Get the user balance
   * @returns {Number} The user balance using GBP pennies eg 20 = 20p, 200 - £2
   */
  getUserBalance () {
    return this.userBalance
  }

  /**
   * Spin the machine
   * @returns {Object}
   */
  execute () {
    // Determine the user has enough credit to play
    if (this.canExecute()) {
      // Go and do the subtraction from the user balance
      this.userSubtract()
      // Get the random slots
      const slots = getRandomSlots()
      // Check the result
      const ruleResult = checkSlots(slots)
      // Go and handle the result and do any extra processing such as awarding money or increasing balance
      const result = this.handleResult(ruleResult)
    } else {
      return constants.USER_BALANCE_ZERO
    }
  }
}
