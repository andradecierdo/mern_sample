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
    parentId: String
    type: String
    updatedAt: DateTime
  }

  type Auth {
    _id: ID
    address: String
    email: String
    expiration: String
    token: String
    parentId: String
    name: String
    type: String
  }

  type UserDelete {
    n: Int
    ok: Int
    deletedCount: Int
  }

  extend type Query {
    user(_id: ID!): User
    users: [User!]
    usersPaginated(input: IUsersPaginatedInput): UserPaginated
    usersByParentPaginated(input: IUsersPaginatedInput): UserPaginated
  }

  extend type Mutation {
    userCreate(input: UserCreateInput): User!
    userDelete(_id: ID!): UserDelete!
    userRegister(input: UserCreateInput): User!
    userUpdate(_id: ID!, input: UserUpdateInput): User!
    userLogin(input: UserAuthInput): Auth!
  }

  input IUsersPaginatedInput {
    limit: Int
    skip: Int
  }

  input UserAuthInput {
    email: String!
    password: String!
  }

  input UserCreateInput {
    address: String!
    email: String!
    password: String!
    name: String!
    type: String!
  }

  input UserUpdateInput {
    address: String!
    email: String!
    password: String
    name: String!
    type: String!
  }
`

export default typeDef
