import { IQuery, IUser } from '../../interfaces'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const QUERY_USER = gql`
  query User($_id: ID!) {
    user(_id: $_id) {
      _id
      access
      email
      type
      websiteIds
    }
  }
`

const getUser = (userId: string): IQuery<IUser> => {
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

export default getUser
