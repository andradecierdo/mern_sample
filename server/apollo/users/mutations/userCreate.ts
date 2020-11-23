import { IAuthenticatedUser, IUser, IUserCreateInput } from '../../../interfaces'
import { AuthService } from '../../../services'
import User from '../../../mongoose/models/User'

const userCreate = async (
  root: object,
  { input }: { input: IUserCreateInput },
  { auth }: { auth: IAuthenticatedUser },
): Promise<IUser> => {
  if (!auth) {
    return null
  }

  const { address, email, password, name, type } = input
  const userModel = new User()
  const authService = new AuthService()
  const hashedPassword = await authService.hashPassword(password)
  const parentId = auth._id

  return userModel.createIfNotExist({ address, email, hashedPassword, name, parentId, type })
}

export default userCreate
