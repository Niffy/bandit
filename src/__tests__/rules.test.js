import {
  rules,
  hasSameCharacters,
  hasDifferentCharacters,
  adjacentCharacters,
  checkSlots
} from '../rules'

import { reelOptions } from '../reel'

describe('Same Characters', () => {
  it('Should be defined', () => {
    expect(hasSameCharacters).toBeDefined()
  })

  it('Should have a string result defined', () => {
    expect(rules.HAS_SAME_CHARACTERS.result).toBeDefined()
  })

  it('Should have a function that can be called', () => {
    expect(rules.HAS_SAME_CHARACTERS.fnc).toBeDefined()
    rules.HAS_SAME_CHARACTERS.fnc([])
  })

  it('Should have the correct function', () => {
    expect(rules.HAS_SAME_CHARACTERS.fnc).toEqual(hasSameCharacters)
  })

  it('Should return true when all slots are the same', () => {
    const slots = []
    const slotCount = 4
    for (let index = 0; index < slotCount; index++) {
      slots.push(reelOptions[0])
    }
    const result = hasSameCharacters(slots)
    expect(result).toEqual(true)
  })

  it('Should return false when 1 slot is different', () => {
    const slots = []
    const slotCount = 4
    for (let index = 0; index < slotCount; index++) {
      slots.push(reelOptions[0])
    }
    slots[0] = reelOptions[1]
    const result = hasSameCharacters(slots)
    expect(result).toEqual(false)
  })
})

describe('All different Characters', () => {
  it('Should be defined', () => {
    expect(hasDifferentCharacters).toBeDefined()
  })

  it('Should have a string result defined', () => {
    expect(rules.HAS_DIFFERENT_CHARACTERS.result).toBeDefined()
  })

  it('Should have a function that can be called', () => {
    expect(rules.HAS_DIFFERENT_CHARACTERS.fnc).toBeDefined()
    rules.HAS_DIFFERENT_CHARACTERS.fnc([])
  })

  it('Should have the correct function', () => {
    expect(rules.HAS_DIFFERENT_CHARACTERS.fnc).toEqual(hasDifferentCharacters)
  })

  it('Should return false when all slots are the same', () => {
    const slots = []
    const slotCount = 4
    for (let index = 0; index < slotCount; index++) {
      slots.push(reelOptions[0])
    }
    const result = hasDifferentCharacters(slots)
    expect(result).toEqual(false)
  })

  it('Should return true when all slots are different', () => {
    const slots = []
    const slotCount = 4
    for (let index = 0; index < slotCount; index++) {
      slots.push(reelOptions[index])
    }
    const result = hasDifferentCharacters(slots)
    expect(result).toEqual(true)
  })
})
