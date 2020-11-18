import { ApolloQueryResult } from 'apollo-client'

interface IQuery<TData> {
  data: TData
  error: object
  loading: boolean
  refetch: (variables?: unknown) => Promise<ApolloQueryResult<TData>>
}

export default IQuery
