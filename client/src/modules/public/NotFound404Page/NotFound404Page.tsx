import React, { FunctionComponent, ReactElement } from 'react'
import { RouteComponentProps } from '@reach/router'
import './styles.css'

const NotFound404Page: FunctionComponent<RouteComponentProps> = (): ReactElement => {
  return (
    <div className='__404-container'>
      <div className='__404-content'>
        <h1 className='larger'>404</h1>
        <h1>Page Not Found</h1>
        <h3>Sorry, seems like we cannot find the page you are looking for.</h3>
        <h3>
          Click{' '}
          <a href={void 0} onClick={(): void => self.history.back()}>
            here
          </a>{' '}
          to go back to your previous location.
        </h3>
      </div>
    </div>
  )
}

export default NotFound404Page
