import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { loadState, saveState } from './persist'

export type Favorite = {
  id: number
  name: string
  image: string
  types: string[]
}

type FavoritesState = {
  items: Record<number, Favorite>
}

const initialState: FavoritesState = loadState<FavoritesState>('favorites', { items: {} })

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Favorite>) => {
      state.items[action.payload.id] = action.payload
      saveState('favorites', state)
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      delete state.items[action.payload]
      saveState('favorites', state)
    },
  },
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
