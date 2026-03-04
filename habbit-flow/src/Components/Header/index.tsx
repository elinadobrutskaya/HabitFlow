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
    const checkUser = () => {
      const savedUser = localStorage.getItem('user')
      setUser(savedUser ? JSON.parse(savedUser) : null)
    }

    checkUser()

    window.addEventListener('storage', checkUser)
    return () => {
      window.removeEventListener('storage', checkUser)
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
          <UserInfo variant="header" />
        ) : (
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
