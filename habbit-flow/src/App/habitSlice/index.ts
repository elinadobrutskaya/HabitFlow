import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface Habit {
  id: string
  title: string
  completedDates: string[]
  createdAt: string
}

interface HabitsState {
  items: Habit[]
  loading: boolean
  error: string | null
}

const initialState: HabitsState = {
  items: [],
  loading: false,
  error: null,
}

const BASE_URL = 'https://6988664c780e8375a68835d8.mockapi.io/habitflow/habits'

// getting all habbits
export const fetchHabits = createAsyncThunk('habits/fetchAll', async () => {
  const response = await fetch(BASE_URL)
  return (await response.json()) as Habit[]
})

// adding new habbit
export const addHabit = createAsyncThunk(
  'habits/add',
  async (title: string) => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        completedDates: [],
        createdAt: new Date().toISOString(),
      }),
    })
    return (await response.json()) as Habit
  },
)

export const toggleHabitDate = createAsyncThunk(
  'habits/toggleDate',
  async ({ habit, date }: { habit: Habit; date: string }) => {
    const isCompleted = habit.completedDates.includes(date)
    const updatedDates = isCompleted
      ? habit.completedDates.filter((d) => d !== date)
      : [...habit.completedDates, date]

    const response = await fetch(`${BASE_URL}/${habit.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completedDates: updatedDates }),
    })
    return (await response.json()) as Habit
  },
)

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(addHabit.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(toggleHabitDate.fulfilled, (state, action) => {
        const index = state.items.findIndex((h) => h.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(addHabit.rejected, (state, action) => {
        state.error = action.error.message ?? 'Add failed'
      })
  },
})

export default habitsSlice.reducer
