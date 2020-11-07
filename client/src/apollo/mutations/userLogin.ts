/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutationHookOptions, MutationTuple, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const LOGIN_QUERY = gql`
  mutation UserLogin($email: String!, $password: String!) {
    userLogin(input: { email: $email, password: $password }) {
      _id
      address
      email
      expiration
      token
      name
      type
    }
  }
`

const userLogin = (
  options: MutationHookOptions<any, Record<string, any>>
): MutationTuple<any, Record<string, any>> => {
  return useMutation(LOGIN_QUERY, options)
}

export default userLogin
