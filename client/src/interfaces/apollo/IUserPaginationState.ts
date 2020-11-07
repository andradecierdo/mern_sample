interface IUserPaginationState {
  __typename: string
  currentPage: number
  limit: number
  skip: number
  url: string
}

export default IUserPaginationState
