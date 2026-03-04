import React, { useEffect } from 'react'
import { useAppDispatch } from '../../App/store'
import { fetchHabits } from '../../App/habitSlice'
import style from './style.module.scss'
import Title from '../../Components/Title'
import UserInfo from '../../Components/UserInfo'
import Calendar from '../../Components/Calendar'
import dayjs from 'dayjs'
import HabitsTool from '../../Components/HabitsTool'

const Profile: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchHabits())
  }, [dispatch])

  return (
    <div className={style.profileContainer}>
      <div className={style.profileHeader}>
        <div className={style.userInfo}>
          <UserInfo variant="profile"></UserInfo>
        </div>
      </div>

      <section className={style.statsSection}>
        <HabitsTool variant="profile" />
        <Title size="lg">Your Calendar:</Title>
        <Calendar variant="mini" initialDate={dayjs()}></Calendar>
      </section>
    </div>
  )
}

export default Profile
