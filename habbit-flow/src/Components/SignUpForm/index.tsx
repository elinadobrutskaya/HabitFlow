import { useEffect, useRef, useState } from 'react'
import TextField from '../TextField'
import style from './style.module.scss'
import { Link } from 'react-router'

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!data.login || !data.email || !data.password) {
      setErrors({ login: !data.login ? 'Required field' : '' })
      return
    }

    try {
      const response = await fetch(
        'https://6988664c780e8375a68835d8.mockapi.io/habitflow/users',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        },
      )

      if (response.ok) {
        alert('Registration Success!')
      }
    } catch (error) {
      console.error('Registration Error: ', error)
    }
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
    </div>
  )
}

export default SignUpForm
