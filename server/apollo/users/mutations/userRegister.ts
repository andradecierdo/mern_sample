import { IUser, IUserCreateInput } from '../../../interfaces'
import { AuthService } from '../../../services'
import User from '../../../mongoose/models/User'

const userRegister = async (
  root: object,
  { input }: { input: IUserCreateInput },
): Promise<IUser> => {
  const { address, email, password, name, type } = input
  const userModel = new User()
  const authService = new AuthService()
  const hashedPassword = await authService.hashPassword(password)

  return userModel.createIfNotExist({ address, email, hashedPassword, name, type })
}

export default userRegister
