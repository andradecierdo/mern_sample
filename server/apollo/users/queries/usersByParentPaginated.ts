import {
  IAuthenticatedUser,
  IPaginatedData,
  IUser,
  IUsersPaginatedInput,
} from '../../../interfaces'
import { GraphQLResolveInfo } from 'graphql'
import { User as UserModel } from '../../../mongoose/models'
import { getPaginatedApolloSelections } from '../../../global/functions'

const usersByParentPaginated = async (
  root: object,
  args: { input: IUsersPaginatedInput },
  context: { auth: IAuthenticatedUser },
  info: GraphQLResolveInfo,
): Promise<IPaginatedData<IUser[]>> => {
  const { limit, skip } = args.input
  const { auth } = context
  if (!auth) {
    return null
  }

  const select = getPaginatedApolloSelections(info)
  const options = {
    limit,
    select,
    skip,
    sort: { createdAt: -1 },
  }
  const userModel = new UserModel()

  return await userModel.getAllPaginatedUsersByParent(auth._id, options)
}

export default usersByParentPaginated
