/**
 * Rules that can be run
 */
export const rules = {
  HAS_SAME_CHARACTERS: { fnc: hasSameCharacters, result: 'HAS_SAME_CHARACTERS' },
  HAS_DIFFERENT_CHARACTERS: { fnc: hasDifferentCharacters, result: 'HAS_DIFFERENT_CHARACTERS' },
  ADJACENT_CHARACTERS: { fnc: adjacentCharacters, result: 'ADJACENT_CHARACTERS' }
}

/**
 * Check the slots are all the same
 * @param {Stringp[]} slots Array of characters in the slots
 * @returns {Boolean} True if all the characters are the same, false if not
 */
export function hasSameCharacters (slots) {
  const result = new Set(slots)
  return (result.size === 1)
}

/**
 * Check the slots do not have any matching characters
 * @param {Stringp[]} slots Array of characters in the slots
 * @returns {Boolean} True if all the slots have different characters, otherwise its false
 */
export function hasDifferentCharacters (slots) {
  // Lets cheat and use a set, it will enforce uniqueness
  // We just need to match the length of both collections
  const result = new Set(slots)
  if (result.size === slots.length) {
    return true
  }
  return false
}

/**
 * Check that at least slots have the same character and are adjacent
 * @param {Stringp[]} slots Array of characters in the slots
 * @returns {Boolean} True if the slots contain at least 2 characters adjacent
 */
export function adjacentCharacters (slots) {
  // Grab the first slot to help compare to the next slot
  let charToEval = slots[0]
  let match = false
  // Start looping from the 2nd slot as we will be comparing against the 1st slot
  for (let index = 1; index < slots.length; index++) {
    if (slots[index] === charToEval) {
      // The current slot we're evaluating is the same as the previous slot
      // This means we have at least 2 slots adjacent, no point checking the rest of the slots
      match = true
      break
    } else {
      // The current slot is not the same previous slot, so set the current slot character
      // to be the one we evaluate against on the next loop
      charToEval = slots[index]
    }
  }
  return match
}

/**
 * Check the given slots matches the set of rules we have
 * @param {Stringp[]} slots Array of characters in the slots
 * @returns {String} The result of checking all the rules
 */
export function checkSlots (slots) {
  // We're going to loop over these rules
  const ruleSet = [rules.HAS_SAME_CHARACTERS, rules.HAS_DIFFERENT_CHARACTERS, rules.ADJACENT_CHARACTERS]
  // By default we assume there is no result, we will break out of the loop if there is a result
  let result = 'NO_RESULT'

  for (let index = 0; index < ruleSet.length; index++) {
    const rule = ruleSet[index]
    // Execute the rule function, if the rule function returns true then set the result
    // to the one defined on the rule and break out
    const ruleResult = rule.fnc(slots)
    if (ruleResult) {
      result = rule.result
      break
    }
  }
  return result
}
