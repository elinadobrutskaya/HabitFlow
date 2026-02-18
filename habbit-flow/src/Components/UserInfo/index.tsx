import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import style from './style.module.scss'

interface UserInfoProps {
  login: string
  avatarUrl?: string
}

const UserInfo: React.FC<UserInfoProps> = ({ login, avatarUrl }) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const menuRef = useRef<HTMLDivElement>(null)

  const getInitials = (name: string) => {
    return name.slice(0, 2).toUpperCase()
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/habitflow/sign-in')
    window.location.reload()
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={style.userContainer} ref={menuRef}>
      <div className={style.userInfoHeader} onClick={() => setIsOpen(!isOpen)}>
        <div className={style.avatarWrapper}>
          {avatarUrl ? (
            <img src={avatarUrl} alt={login} className={style.avatarImage} />
          ) : (
            <div className={style.initials}>{getInitials(login)}</div>
          )}
        </div>
        <span className={style.userName}>{login} ⌵</span>
      </div>

      {isOpen && (
        <div className={style.dropdown}>
          <Link
            to="habitflow/profile"
            className={style.menuItem}
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <Link
            to="habitflow/calendar"
            className={style.menuItem}
            onClick={() => setIsOpen(false)}
          >
            Calendar
          </Link>
          <hr className={style.divider} />
          <button
            className={`${style.menuItem} ${style.logout}`}
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  )
}

export default UserInfo
