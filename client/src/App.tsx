import React, { ReactElement } from 'react'
import Homepage from './modules/public/homepage'
import LoginPage from './modules/public/login'
import EditPage from './modules/user/edit'
import SignUpPage from './modules/user/signup'
import CreatePage from './modules/user/add'
import UsersByParentList from './modules/user/list'
import NotFound404Page from './modules/public/404'

import { Router } from '@reach/router'
import { redirectToLoginPageIfAuthTokenIsExpired } from './common/helpers'
import { routes } from './common/constants'
import './styles/app.css'
import {PrivateRoute, PublicRoute} from "./routes";

const App = (): ReactElement => {
  redirectToLoginPageIfAuthTokenIsExpired()
  return (
    <Router>
      <NotFound404Page default />
      <Homepage path={routes.homepage} />
      <PublicRoute path={routes.loginPage} component={LoginPage} />
      <PublicRoute path={routes.signUpPage} component={SignUpPage} />
      <PrivateRoute path={routes.userCreatePage} component={CreatePage} />
      <PrivateRoute path={routes.usersPage} component={UsersByParentList}/>
      <PrivateRoute path={`${routes.userEditPage}/:userId`} component={EditPage} />
    </Router>
  )
}

export default App
