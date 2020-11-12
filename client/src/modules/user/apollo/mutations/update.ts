/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutationHookOptions, MutationTuple, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const USER_UPDATE = gql`
  mutation UserUpdate(
    $_id: ID!
    $address: String!
    $email: String!
    $password: String
    $name: String!
    $type: String!
  ) {
    userUpdate(
      _id: $_id
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

const update = (
  options: MutationHookOptions<any, Record<string, any>>
): MutationTuple<any, Record<string, any>> => {
  return useMutation(USER_UPDATE, options)
}

export default update
