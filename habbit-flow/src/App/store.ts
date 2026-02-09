import { configureStore, createSlice } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import habitsReducer from './habitSlice'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value++
    },
    decrement: (state) => {
      state.value--
    },
  },
})

export const { increment, decrement } = counterSlice.actions

//store
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    habits: habitsReducer,
  },
})

// export types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
