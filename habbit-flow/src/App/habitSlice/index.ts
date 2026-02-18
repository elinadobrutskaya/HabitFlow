import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface Habit {
  id: string
  title: string
  category: string
  color: string
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

const BASE_URL = 'https://6988664c780e8375a68835d8.mockapi.io/habitflow/users'

const getUserHabitsUrl = () => {
  const userString = localStorage.getItem('user')
  if (!userString) return null

  const user = JSON.parse(userString)
  if (!user.id) return null
  return `${BASE_URL}/${user.id}/habits`
}

// getting all habbits
export const fetchHabits = createAsyncThunk(
  'habits/fetchAll',
  async (_, { rejectWithValue }) => {
    const url = getUserHabitsUrl()
    if (!url) {
      return rejectWithValue('User not authenticated')
    }

    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch')
      return (await response.json()) as Habit[]
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)
// adding new habbit
export const addHabit = createAsyncThunk(
  'habits/add',
  async (
    {
      title,
      category,
      color,
    }: { title: string; category: string; color: string },
    { rejectWithValue },
  ) => {
    const url = getUserHabitsUrl()
    if (!url) return rejectWithValue('User not authenticated')

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          color,
          completedDates: [],
          createdAt: new Date().toISOString(),
        }),
      })
      if (!response.ok) throw new Error('Failed to add habit')
      return (await response.json()) as Habit
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)
export const toggleHabitDate = createAsyncThunk(
  'habits/toggleDate',
  async (
    { habit, date }: { habit: Habit; date: string },
    { rejectWithValue },
  ) => {
    const url = getUserHabitsUrl()

    if (!url) return rejectWithValue('User not authenticated')

    const currentDates = habit.completedDates || []
    const isCompleted = currentDates.includes(date)
    const updatedDates = isCompleted
      ? currentDates.filter((d) => d !== date)
      : [...currentDates, date]

    try {
      const response = await fetch(`${url}/${habit.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completedDates: updatedDates }),
      })
      if (!response.ok) throw new Error('Failed to update')
      return (await response.json()) as Habit
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

//delete habit
export const deleteHabit = createAsyncThunk(
  'habits/delete',
  async (habitId: string, { rejectWithValue }) => {
    const url = getUserHabitsUrl()
    if (!url) return rejectWithValue('User not authenticated')

    try {
      const response = await fetch(`${url}/${habitId}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete habit')
      return habitId
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.fulfilled, (state, action) => {
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
        console.error(action.error)
      })
      .addCase(deleteHabit.fulfilled, (state, action) => {
        state.items = state.items.filter((h) => h.id !== action.payload)
      })
  },
})

export default habitsSlice.reducer
