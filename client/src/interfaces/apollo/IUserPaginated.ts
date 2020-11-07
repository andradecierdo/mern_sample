import IUser from './IUser'

interface IUserPaginated {
  data: IUser[]
  limit: number
  skip: number
  total: number
}

export default IUserPaginated
