import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import style from './style.module.scss'

interface UserInfoProps {
  variant?: 'header' | 'profile'
}

interface UserData {
  id: string
  name: string
  avatar: string
  bio: string
}

const UserInfo: React.FC<UserInfoProps> = ({ variant = 'header' }) => {
  const [user, setUser] = useState<UserData | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()
  const menuRef = useRef<HTMLDivElement>(null)
  const isProfile = variant === 'profile'

  useEffect(() => {
    const fetchUser = () => {
      try {
        const savedUser = localStorage.getItem('user')

        if (savedUser) {
          const userData = JSON.parse(savedUser)
          setUser(userData)
        }
      } catch (error) {
        console.error('localStorage Error fetching user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  const getInitials = (userName: string | undefined) => {
    if (!userName) return '??'

    const parts = userName.trim().split(/\s+/)

    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }

    return userName.slice(0, 2).toUpperCase()
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/habitflow/sign-in')
    window.location.reload()
  }

  useEffect(() => {
    if (isProfile) return
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isProfile])

  if (isLoading) return <div className={style.userContainer}>Loading...</div>
  const displayName = user?.name || 'Guest'
  if (!user) return null

  return (
    <div
      className={`${style.userContainer} ${isProfile ? style.profileVariant : ''}`}
      ref={menuRef}
    >
      <div
        className={style.userInfoHeader}
        onClick={() => !isProfile && setIsOpen(!isOpen)}
      >
        <div className={style.avatarWrapper}>
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={displayName}
              className={style.avatarImage}
            />
          ) : (
            <div className={style.initials}>{getInitials(displayName)}</div>
          )}
        </div>

        <div className={style.textInfo}>
          <span className={style.userName}>
            {displayName} {!isProfile && <span className={style.arrow}>⌵</span>}
          </span>
          {isProfile && (
            <p className={style.userBio}>{user?.bio || 'No description yet'}</p>
          )}
        </div>
      </div>

      {isOpen && !isProfile && (
        <div className={style.dropdown}>
          <Link
            to="/habitflow/profile"
            className={style.menuItem}
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <Link
            to="/habitflow/calendar"
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
