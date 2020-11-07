/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutationHookOptions, MutationTuple, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const USER_UPDATE = gql`
  mutation UserUpdateProfile($_id: ID!, $email: String!, $password: String!) {
    userUpdateProfile(_id: $_id, input: { email: $email, password: $password }) {
      _id
      email
    }
  }
`

const userUpdateProfile = (
  options: MutationHookOptions<any, Record<string, any>>
): MutationTuple<any, Record<string, any>> => {
  return useMutation(USER_UPDATE, options)
}

export default userUpdateProfile
