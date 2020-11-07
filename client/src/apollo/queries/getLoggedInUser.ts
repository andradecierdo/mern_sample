import { IQuery, IUser } from '../../interfaces'
import { getUserIdFromAuthCookie } from '../../common/helpers'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const QUERY_USER = gql`
  query LoogedInUser($_id: ID!) {
    user(_id: $_id) {
      _id
      address
      email
      name
      type
    }
  }
`

const getLoggedInUser = (): IQuery<IUser> => {
  const userId = getUserIdFromAuthCookie()
  if (userId === null) {
    return null
  }

  const { data, error, loading } = useQuery(QUERY_USER, {
    fetchPolicy: 'cache-and-network',
    variables: { _id: userId },
  })

  return {
    data: (data && data.user) || [],
    error,
    loading,
  }
}

export default getLoggedInUser
