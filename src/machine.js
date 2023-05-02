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
    if (result.value) {
      const canSubtract = this.canSubtractBalance(result.value)
      if (canSubtract) {
        // Take the money from the machine and give it to the user
        this.machineBalanceSubtract(result.value)
        return result.result
      } else {
        // Uh no, the machine does not have enough balance to payout
        // How much is the machine short by?
        const short = result.value - this.balance
        const difference = short / costPerPlay
        this.machineBalanceSubtract(this.balance)
        this.userBalanceAdd(difference)
      }
    } else {
      return constants.NO_RESULT
    }
  }

  /**
   * Can we subtract the given amount from the machine balance
   * @param {Number} value Value we want to extract from the machine balance
   * @returns {Boolean} True if we can subtract or false if there isn't a big enough balance
   */
  canSubtractBalance (value) {
    if (this.balance < value) {
      return false
    }
    return true
  }

  /**
   * Subtract an amount from the machine balance
   * @param {Number} amount Amount to subtract
   * @returns {Boolean} True if its able to subtract, false if not
   */
  machineBalanceSubtract (amount) {
    if (this.balance < amount) {
      return false
    }
    this.balance -= amount
    return true
  }

  /**
   * Add an amount to the machine balance
   * @param {Nunber} amount Amount to add
   */
  machineBalanceAdd (amount) {
    // Protect against negative values
    if (amount < 0) return
    this.balance += amount
  }

  /**
   * Handle subtracting the cost of play from the users
   * @returns {Boolean} if the subtraction worked
   */
  userBalanceSubtract () {
    if (this.userBalance < costPerPlay) {
      return false
    }
    this.userBalance -= costPerPlay
    return true
  }

  /**
   * Add an amount to the user balance
   * @param {Number} amount Amount to add to user balance
   */
  userBalanceAdd (amount) {
    // Protect against negative values
    if (amount < 0) return
    this.userBalance += amount
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
      this.userBalanceSubtract()
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
