import { useState, useEffect } from 'react'
import style from './style.module.scss'
import { useAppSelector, useAppDispatch } from '../../App/store'
import {
  addHabit,
  fetchHabits,
  deleteHabit,
  calculateCurrentStreak,
} from '../../App/habitSlice'
import HabitModal from '../AddHabitModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faFire } from '@fortawesome/free-solid-svg-icons'
import AllHabitsModal from '../AllHabitsModal'

const HabitsTool = () => {
  const dispatch = useAppDispatch()
  const habits = useAppSelector((state) => state.habits.items)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showCategories, setShowCategories] = useState(false)
  const categories = Array.from(new Set(habits.map((h) => h.category)))

  useEffect(() => {
    dispatch(fetchHabits())
  }, [dispatch])

  const handleCreateHabit = (data: {
    title: string
    category: string
    color: string
    daysStreak: number
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
      <div className={style.controls}>
        <div
          className={style.allHabitsWrapper}
          onMouseEnter={() => setShowCategories(true)}
          onMouseLeave={() => setShowCategories(false)}
        >
          <button className={style.buttonHabitList}>
            All Habits<span>⌵</span>
          </button>
          {showCategories && <AllHabitsModal categories={categories} />}
        </div>

        <button
          className={style.buttonAddHabit}
          onClick={() => setIsModalOpen(true)}
        >
          + Add New Habit
        </button>
      </div>

      <HabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateHabit}
      />

      <div className={style.habitsList}>
        {habits.map((habit) => {
          const currentStreak = calculateCurrentStreak(habit.completedDates)

          return (
            <div key={habit.id} className={style.habitItem}>
              <div className={style.habitInfo}>
                <div
                  className={style.colorIndicator}
                  style={{ backgroundColor: habit.color }}
                />
                <span className={style.habitTitle}>
                  {habit.title}
                  <span
                    style={{
                      fontSize: '13px',
                      marginLeft: '8px',
                      color: '#888',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {currentStreak}/{habit.daysStreak}
                    <FontAwesomeIcon
                      icon={faFire}
                      style={{ color: 'var(--primary-bright)' }}
                    />
                  </span>
                </span>
              </div>
              <button
                onClick={() => handleDelete(habit.id)}
                className={style.deleteBtn}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HabitsTool
