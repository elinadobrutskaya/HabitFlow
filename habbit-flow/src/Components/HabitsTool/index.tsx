import style from './style.module.scss'
import { useAppSelector, useAppDispatch } from '../../App/store'
import { addHabit } from '../../App/habitSlice'

const HabitsTool = () => {
  const dispatch = useAppDispatch()

  const habits = useAppSelector((state) => state.habits.items)

  const handleCreate = () => {
    const title = prompt('Enter habit title:')
    if (title?.trim()) dispatch(addHabit(title.trim()))
  }

  return (
    <div className={style.leftColumn}>
      <button className={style.buttonHabitList}>
        All Habits<span>⌵</span>
      </button>

      <button className={style.buttonAddHabit} onClick={handleCreate}>
        + Add New Habit
      </button>

      {habits.map((habit) => (
        <div key={habit.id} className={style.habitTitle}>
          {habit.title}
        </div>
      ))}
    </div>
  )
}

export default HabitsTool
