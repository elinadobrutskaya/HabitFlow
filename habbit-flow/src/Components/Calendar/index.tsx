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
}

interface DayObject {
  date: Dayjs
  isToday: boolean
}

const Calendar: React.FC<CalendarProps> = ({ initialDate }) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs(initialDate))
  const dispatch = useAppDispatch()

  const habits = useAppSelector((state) => state.habits.items)

  useEffect(() => {
    dispatch(fetchHabits())
  }, [dispatch])

  const currentMonthDays = useMemo(() => {
    const startOfMonth = currentDate.startOf('month')
    const endOfMonth = currentDate.endOf('month')
    const days: DayObject[] = []
    let day = startOfMonth

    while (day.isBefore(endOfMonth) || day.isSame(endOfMonth, 'day')) {
      days.push({
        date: day,
        isToday: day.isSame(dayjs(), 'day'),
      })
      day = day.add(1, 'day')
    }
    return days
  }, [currentDate])

  const handleToggle = (habit: Habit, dateStr: string) => {
    if (dayjs(dateStr).isAfter(dayjs(), 'day')) {
      return
    }
    dispatch(toggleHabitDate({ habit, date: dateStr }))
  }

  const goToNextMonth = () => setCurrentDate(currentDate.add(1, 'month'))
  const goToPrevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'))

  return (
    <div className={style.calendarContainer}>
      <div className={style.layout}>
        {/* left */}
        <HabitsTool></HabitsTool>
        {/* right */}
        <div className={style.rightColumn}>
          {/* header */}
          <div className={style.calendarHeader}>
            <button className={style.buttonChangeMonth} onClick={goToPrevMonth}>
              {'<'}
            </button>

            <Title>{currentDate.format('MMMM YYYY')}</Title>

            <button className={style.buttonChangeMonth} onClick={goToNextMonth}>
              {'>'}
            </button>
          </div>

          {/* days */}
          <div className={style.daysRowContainer}>
            {currentMonthDays.map((dayObj) => (
              <div
                key={dayObj.date.toISOString()}
                className={`${style.dayCell} ${dayObj.isToday ? style.today : ''}`}
              >
                <div className={style.dayOfWeek}>
                  {dayObj.date.format('ddd')}
                </div>
                <div className={style.dayOfMonth}>
                  {dayObj.date.format('D')}
                </div>
              </div>
            ))}
          </div>

          {/* cellsW */}
          {habits.map((habit) => (
            <div key={habit.id} className={style.cellsContainer}>
              {currentMonthDays.map((dayObj) => {
                const dateStr = dayObj.date.format('YYYY-MM-DD')
                const isCompleted = habit.completedDates.includes(dateStr)
                const isFuture = dayObj.date.isAfter(dayjs(), 'day')

                return (
                  <div
                    key={dateStr}
                    className={`${style.checkCell} 
                      ${isCompleted ? style.checked : ''} 
                      ${isFuture ? style.disabled : ''}`}
                    onClick={() => !isFuture && handleToggle(habit, dateStr)}
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
