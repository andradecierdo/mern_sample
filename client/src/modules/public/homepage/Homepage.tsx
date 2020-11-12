import React, { FunctionComponent, ReactElement } from 'react'
import { routes } from '../../../common/constants'
import { RouteComponentProps, navigate } from '@reach/router'
import './styles.css'

const NotFound404Page: FunctionComponent<RouteComponentProps> = (): ReactElement => {
  const handleRedirectToLogin = (): void => {
    navigate(routes.loginPage)
  }

  return (
    <div className='homepage-container'>
      <div className='homepage-content'>
        <h1>Home Page</h1>
        <h3>A sample MERN stack application</h3>
          <a onClick={() => handleRedirectToLogin()}> Login</a>
      </div>
    </div>
  )
}

export default NotFound404Page
