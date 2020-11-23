import {
  IAuthenticatedUser,
  IUser,
  IUserUpdateInput,
  IUserUpdateInputPasswordHashed,
} from '../../../interfaces'
import { AuthService } from '../../../services'
import User from '../../../mongoose/models/User'

const userUpdate = async (
  root: object,
  args: { _id: string; input: IUserUpdateInput },
  { auth }: { auth: IAuthenticatedUser },
): Promise<IUser> => {
  if (!auth) {
    return null
  }

  const { _id, input } = args
  const { address, email, password, name, type } = input
  const userModel = new User()
  const authServer = new AuthService()
  const hashedPassword = password ? await authServer.hashPassword(password) : null
  const updateData: IUserUpdateInputPasswordHashed = {
    address,
    email,
    name,
    type,
  }
  if (hashedPassword) {
    updateData.hashedPassword = hashedPassword
  }

  return userModel.updateUserById(_id, updateData)
}

export default userUpdate
