import { IQuery, IUserPaginated } from '../../../../interfaces'
import getUserPaginationState from '../../../../apollo/local/userPaginationState'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const QUERY_USER_PAGINATED = gql`
  query UsersByParentPaginated($limit: Int, $skip: Int) {
    usersByParentPaginated(input: { limit: $limit, skip: $skip }) {
      data {
        _id
        address
        email
        name
        type
      }
      total
    }
  }
`

const getUsersByParentPaginated = (): IQuery<IUserPaginated> => {
  const { limit, skip } = getUserPaginationState.getStateValues()

  const { data, error, loading } = useQuery(QUERY_USER_PAGINATED, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit,
      skip,
    },
  })

  return {
    data: (data && data.usersByParentPaginated) || {
      data: [],
      limit,
      skip,
      total: 0,
    },
    error,
    loading,
  }
}

export default getUsersByParentPaginated
