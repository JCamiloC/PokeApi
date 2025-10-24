import { describe, it, expect } from 'vitest'
import reducer, { addFavorite, removeFavorite } from './favoritesSlice'
import type { Favorite } from './favoritesSlice'

describe('favorites slice', () => {
  it('adds and removes favorites', () => {
  const initial = { items: {} as Record<number, Favorite> }
    const afterAdd = reducer(initial, addFavorite({ id: 1, name: 'bulbasaur', image: '', types: ['grass'] }))
    expect(afterAdd.items[1]).toBeTruthy()
    const afterRemove = reducer(afterAdd, removeFavorite(1))
    expect(afterRemove.items[1]).toBeFalsy()
  })
})
