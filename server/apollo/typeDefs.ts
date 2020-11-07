import { gql } from 'apollo-server-express'
import users from './users/typeDef'
import dates from './dates/typeDef'

const typeDef = gql`
  type Query
  type Mutation
`

const typeDefs = [
  typeDef,
  dates,
  users,
]

export default typeDefs
