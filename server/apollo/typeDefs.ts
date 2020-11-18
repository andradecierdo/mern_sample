import dates from './dates/typeDef'
import { gql } from 'apollo-server-express'
import users from './users/typeDef'

const typeDef = gql`
  type Query
  type Mutation
`

const typeDefs = [typeDef, dates, users]

export default typeDefs
