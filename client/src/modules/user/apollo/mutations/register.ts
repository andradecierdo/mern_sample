/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutationHookOptions, MutationTuple, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const USER_REGISTER = gql`
  mutation UserRegister(
      $address: String!
      $email: String!
      $password: String!
      $name: String!
      $type: String!
  ) {
    userRegister(
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

const register = (
  options: MutationHookOptions<any, Record<string, any>>
): MutationTuple<any, Record<string, any>> => {
  return useMutation(USER_REGISTER, options)
}

export default register
