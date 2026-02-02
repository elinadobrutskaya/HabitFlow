import { Routes } from 'react-router'
import { Route } from 'react-router'
import { appRoutes } from './routes'
import { useState } from 'react'
import Loyout from './Layout'
import MainPage from './Pages/MainPage'

function App() {
  return (
    <>
      <Loyout>
        <Routes>
          <Route index element={<MainPage />}></Route>
          <Route path={appRoutes.main()}></Route>
        </Routes>
      </Loyout>
    </>
  )
}

export default App
