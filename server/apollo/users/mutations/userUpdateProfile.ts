import { IUser, IUserUpdateInput } from '../../../interfaces'
import { AuthService } from '../../../services'
import User from '../../../mongoose/models/User'

const userUpdateProfile = async (
  root: object,
  args: { _id: string; input: IUserUpdateInput },
): Promise<IUser> => {
  const { _id, input } = args
  const { email, password } = input

  const userModel = new User()
  const auth = new AuthService()

  const hashedPassword = password ? await auth.hashPassword(password) : null
  return userModel.updateUserProfileById(_id, { email, hashedPassword })
}

export default userUpdateProfile
