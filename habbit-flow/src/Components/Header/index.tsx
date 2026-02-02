import style from './style.module.scss'
import ThemeToggle from '../ThemeToggle'
import { Link } from 'react-router'
import Button from '../Button'

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.leftPart}>
        <Link to="/">
          <span className={style.logo}>HabbitFlow</span>
        </Link>
      </div>
      <div className={style.rightPart}>
        <Button variant="secondary">Sign UP</Button>
        <Button variant="secondary">Sign IN</Button>
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Header
