import { Machine } from '../machine'
import { constants } from '../constants'
import { rules } from '../rules'

it('Should have an inital machine balance of £20', () => {
  const machine = new Machine()
  expect(machine.balance).toEqual(2000)
})

it('Should have an initial user balance of 0', () => {
  const machine = new Machine()
  expect(machine.userBalance).toEqual(0)
})

it('Should use the provide user balance', () => {
  const balance = 1337
  const machine = new Machine(balance)
  expect(machine.userBalance).toEqual(balance)
})

it('Should not be able to execute when the balance is zero', () => {
  const machine = new Machine()
  expect(machine.canExecute()).toEqual(false)
})

it('Should be able to run when the user balance is 20', () => {
  const machine = new Machine(20)
  expect(machine.canExecute()).toEqual(true)
})

it('Should be able to run when the user balance is 30', () => {
  const machine = new Machine(30)
  expect(machine.canExecute()).toEqual(true)
})

it('Should not be able to subtract a cost per play when the user balance is zero', () => {
  const machine = new Machine()
  expect(machine.userBalanceSubtract()).toEqual(false)
})

it('Should not be able to subtract a cost per play when the user balance is 20', () => {
  const machine = new Machine(20)
  expect(machine.userBalanceSubtract()).toEqual(true)
})

it('Should not be able to subtract a cost per play when the user balance is 30', () => {
  const machine = new Machine(30)
  expect(machine.userBalanceSubtract()).toEqual(true)
})

it('Should be able to subtract 5 times with 100 in user balance', () => {
  const machine = new Machine(100)
  for (let index = 0; index < 5; index++) {
    machine.userBalanceSubtract()
  }
  expect(machine.userBalance).toEqual(0)
})

it('Should be able to subtract 2 times with 100 in user balance', () => {
  const machine = new Machine(100)
  for (let index = 0; index < 2; index++) {
    machine.userBalanceSubtract()
  }
  expect(machine.userBalance).toEqual(60)
})

it('Should return the user balance', () => {
  const balance = 1337
  const machine = new Machine(balance)
  expect(machine.getUserBalance()).toEqual(balance)
})

it('Should return no user balance error', () => {
  const machine = new Machine()
  expect(machine.execute()).toEqual(constants.USER_BALANCE_ZERO)
})

it('Should be able to check we can extract from the machine balance', () => {
  const machine = new Machine()
  const subtract = 200
  expect(machine.canSubtractBalance(subtract)).toEqual(true)
})

it('Should be able to check we can extract the full balance from the machine balance', () => {
  const machine = new Machine()
  const subtract = machine.balance
  expect(machine.canSubtractBalance(subtract)).toEqual(true)
})

it('Should not be able to check we can extract from the machine balance with a high value', () => {
  const machine = new Machine()
  const subtract = 9999999
  expect(machine.canSubtractBalance(subtract)).toEqual(false)
})

it('Should be able to add to the user balance', () => {
  const amount = 50
  const machine = new Machine(amount)
  machine.userBalanceAdd(amount)
  expect(machine.userBalance).toEqual(amount * 2)
})

it('Should not be able to add a negative value to the user balance', () => {
  const amount = -50
  const startingValue = 100
  const machine = new Machine(startingValue)
  machine.userBalanceAdd(amount)
  expect(machine.userBalance).toEqual(startingValue)
})

it('Should be able to add to the machine balance', () => {
  const amount = 20
  const machine = new Machine()
  const originalBalance = machine.balance
  machine.machineBalanceAdd(amount)
  expect(machine.balance).toEqual(amount + originalBalance)
})

it('Should not be able to add a negative value to the machine balance', () => {
  const amount = -20
  const machine = new Machine()
  const originalBalance = machine.balance
  machine.machineBalanceAdd(amount)
  expect(machine.balance).toEqual(originalBalance)
})

it('Should be able to subtract from 500 the machine balance', () => {
  const machine = new Machine()
  const subtract = 500
  expect(machine.machineBalanceSubtract(subtract)).toEqual(true)
})

it('Should be able to subtract all of the machine balance', () => {
  const machine = new Machine()
  const subtract = machine.balance
  expect(machine.machineBalanceSubtract(subtract)).toEqual(true)
})

it('Should not be able to subtract all of the machine balance' + 10, () => {
  const machine = new Machine()
  const subtract = machine.balance + 10
  expect(machine.machineBalanceSubtract(subtract)).toEqual(false)
})

it('Should be able to award the user the prize of all slots being the same character', () => {
  const result = rules.HAS_SAME_CHARACTERS
  const userStartingBalance = 0
  const machine = new Machine(userStartingBalance)
  const machineStartingBalance = machine.balance
  const handleResult = machine.handleResult(result)
  const expectedMachineBalance = machineStartingBalance - result.value
  expect(machine.balance).toEqual(expectedMachineBalance)
  expect(handleResult).toEqual(constants.HAS_SAME_CHARACTERS)
})

it('Should be able to award the user the prize of all slots being a different character', () => {
  const result = rules.HAS_DIFFERENT_CHARACTERS
  const userStartingBalance = 0
  const machine = new Machine(userStartingBalance)
  const machineStartingBalance = machine.balance
  const handleResult = machine.handleResult(result)
  const expectedMachineBalance = machineStartingBalance - result.value
  expect(machine.balance).toEqual(expectedMachineBalance)
  expect(handleResult).toEqual(constants.HAS_DIFFERENT_CHARACTERS)
})

it('Should be able to award the user the prize of slots having adjacent character', () => {
  const result = rules.ADJACENT_CHARACTERS
  const userStartingBalance = 0
  const machine = new Machine(userStartingBalance)
  const machineStartingBalance = machine.balance
  const handleResult = machine.handleResult(result)
  const expectedMachineBalance = machineStartingBalance - result.value
  expect(machine.balance).toEqual(expectedMachineBalance)
  expect(handleResult).toEqual(constants.ADJACENT_CHARACTERS)
})
