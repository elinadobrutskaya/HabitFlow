import style from './style.module.scss'

interface TextFieldProps {
  name: string
  value?: string
  onChange?: (value: string) => void
  label?: string
  placeholder?: string
  error?: string
  disabled?: boolean
  type?: 'text' | 'email' | 'password'
}

const TextField = ({
  value,
  label,
  name,
  placeholder,
  error,
  disabled,
  type = 'text',
  onChange,
}: TextFieldProps) => {
  const inputClassNames = [
    style.input,
    error ? style.inputError : '',
    disabled ? style.disabled : '',
  ].join(' ')

  return (
    <div className={style.inputWrapper}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className={inputClassNames}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {error && <div className={style.error}>{error}</div>}
    </div>
  )
}

export default TextField
