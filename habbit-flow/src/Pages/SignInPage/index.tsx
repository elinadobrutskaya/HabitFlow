import Title from '../../Components/Title'
import SignInForm from '../../Components/SignInForm'
import style from './style.module.scss'

const SignIn = () => {
  return (
    <section className={style.signInPage}>
      <div className={style.container}>
        <div className={style.windowSignForm}>
          <div className={style.topPart}>
            <Title>Sign In</Title>
          </div>
          <div className={style.signIn}>
            <SignInForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignIn
