import React, { FunctionComponent, ReactElement } from 'react'
import { isAuthenticated } from '../common/helpers'
import { Redirect, RouteComponentProps} from '@reach/router'
import {routes} from '../common/constants'
import {PrivateComponent} from '../layout'

interface IRouterWrapperProps extends RouteComponentProps {
  component: FunctionComponent<RouteComponentProps>
}

const PrivateRoute: FunctionComponent<IRouterWrapperProps> = ({
  component: Component,
  ...props
}: IRouterWrapperProps): ReactElement => {
  if (isAuthenticated()) {
    return <PrivateComponent {...props}><Component {...props}/></PrivateComponent>
  }
  return <Redirect from='' to={routes.loginPage} noThrow />
}

export default PrivateRoute
