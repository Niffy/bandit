import { constants } from './src/constants.js'
import { Machine } from './src/machine.js'
import currency, { default as Currency } from 'currency.js'
import { input, select } from '@inquirer/prompts'

const currencyDefault = { symbol: '£', precision: 2, fromCents: true }
const promptDefault = { clearPromptOnDone: true }

const mapping = {}
mapping[constants.HAS_SAME_CHARACTERS] = function (result) {
  const formated = formatCurrency(result.payout)
  console.log(`Congratulations all the slots are the same!, you have won ${formated}`)
}
mapping[constants.HAS_DIFFERENT_CHARACTERS] = function (result) {
  const formated = formatCurrency(result.payout)
  console.log(`Congratulations each slot has a different character!, you have one ${formated}`)
}
mapping[constants.ADJACENT_CHARACTERS] = function (result) {
  const formated = formatCurrency(result.payout)
  console.log(`Congratulations you have 2 or more slots that have adjacant characters!, you have won ${formated}`)
}
mapping[constants.NO_RESULT] = function (result) {
  console.log('Sorry you have won nothing this round')
}
mapping[constants.USER_BALANCE_ZERO] = function (result) {
  console.log('Sorry you don\'t have enough money to play')
}
mapping[constants.MACHINE_BALANCE_LOW] = function (result) {
  if (result.payout > 0) {
    const formated = formatCurrency(result.payout)
    console.log(`Crikey, I do not have enough money, here have ${formated} and have some free plays as well!`)
  } else {
    console.log('Crikey, I do not have enough money, have some free plays instead!')
  }
}

async function startUserBalance () {
  const answer = await input({ message: 'How much do you wish to start with in GBP (£)' }, promptDefault)
  const rawCurrency = currency(answer, { symbol: '£', precision: 2 })
  return rawCurrency.intValue
}

function formatCurrency (value) {
  const answer = currency(value, currencyDefault)
  return answer.format()
}

async function outputBalance () {
  const raw = machine.getUserBalance()
  const answer = formatCurrency(raw)
  console.log(`Your current balance is now ${answer}`)
}

function handleResult (result) {
  console.clear()
  console.log(result.slots)
  mapping[result.result](result)
}
const methods = {
  spin: async function () {
    const result = machine.execute()
    handleResult(result)
    outputBalance()
    next()
  },
  exit: function () {
    process.exit(0)
  }
}

async function next () {
  const message = 'What would you like to do next?'
  const choices = [
    {
      name: 'Spin', value: 'spin', description: 'Lets pull the arm and spin'
    },
    { name: 'Exit', value: 'exit', description: 'go bye bye' }
  ]

  const answer = await select({ message, choices }, promptDefault)
  methods[answer]()
}

const userBalance = await startUserBalance()
const machine = new Machine(userBalance)
machine.balance = 100
outputBalance()
next()
