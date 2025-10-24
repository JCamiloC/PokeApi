import { createSlice } from '@reduxjs/toolkit'

export type FiltersState = {
  type: string | 'all'
  search: string
  orderBy: 'name' | 'number'
}

const initialState: FiltersState = {
  type: 'all',
  search: '',
  orderBy: 'name'
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setType: (state, action: { payload: FiltersState['type'] }) => {
      state.type = action.payload
    },
    setSearch: (state, action: { payload: string }) => {
      state.search = action.payload
    },
    setOrderBy: (state, action: { payload: FiltersState['orderBy'] }) => {
      state.orderBy = action.payload
    },
    resetFilters: (state) => {
      state.type = 'all'
      state.search = ''
      state.orderBy = 'name'
    },
  },
})

export const { setType, setSearch, setOrderBy, resetFilters } = filtersSlice.actions
export default filtersSlice.reducer
