import { createSlice } from '@reduxjs/toolkit'
import { loadState, saveState } from './persist'

export type CustomPokemon = {
  id: number // local incremental id
  name: string
  image?: string
  types: string[]
  generation: number
  height: number
  weight: number
}

type CustomPokemonsState = {
  list: CustomPokemon[]
  nextId: number
}

const initialState: CustomPokemonsState = loadState<CustomPokemonsState>('customPokemons', {
  list: [],
  nextId: 10001, // out of range of API ids to avoid collisions
})

const customPokemonsSlice = createSlice({
  name: 'customPokemons',
  initialState,
  reducers: {
    addCustomPokemon: (state, action: { payload: Omit<CustomPokemon, 'id'> }) => {
      const newItem: CustomPokemon = { id: state.nextId++, ...action.payload }
      state.list.push(newItem)
      saveState('customPokemons', state)
    },
  },
})

export const { addCustomPokemon } = customPokemonsSlice.actions
export default customPokemonsSlice.reducer
