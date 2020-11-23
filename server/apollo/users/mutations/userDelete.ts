import { IAuthenticatedUser, IUser } from '../../../interfaces'
import User from '../../../mongoose/models/User'

const userDelete = async (
  root: object,
  args: { _id: string },
  { auth }: { auth: IAuthenticatedUser },
): Promise<IUser> => {
  if (!auth) {
    return null
  }

  const { _id } = args
  const userModel = new User()

  return userModel.deleteById(_id)
}

export default userDelete
