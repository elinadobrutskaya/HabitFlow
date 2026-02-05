import React, { useState, useMemo } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import style from './style.module.scss'

interface CalendarProps {
  initialDate: string | Dayjs
}

interface DayObject {
  date: Dayjs
  isToday: boolean
}

const Calendar: React.FC<CalendarProps> = ({ initialDate }) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs(initialDate))

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

  const goToNextMonth = () => setCurrentDate(currentDate.add(1, 'month'))
  const goToPrevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'))

  return (
    <div className={style.calendar}>
      <div className={style.calendarHeader}>
        <button className={style.buttonChangeMonth} onClick={goToPrevMonth}>
          {'<'}
        </button>

        <h2>{currentDate.format('MMMM YYYY')}</h2>
        <button className={style.buttonChangeMonth} onClick={goToNextMonth}>
          {'>'}
        </button>
      </div>

      <div className={style.daysRowContainer}>
        {currentMonthDays.map((dayObj: DayObject) => (
          <div
            key={dayObj.date.toISOString()}
            className={`dayCell ${dayObj.isToday ? 'today' : ''}`}
          >
            <div className={style.dayOfWeek}>{dayObj.date.format('ddd')}</div>
            <div className={style.dayOfMonth}>{dayObj.date.format('D')}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
