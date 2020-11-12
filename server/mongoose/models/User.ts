import {
  IModelOptionsInput,
  IPaginatedData,
  IUser,
  IUserCreateInputPasswordHashed,
  IUserTypeOption,
  IUserUpdateInputPasswordHashed,
  IUserUpdateProfileInput,
} from '../../interfaces'
import { ActiveRecord } from '../../global/utilities'
import { User as UserSchema } from '../schemas'
import mongoose from '../config/mongoose'
import { userTypes } from '../../global/constants'

/* ----------------------------------------------------------------------------------
 * Class follows the order of CRUD where create methods are placed on top,
 * then followed by read and update in between then delete methods as last.
 * Public methods can all be found at the top.
 * Private methods can all be found at the bottom.
/* ---------------------------------------------------------------------------------- */
const User = mongoose.model('User', UserSchema)
class UserModel extends ActiveRecord {
  constructor() {
    super(User)
  }

  private userTypeFilter: IUserTypeOption = {
    $or: [{ type: userTypes.admin }, { type: userTypes.business }, { type: userTypes.user }],
  }

  public createIfNotExist = async (userInput: IUserCreateInputPasswordHashed): Promise<IUser> => {
    const user: IUser = await this.getUserByEmail(userInput.email)
    if (user === null) {
      return this.create(userInput)
    }
    return user
  }

  public deleteById = async (userId: string): Promise<IUser> => {
    return this.deleteOne({ _id: userId })
  }

  public getAll = async (): Promise<IUser[]> => {
    return this.find(this.userTypeFilter, {
      sort: { createdAt: -1 },
    })
  }

  public getAllPaginatedUsersByParent = async (
    parentId: string,
    options: IModelOptionsInput,
  ): Promise<IPaginatedData<IUser[]>> => {
    const filter = Object.assign({}, this.userTypeFilter, { parentId })
    const data: IUser[] = await this.find(filter, options)
    const total: number = await this.count({ parentId })
    const { limit, skip } = options
    return {
      data,
      limit,
      skip,
      total,
    }
  }

  public getAllPaginatedUsers = async (
    options: IModelOptionsInput,
  ): Promise<IPaginatedData<IUser[]>> => {
    const data: IUser[] = await this.find(this.userTypeFilter, options)
    const total: number = await this.count({})
    const { limit, skip } = options
    return {
      data,
      limit,
      skip,
      total,
    }
  }

  public getUserById = async (userId: string): Promise<IUser> => {
    const userOption = Object.assign({ _id: userId }, this.userTypeFilter)
    return this.findOne(userOption)
  }

  public getUserByEmail = async (email: string): Promise<IUser> => {
    return this.findOne({ email })
  }

  public updateUserById = async (
    userId: string,
    userInput: IUserUpdateInputPasswordHashed,
  ): Promise<IUser> => {
    const userFilter = Object.assign({ _id: userId }, this.userTypeFilter)
    return this.update(userFilter, userInput)
  }
}

export default UserModel
