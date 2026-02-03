import { useEffect, useRef, useState } from 'react'
import TextField from '../TextField'
import style from './style.module.scss'
import { Link } from 'react-router'

const validateForm = (): {
  hasError: boolean
  field: 'login' | 'email' | 'password'
  error: string
} => {
  return {
    hasError: true,
    field: 'login',
    error: 'login is incorrect',
  }
}

const SignUpForm = () => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [data, setData] = useState({ login: '', email: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({
    login: '',
    email: '',
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
        email: '',
        password: '',
        [field]: error || 'Invalid JSON',
      }))
      return
    }

    alert(
      `Login: ${data.login} Email: ${data.email} Password: ${data.password}`,
    )
  }

  const onChangeField = (field: string, value: string) => {
    setData({ ...data, [field]: value })
  }

  return (
    <div className={style.registrationForm}>
      <form className={style.form} onSubmit={handleSubmit} ref={formRef}>
        <TextField
          name={'login'}
          label="Login"
          placeholder="Login"
          error={errors['login']}
          onChange={(value) => onChangeField('login', value)}
        />
        <TextField
          name={'email'}
          label="Email"
          placeholder="Email"
          error={errors['email']}
          onChange={(value) => onChangeField('email', value)}
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
        <span>
          Already have an account?
          <Link to="/habitflow/sign-in">Sign In!</Link>
        </span>
      </form>

      <div>Login: {data.login}</div>
      <div>Email: {data.email}</div>
      <div>Password: {data.password}</div>
    </div>
  )
}

export default SignUpForm
