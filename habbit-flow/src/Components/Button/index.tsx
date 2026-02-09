import type { MouseEvent } from 'react'

import style from './style.module.scss'

interface ButtonProps {
  children?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'error' | 'theme'
  disabled?: boolean
  isLoading?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    disabled = false,
    onClick,
    children,
    type = 'button',
    isLoading,
  } = props

  const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event)
    }
  }

  const isDisabled = disabled || isLoading

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`${style.button} ${style[variant]}`}
      onClick={handleOnClick}
    >
      {isLoading ? <span> 'Loading...'</span> : children}
    </button>
  )
}

export default Button
