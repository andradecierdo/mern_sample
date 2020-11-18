import React, { FunctionComponent, ReactElement } from 'react'
import { Redirect, RouteComponentProps } from '@reach/router'
import { PublicComponent } from '../layout'
import { isAuthenticated } from '../common/helpers'
import { routes } from '../common/constants'

interface IRouterWrapperProps extends RouteComponentProps {
  component: FunctionComponent<RouteComponentProps>
}

const PublicRoute: FunctionComponent<IRouterWrapperProps> = ({
  component: Component,
  ...props
}: IRouterWrapperProps): ReactElement => {
  if (!isAuthenticated()) {
    return (
      <PublicComponent {...props}>
        <Component {...props} />
      </PublicComponent>
    )
  }
  return <Redirect from='' to={routes.usersPage} noThrow />
}

export default PublicRoute
