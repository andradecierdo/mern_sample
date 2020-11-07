interface IUserUpdateInput {
  access: string[]
  email: string
  hashedPassword: string
  type: string
  websiteIds: string[]
}

export default IUserUpdateInput
