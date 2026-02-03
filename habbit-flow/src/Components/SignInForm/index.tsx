import { useEffect, useRef, useState } from 'react'
import TextField from '../TextField'
import style from './style.module.scss'

const validateForm = (): {
  hasError: boolean
  field: 'login' | 'password'
  error: string
} => {
  return {
    hasError: true,
    field: 'login',
    error: 'login is incorrect',
  }
}

const SignInForm = () => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [data, setData] = useState({ login: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({
    login: '',
    password: '',
  })

  useEffect(() => {
    for (const error in errors) {
      if (errors[error]) {
        if (formRef.current) formRef.current[error].focus()
      }
    }
  }, [errors])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const { hasError, field, error } = validateForm()

    if (hasError) {
      setErrors(() => ({
        login: '',
        password: '',
        [field]: error || 'Invalid JSON',
      }))
      return
    }

    alert(`Login: ${data.login} Password: ${data.password}`)
  }

  const onChangeField = (field: string, value: string) => {
    setData({ ...data, [field]: value })
  }

  return (
    <div className={style.signInForm}>
      <form className={style.form} onSubmit={handleSubmit} ref={formRef}>
        <TextField
          name={'login'}
          label="Login"
          placeholder="Login"
          error={errors['login']}
          onChange={(value) => onChangeField('login', value)}
        />
        <TextField
          name={'password'}
          type="password"
          label="Password"
          placeholder="Password"
          error={errors['password']}
          onChange={(value) => onChangeField('password', value)}
        />

        <button className={style.buttonSign} type="submit">
          Submit
        </button>
      </form>

      <div>Login: {data.login}</div>
      <div>Password: {data.password}</div>
    </div>
  )
}

export default SignInForm
