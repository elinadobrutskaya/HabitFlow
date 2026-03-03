import React, { useState, useMemo, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import style from './style.module.scss'
import { useAppDispatch, useAppSelector } from '../../App/store'
import { fetchHabits, toggleHabitDate } from '../../App/habitSlice'
import type { Habit } from '../../App/habitSlice'
import Title from '../Title'
import HabitsTool from '../HabitsTool'

interface CalendarProps {
  initialDate: string | Dayjs
  variant?: 'main' | 'mini'
}

const Calendar: React.FC<CalendarProps> = ({
  initialDate,
  variant = 'main',
}) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs(initialDate))
  const dispatch = useAppDispatch()
  const habits = useAppSelector((state) => state.habits.items)

  const isMini = variant === 'mini'

  useEffect(() => {
    dispatch(fetchHabits())
  }, [dispatch])

  const currentMonthDays = useMemo(() => {
    const startOfMonth = currentDate.startOf('month')
    const endOfMonth = currentDate.endOf('month')
    const days = []
    let day = startOfMonth
    while (day.isBefore(endOfMonth) || day.isSame(endOfMonth, 'day')) {
      days.push({ date: day, isToday: day.isSame(dayjs(), 'day') })
      day = day.add(1, 'day')
    }
    return days
  }, [currentDate])

  const handleToggle = (habit: Habit, dateStr: string) => {
    if (isMini || dayjs(dateStr).isAfter(dayjs(), 'day')) return
    dispatch(toggleHabitDate({ habit, date: dateStr }))
  }

  return (
    <div className={`${style.calendarContainer} ${isMini ? style.mini : ''}`}>
      <div className={style.layout}>
        {!isMini && (
          <div className={style.leftColumn}>
            <HabitsTool />
          </div>
        )}

        <div className={style.rightColumn}>
          <div className={style.calendarHeader}>
            {
              <button
                className={style.buttonChangeMonth}
                onClick={() => setCurrentDate(currentDate.subtract(1, 'month'))}
              >
                {'<'}
              </button>
            }
            <Title>{currentDate.format('MMMM YYYY')}</Title>
            {
              <button
                className={style.buttonChangeMonth}
                onClick={() => setCurrentDate(currentDate.add(1, 'month'))}
              >
                {'>'}
              </button>
            }
          </div>

          <div className={style.daysRowContainer}>
            {currentMonthDays.map((dayObj) => (
              <div
                key={dayObj.date.toISOString()}
                className={`${style.dayCell} ${dayObj.isToday ? style.today : ''}`}
              >
                <div className={style.dayOfWeek}>
                  {dayObj.date.format(isMini ? 'dd' : 'ddd')}
                </div>
                <div className={style.dayOfMonth}>
                  {dayObj.date.format('D')}
                </div>
              </div>
            ))}
          </div>

          {habits.map((habit) => (
            <div key={habit.id} className={style.cellsContainer}>
              {currentMonthDays.map((dayObj) => {
                const dateStr = dayObj.date.format('YYYY-MM-DD')
                const isCompleted = habit.completedDates?.includes(dateStr)
                return (
                  <div
                    key={dateStr}
                    className={`${style.checkCell} ${isCompleted ? style.checked : ''}`}
                    style={{
                      backgroundColor: isCompleted
                        ? habit.color
                        : 'transparent',
                    }}
                    onClick={() => handleToggle(habit, dateStr)}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Calendar
