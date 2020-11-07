import { IUserPaginationState } from '../../../interfaces'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const GET_PAGINATION_FILTER = gql`
  {
    userPaginationState @client {
      __typename
      currentPage
      limit
      skip
      url
    }
  }
`

const getUserPaginationState = (): IUserPaginationState => {
  const { data: pagination } = useQuery(GET_PAGINATION_FILTER)
  const { userPaginationState: userPaginationState } = pagination
  return userPaginationState
}

export default getUserPaginationState
