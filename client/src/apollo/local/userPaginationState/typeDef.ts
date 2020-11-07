import gql from 'graphql-tag'

const typeDefs = gql`
  type UserPagination {
    currentPage: Int
    limit: Int
    skip: Int
    url: String
  }
`

export default typeDefs
