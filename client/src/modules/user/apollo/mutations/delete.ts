/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutationHookOptions, MutationTuple, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const USER_DELETE = gql`
  mutation UserDelete($_id: ID!) {
    userDelete(_id: $_id) {
      ok
      n
      deletedCount
    }
  }
`

const deleteUser = (
  options: MutationHookOptions<any, Record<string, any>>
): MutationTuple<any, Record<string, any>> => {
  return useMutation(USER_DELETE, options)
}

export default deleteUser
