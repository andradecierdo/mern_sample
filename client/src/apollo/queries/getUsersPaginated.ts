import { IQuery, IUserPaginated } from '../../interfaces'
import getUserPaginationState from '../local/userPaginationState'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const QUERY_USER_PAGINATED = gql`
  query UsersPaginated($limit: Int, $skip: Int) {
    usersPaginated(input: { limit: $limit, skip: $skip }) {
      data {
        _id
        access
        email
        type
        websiteIds
      }
      total
    }
  }
`

const getUsersPaginated = (): IQuery<IUserPaginated> => {
  const { limit, skip } = getUserPaginationState.getStateValues()

  const { data, error, loading } = useQuery(QUERY_USER_PAGINATED, {
    fetchPolicy: 'cache-and-network',
    pollInterval: 2000,
    variables: {
      limit,
      skip,
    },
  })

  return {
    data: (data && data.usersPaginated) || {
      data: [],
      limit,
      skip,
      total: 0,
    },
    error,
    loading,
  }
}

export default getUsersPaginated
