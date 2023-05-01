import { Machine } from '../machine'
import { constants } from '../constants'
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
  expect(machine.userSubtract()).toEqual(false)
})

it('Should not be able to subtract a cost per play when the user balance is 20', () => {
  const machine = new Machine(20)
  expect(machine.userSubtract()).toEqual(true)
})

it('Should not be able to subtract a cost per play when the user balance is 30', () => {
  const machine = new Machine(30)
  expect(machine.userSubtract()).toEqual(true)
})

it('Should be able to subtract 5 times with 100 in user balance', () => {
  const machine = new Machine(100)
  for (let index = 0; index < 5; index++) {
    machine.userSubtract()
  }
  expect(machine.userBalance).toEqual(0)
})

it('Should return the user balance', () => {
  const balance = 1337
  const machine = new Machine(balance)
  expect(machine.getUserBalance()).toEqual(balance)
})
