/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutationHookOptions, MutationTuple, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const USER_CREATE = gql`
  mutation UserCreate(
    $address: String!
    $email: String!
    $password: String!
    $name: String!
    $type: String!
  ) {
    userCreate(
      input: {
        address: $address
        email: $email
        password: $password
        name: $name
        type: $type
      }
    ) {
      _id
      address
      email
      name
      type
    }
  }
`

const userCreate = (
  options: MutationHookOptions<any, Record<string, any>>
): MutationTuple<any, Record<string, any>> => {
  return useMutation(USER_CREATE, options)
}

export default userCreate
