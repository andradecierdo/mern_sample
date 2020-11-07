interface IAuthenticatedUser {
  _id: string
  address: string
  email: string
  expiration: Date
  token: string
  name: string
  type: string
}

export default IAuthenticatedUser
