import { IUser } from '../../../interfaces'
import User from '../../../mongoose/models/User'

const users = async (): Promise<IUser[]> => {
  const userModel = new User()
  return userModel.getAll()
}

export default users
