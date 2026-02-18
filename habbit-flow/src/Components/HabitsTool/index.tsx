import { useState, useEffect } from 'react'
import style from './style.module.scss'
import { useAppSelector, useAppDispatch } from '../../App/store'
import { addHabit, fetchHabits, deleteHabit } from '../../App/habitSlice'
import HabitModal from '../AddHabitModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const HabitsTool = () => {
  const dispatch = useAppDispatch()
  const habits = useAppSelector((state) => state.habits.items)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchHabits())
  }, [dispatch])

  const handleCreateHabit = (data: {
    title: string
    category: string
    color: string
  }) => {
    dispatch(addHabit(data))
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this habit?')) {
      dispatch(deleteHabit(id))
    }
  }

  return (
    <div className={style.leftColumn}>
      <button className={style.buttonHabitList}>
        All Habits<span>⌵</span>
      </button>

      <button
        className={style.buttonAddHabit}
        onClick={() => setIsModalOpen(true)}
      >
        + Add New Habit
      </button>

      <HabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateHabit}
      />

      {habits.map((habit) => (
        <div key={habit.id} className={style.habitItem}>
          <div className={style.habitInfo}>
            <div
              className={style.colorIndicator}
              style={{ backgroundColor: habit.color }}
            />
            <span className={style.habitTitle}>{habit.title}</span>
          </div>

          <button
            className={style.deleteBtn}
            onClick={() => handleDelete(habit.id)}
            title="Delete Habit"
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default HabitsTool
