import style from './style.module.scss'
import Title from '../../Components/Title'
import Button from '../../Components/Button'
import { Link } from 'react-router'

export default function MainPage() {
  return (
    <section className={style.main}>
      <div className={style.container}>
        <Title>Welcome to Habit Flow!</Title>
        <div className={style.mainText}>
          <p>
            Habit Flow is a web application that helps you manage your tasks and
            goals. It's designed to be simple and easy to use, making it perfect
            for busy people.
          </p>
        </div>
        <Link to="habitflow/calendar">
          <Button variant="primary">Get Started Now</Button>
        </Link>
      </div>
    </section>
  )
}
