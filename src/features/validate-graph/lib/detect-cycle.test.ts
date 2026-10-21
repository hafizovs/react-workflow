import { describe, expect, it } from 'vitest'

import { hasCycle } from './detect-cycle'

describe('hasCycle', () => {
  it('detects a simple cycle', () => {
    expect(
      hasCycle([
        { source: 'a', target: 'b' },
        { source: 'b', target: 'c' },
        { source: 'c', target: 'a' },
      ]),
    ).toBe(true)
  })

  it('returns false for acyclic graph', () => {
    expect(
      hasCycle([
        { source: 'a', target: 'b' },
        { source: 'b', target: 'c' },
      ]),
    ).toBe(false)
  })
})
