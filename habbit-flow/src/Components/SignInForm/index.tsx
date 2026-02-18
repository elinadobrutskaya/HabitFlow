import { useEffect, useRef, useState } from 'react'
import TextField from '../TextField'
import style from './style.module.scss'

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const response = await fetch(
        `https://6988664c780e8375a68835d8.mockapi.io/users?login=${data.login}`,
      )
      const users = await response.json()

      const user = users.find(
        (u: any) => u.login === data.login && u.password === data.password,
      )

      if (user) {
        alert(`Hello, ${user.login}!`)
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        setErrors({ login: 'Wrong login or password' })
      }
    } catch (error) {
      console.error('Enter Error', error)
    }
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
    </div>
  )
}

export default SignInForm
