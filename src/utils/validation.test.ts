import { describe, it, expect } from 'vitest'
import { nameIsValid, validatePokemonForm } from './validation'

describe('validation', () => {
  it('validates name rules', () => {
    expect(nameIsValid('pi')).toBe(false)
    expect(nameIsValid('pi@')).toBe(false)
    expect(nameIsValid('pikachu')).toBe(true)
    expect(nameIsValid('mr-mime')).toBe(true)
  })

  it('validates full form', () => {
    const errs = validatePokemonForm({ name: 'pikachu', type: 'electric', generation: 1, height: 4, weight: 60 })
    expect(Object.keys(errs).length).toBe(0)
  })
})
