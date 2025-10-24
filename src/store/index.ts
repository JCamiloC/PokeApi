import { configureStore } from '@reduxjs/toolkit'
import favorites from './favoritesSlice'
import filters from './filtersSlice'
import customPokemons from './customPokemonsSlice'

export const store = configureStore({
  reducer: {
    favorites,
    filters,
    customPokemons,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
