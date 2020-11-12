interface IUser {
  _id: string
  address: string
  email: string
  hashedPassword: string
  parentId: string
  name: string
  type: string
}

export default IUser
