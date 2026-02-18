import { useEffect, useState } from 'react'
import style from './style.module.scss'
import ThemeToggle from '../ThemeToggle'
import { Link } from 'react-router'
import Button from '../Button'
import UserInfo from '../UserInfo'

const Header = () => {
  const [user, setUser] = useState<{ login: string; avatar?: string } | null>(
    null,
  )

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  return (
    <header className={style.header}>
      <div className={style.leftPart}>
        <Link to="/">
          <span className={style.logo}>HabitFlow</span>
        </Link>
      </div>

      <div className={style.rightPart}>
        {user ? (
          // if enter
          <>
            <UserInfo login={user.login} avatarUrl={user.avatar} />
          </>
        ) : (
          //if no enter
          <>
            <Link to="habitflow/sign-up">
              <Button variant="secondary">Sign UP</Button>
            </Link>
            <Link to="habitflow/sign-in">
              <Button variant="secondary">Sign IN</Button>
            </Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Header
