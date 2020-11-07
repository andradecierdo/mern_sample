import { IUser } from '../../../interfaces'
import User from '../../../mongoose/models/User'

const user = async (parent: object, { _id }: { _id: string }): Promise<IUser> => {
  const userModel = new User()
  return userModel.getUserById(_id)
}

export default user
