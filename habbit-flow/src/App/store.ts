import { configureStore, createSlice } from '@reduxjs/toolkit'

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
  },
})

// export types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
