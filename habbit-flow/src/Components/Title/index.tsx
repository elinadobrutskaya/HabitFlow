import type React from 'react'
import style from './style.module.scss'

interface TitleProps {
  size?: 'main' | 'lg' | 'md' | 'sm'
  children: React.ReactNode
}

function Title(props: TitleProps) {
  const { children, size = 'main' } = props

  return <h2 className={`${style.title} ${style[size]}`}>{children}</h2>
}
export default Title
