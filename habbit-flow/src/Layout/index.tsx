import { useLocation } from 'react-router'
import style from './style.module.scss'
import Header from '../Components/Header'

interface Props {
  children: React.ReactNode
}

const Loyout = ({ children }: Props) => {
  const location = useLocation()

  console.log(location)
  return (
    <div className={style.layout}>
      <Header />
      <div className={style.content}>{children}</div>
    </div>
  )
}

export default Loyout
