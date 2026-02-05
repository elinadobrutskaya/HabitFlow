import Title from '../../Components/Title'
import SignUpForm from '../../Components/SignUpForm'
import style from './style.module.scss'

const SignUp = () => {
  return (
    <section>
      <div className={style.container}>
        <div className={style.windowSignForm}>
          <div className={style.topPart}>
            <Title>Sign Up</Title>
          </div>
          <div className={style.signUp}>
            <SignUpForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUp
