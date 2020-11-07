import { Request, Response } from 'express'
import { IUser } from '../interfaces'
import { User as UserModel } from '../mongoose/models'
import { handleAsyncErrors } from '../global/functions'

const getUsers = async (req: Request, res: Response): Promise<void> => {
  const userModel = new UserModel()
  const users: IUser[] = await userModel.getAll()

  res.send(JSON.stringify(users, null, 4))
}

export default handleAsyncErrors(getUsers)
