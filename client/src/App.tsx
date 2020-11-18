import React, { ReactElement } from 'react'
// eslint-disable-next-line sort-imports
import { PrivateRoute, PublicRoute } from './routes'
import CreatePage from './modules/user/components/add'
import EditPage from './modules/user/components/edit'
import Homepage from './modules/public/homepage'
import LoginPage from './modules/public/login'
import NotFound404Page from './modules/public/404'
import { Router } from '@reach/router'
import SignUpPage from './modules/user/components/signup'
import UsersByParentList from './modules/user/components/list'
import { redirectToLoginPageIfAuthTokenIsExpired } from './common/helpers'
import { routes } from './common/constants'
import './styles/app.css'

const App = (): ReactElement => {
  redirectToLoginPageIfAuthTokenIsExpired()
  return (
    <Router>
      <NotFound404Page default />
      <Homepage path={routes.homepage} />
      <PublicRoute path={routes.loginPage} component={LoginPage} />
      <PublicRoute path={routes.signUpPage} component={SignUpPage} />
      <PrivateRoute path={routes.userCreatePage} component={CreatePage} />
      <PrivateRoute path={routes.usersPage} component={UsersByParentList} />
      <PrivateRoute path={`${routes.userEditPage}/:userId`} component={EditPage} />
    </Router>
  )
}

export default App
