import style from './style.module.scss'
import Calendar from '../../Components/Calendar'
import dayjs from 'dayjs'

export default function CalendarPage() {
  const today = dayjs().format('MM.DD.YYYY')
  return (
    <section className={style.calendar}>
      <div className={style.container}>
        <Calendar initialDate={today}></Calendar>
      </div>
    </section>
  )
}
