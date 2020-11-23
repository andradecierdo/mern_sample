import { gql } from 'apollo-server-express'

const typeDef = gql`
  scalar Date
  scalar DateTime
`

export default typeDef
