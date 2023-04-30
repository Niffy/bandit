import { costPerPlay, rules, checkSlots } from './rules.js'
import { getRandomSlots } from './random.js'

export class Machine {
  constructor (startingPot) {
    this.userPot = startingPot
    this.balance = 2000
  }

  handleResult (result) {

  }

  execute () {
    const slots = getRandomSlots()
    const result = checkSlots(slots)
  }
}
