import React, { ReactElement } from 'react'
import LoginPage from './modules/public/LoginPage'
import NotFound404Page from './modules/public/NotFound404Page'
import { Router } from '@reach/router'
import { redirectToLoginPageIfAuthTokenIsExpired } from './common/helpers'
import { routes } from './common/constants'
import './styles/app.css'

const App = (): ReactElement => {
  redirectToLoginPageIfAuthTokenIsExpired()
  return (
    <Router>
      <NotFound404Page default />
      <LoginPage path={routes.loginPage} />
    </Router>
  )
}

export default App
