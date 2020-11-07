import { gql } from 'apollo-server-express'

const typeDef = gql`
  type UserPaginated {
    data: [User]
    limit: Int
    skip: Int
    total: Int
  }

  type User {
    _id: ID!
    address:String
    createdAt: DateTime
    email: String
    name: String
    type: String
    updatedAt: DateTime
  }

  type Auth {
    _id: ID
    address: String
    email: String
    expiration: String
    token: String
    name: String
    type: String
  }

  extend type Query {
    user(_id: ID!): User
    users: [User!]
    usersPaginated(input: IUsersPaginatedInput): UserPaginated
  }

  extend type Mutation {
    userCreate(input: UserUpsertInput): User!
    userLogin(input: UserAuthInput): Auth!
    userUpdateProfile(_id: ID!, input: UserUpdateProfileInput): User!
  }

  input IUsersPaginatedInput {
    limit: Int
    skip: Int
  }

  input UserAuthInput {
    email: String!
    password: String!
  }

  input UserUpsertInput {
    address: String!
    email: String!
    password: String!
    name: String!
    type: String!
  }

  input UserUpdateProfileInput {
    email: String!
    password: String!
  }
`

export default typeDef
