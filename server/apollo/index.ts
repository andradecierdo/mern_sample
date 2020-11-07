import { ApolloServer } from 'apollo-server-express'
import { AuthService } from '../services'
import { Request } from 'express'
import { isAppInProduction } from '../global/functions'
import resolvers from './resolvers'
import typeDefs from './typeDefs'

const ApolloServerInit = new ApolloServer({
  context: ({ req }: { req: Request }): any => {
    const token = req.headers.authorization || null

    const authService = new AuthService()
    const auth = authService.getAuthDecodedToken(token)

    return { auth }
  },
  playground: !isAppInProduction(),
  resolvers,
  typeDefs,
})

export default ApolloServerInit
