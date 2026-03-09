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
import DeleteHabitModal from '../DeleteHabitModal'

interface HabitsToolProps {
  variant?: 'default' | 'profile'
}

const HabitsTool: React.FC<HabitsToolProps> = ({ variant = 'default' }) => {
  const isProfile = variant === 'profile'
  const dispatch = useAppDispatch()
  const habits = useAppSelector((state) => state.habits.items)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showCategories, setShowCategories] = useState(false)
  const categories = Array.from(new Set(habits.map((h) => h.category)))
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [habitToDelete, setHabitToDelete] = useState<string | null>(null)

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

  const openDeleteModal = (id: string) => {
    setHabitToDelete(id)
    setIsDeleteOpen(true)
  }

  const handleConfirmDelete = () => {
    if (habitToDelete) {
      dispatch(deleteHabit(habitToDelete))
      setHabitToDelete(null)
    }
  }

  return (
    <div className={style.leftColumn}>
      {!isProfile && (
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
      )}

      <HabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateHabit}
      />

      <div className={style.habitsList}>
        {habits.map((habit) => {
          const currentStreak = calculateCurrentStreak(habit.completedDates)

          return (
            <div
              key={habit.id}
              className={`${style.habitItem} ${isProfile ? style.profileMode : ''}`}
            >
              <div className={style.habitInfo}>
                <div
                  className={style.colorIndicator}
                  style={{ backgroundColor: habit.color }}
                />
                <span className={style.habitTitle}>{habit.title}</span>
                <span className={style.streakInfo}>
                  {currentStreak}/{habit.daysStreak}
                  <FontAwesomeIcon
                    icon={faFire}
                    style={{ color: 'var(--primary-bright)' }}
                  />
                </span>
              </div>

              {!isProfile && (
                <button
                  onClick={() => openDeleteModal(habit.id)}
                  className={style.deleteBtn}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              )}
            </div>
          )
        })}
      </div>
      <DeleteHabitModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Habit"
        message="Are you sure you want to delete this habit? This action cannot be undone."
      />
    </div>
  )
}

export default HabitsTool
