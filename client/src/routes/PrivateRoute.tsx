import React, { FunctionComponent, ReactElement } from 'react'
import { Redirect, RouteComponentProps } from '@reach/router'
import { PrivateComponent } from '../layout'
import { isAuthenticated } from '../common/helpers'
import { routes } from '../common/constants'

interface IRouterWrapperProps extends RouteComponentProps {
  component: FunctionComponent<RouteComponentProps>
}

const PrivateRoute: FunctionComponent<IRouterWrapperProps> = ({
  component: Component,
  ...props
}: IRouterWrapperProps): ReactElement => {
  if (isAuthenticated()) {
    return (
      <PrivateComponent {...props}>
        <Component {...props} />
      </PrivateComponent>
    )
  }
  return <Redirect from='' to={routes.loginPage} noThrow />
}

export default PrivateRoute
