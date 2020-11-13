import React, { FunctionComponent, ReactElement } from 'react'
import { routes } from '../../../common/constants'
import { isAuthenticated } from '../../../common/helpers'
import { RouteComponentProps, navigate } from '@reach/router'
import './styles.css'
import {Button} from "../../../common";

const NotFound404Page: FunctionComponent<RouteComponentProps> = (): ReactElement => {
  const handleRedirect = (route: string): void => {
    navigate(route)
  }
  return (
    <div className='homepage-container'>
      <div className='homepage-content'>
        <h1>Home Page</h1>
        <h3>A sample MERN stack application</h3>
        <div className='text-center i-flex'>
          {!isAuthenticated() ?
            <React.Fragment>
              <Button
                style='primary margin-auto'
                onClick={() => handleRedirect(routes.loginPage)}>
                Login
              </Button>
              <Button
                style='primary margin-auto'
                onClick={() => handleRedirect(routes.signUpPage)}>
                Sign Up
              </Button>
            </React.Fragment>
            : <Button
              style='primary margin-auto'
              onClick={() => handleRedirect(routes.usersPage)}>
              Dashboard
            </Button>
          }
        </div>
      </div>
    </div>
  )
}

export default NotFound404Page
