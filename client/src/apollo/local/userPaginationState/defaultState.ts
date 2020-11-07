import { paginationLimit } from '../../../common/constants'

const userPaginationState = {
  __typename: 'UserPaginationState',
  currentPage: 1,
  limit: paginationLimit,
  skip: 0,
  url: '',
}

export default userPaginationState
