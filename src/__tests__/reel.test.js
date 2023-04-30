import { reelOptions } from '../reel'

it('Should have our characters', () => {
  expect(reelOptions).toEqual(['A', 'B', 'C', 'D', 'E'])
})
