import style from './style.module.scss'
import ThemeToggle from '../ThemeToggle'
import { Link } from 'react-router'
import Button from '../Button'

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.leftPart}>
        <Link to="/">
          <span className={style.logo}>HabitFlow</span>
        </Link>
      </div>
      <div className={style.rightPart}>
        <Link to="habitflow/sign-up">
          <Button variant="secondary">Sign UP</Button>
        </Link>
        <Link to="habitflow/sign-in">
          <Button variant="secondary">Sign IN</Button>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Header
