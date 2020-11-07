interface IQuery<TData> {
  data: TData
  error: object
  loading: boolean
}

export default IQuery
