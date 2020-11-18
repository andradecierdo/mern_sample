import ApolloClient from 'apollo-client'
import Cookies from 'js-cookie'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

const httpLink = createHttpLink({
  uri: `${process.env.SERVER_URL}/graphql`,
})

const authLink = setContext((_, { headers }) => {
  const auth = Cookies.get('auth') || null
  const token = auth ? JSON.parse(auth).token : null
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  }
})

const cache = new InMemoryCache()
const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
  resolvers: {},
  typeDefs: [],
})

export default client
