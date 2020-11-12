interface IUserCreateInputPasswordHashed {
  address: string
  email: string
  hashedPassword: string
  name: string
  parentId?: string,
  type: string
}

export default IUserCreateInputPasswordHashed
