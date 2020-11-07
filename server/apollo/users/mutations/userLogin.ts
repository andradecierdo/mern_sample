import { IAuthenticatedUser, IUserCreateInput } from '../../../interfaces'
import { AuthService } from '../../../services'
import User from '../../../mongoose/models/User'

const userLogin = async (
  parent: object,
  { input }: { input: IUserCreateInput },
): Promise<IAuthenticatedUser> => {
  const { email, password } = input

  const userModel = new User()
  const user = await userModel.getUserByEmail(email)

  const auth = new AuthService()
  return auth.authenticate(user, password)
}

export default userLogin
