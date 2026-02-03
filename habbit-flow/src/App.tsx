import { Routes } from 'react-router'
import { Route } from 'react-router'
import { appRoutes } from './routes'
import Loyout from './Layout'
import MainPage from './Pages/MainPage'
import SignIn from './Pages/SignInPage'
import SignUp from './Pages/SignUpPage'

function App() {
  return (
    <>
      <Loyout>
        <Routes>
          <Route index element={<MainPage />}></Route>
          <Route path={appRoutes.main()}></Route>
          <Route path={appRoutes.signIn()} element={<SignIn></SignIn>}></Route>
          <Route path={appRoutes.signUp()} element={<SignUp></SignUp>}></Route>
        </Routes>
      </Loyout>
    </>
  )
}

export default App
