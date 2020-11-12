interface IUserUpdateInputPasswordHashed {
  address: string
  email: string
  hashedPassword?: string
  name: string
  type: string
}

export default IUserUpdateInputPasswordHashed
