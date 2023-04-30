import {
  rules,
  hasSameCharacters,
  hasDifferentCharacters,
  adjacentCharacters,
  checkSlots
} from '../rules'

import { reelOptions } from '../reel'

const slotCount = 4
function allDifferent () {
  const slots = []
  for (let index = 0; index < slotCount; index++) {
    slots.push(reelOptions[index])
  }
  return slots
}

function allTheSame () {
  const slots = []
  for (let index = 0; index < slotCount; index++) {
    slots.push(reelOptions[2])
  }
  return slots
}

describe('Same Characters', () => {
  let slots = []
  beforeEach(() => {
    slots = allTheSame()
  })
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
    const result = hasSameCharacters(slots)
    expect(result).toEqual(true)
  })

  it('Should return false when 1 slot is different', () => {
    slots[0] = reelOptions[1]
    const result = hasSameCharacters(slots)
    expect(result).toEqual(false)
  })
})

describe('All different Characters', () => {
  let slots = []
  beforeEach(() => {
    slots = allDifferent()
  })

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
    const slots = allTheSame()
    const result = hasDifferentCharacters(slots)
    expect(result).toEqual(false)
  })

  it('Should return true when all slots are different', () => {
    const result = hasDifferentCharacters(slots)
    expect(result).toEqual(true)
  })
})

describe('Adjacent Characters', () => {
  let slots = []
  beforeEach(() => {
    slots = allDifferent()
  })
  it('Should be defined', () => {
    expect(adjacentCharacters).toBeDefined()
  })

  it('Should have a string result defined', () => {
    expect(rules.ADJACENT_CHARACTERS.result).toBeDefined()
  })

  it('Should have a function that can be called', () => {
    expect(rules.ADJACENT_CHARACTERS.fnc).toBeDefined()
    rules.ADJACENT_CHARACTERS.fnc([])
  })

  it('Should have the correct function', () => {
    expect(rules.ADJACENT_CHARACTERS.fnc).toEqual(adjacentCharacters)
  })

  it('Should return true when all slots are the same', () => {
    slots = allTheSame()
    const result = adjacentCharacters(slots)
    expect(result).toEqual(true)
  })

  it('Should return true when slots 1 and 2 are the same', () => {
    slots[0] = slots[1] = reelOptions[0]
    const result = adjacentCharacters(slots)
    expect(result).toEqual(true)
  })

  it('Should return true when slots 2 and 3 are the same', () => {
    slots[1] = slots[2] = reelOptions[0]
    const result = adjacentCharacters(slots)
    expect(result).toEqual(true)
  })

  it('Should return true when slots 3 and 4 are the same', () => {
    slots[2] = slots[3] = reelOptions[0]
    const result = adjacentCharacters(slots)
    expect(result).toEqual(true)
  })
})
