import { IUser, IUserCreateInput } from '../../../interfaces'
import { AuthService } from '../../../services'
import User from '../../../mongoose/models/User'

const userCreate = async (root: object, { input }: { input: IUserCreateInput }): Promise<IUser> => {
  const { address, email, password, name, type } = input
  const userModel = new User()
  const auth = new AuthService()
  const hashedPassword = await auth.hashPassword(password)
  return userModel.createIfNotExist({ address, email, hashedPassword, name, type })
}

export default userCreate
