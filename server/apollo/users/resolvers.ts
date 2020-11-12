import { user, users, usersByParentPaginated, usersPaginated } from './queries'
import { userCreate, userDelete, userLogin, userRegister, userUpdate } from './mutations'

const resolvers = {
  Mutation: {
    userCreate,
    userDelete,
    userLogin,
    userRegister,
    userUpdate,
  },
  Query: {
    user,
    users,
    usersByParentPaginated,
    usersPaginated,
  },
}

export default resolvers
