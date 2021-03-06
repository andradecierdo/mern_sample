import { errorCodes, userTypes } from '../constants'
import { AuthenticationError } from 'apollo-server-express'
import { IUser } from '../../interfaces'

const handleAdminAuthentication = (root: object, args: object, context: { user: IUser }): void => {
  if (context.user.type !== userTypes.admin) {
    const notAuthenticated = 6002
    throw new AuthenticationError(errorCodes[notAuthenticated])
  }
}

export default handleAdminAuthentication
