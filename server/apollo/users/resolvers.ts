import { user, users, usersPaginated } from './queries'
import { userCreate, userLogin, userUpdateProfile } from './mutations'

const resolvers = {
  Mutation: {
    userCreate,
    userLogin,
    userUpdateProfile,
  },
  Query: {
    user,
    users,
    usersPaginated,
  },
}

export default resolvers
