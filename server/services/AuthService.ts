import { IAuthInputObject, IAuthenticatedUser, IUser } from '../interfaces'
// @ts-ignore
import bcrypt from 'bcrypt'
// @ts-ignore
import jsonwebtoken from 'jsonwebtoken'

/* ----------------------------------------------------------------------------------
 * Class that is responsible for generating a token that will be sent over the client.
 * The token will be use to authenticate any user that is communicating with the
 * GraphQL server.
/* ---------------------------------------------------------------------------------- */
class AuthService {
  private readonly saltRounds: number = 10
  private readonly authSecret: string = process.env.AUTH_SECRET
  private readonly tokenExpiration: string = '30d'

  public authenticate = async (
    user: IUser,
    passwordToCompare: string,
  ): Promise<IAuthenticatedUser> => {
    if (user === null) {
      return this.generateEmptyAuth()
    }
    return this.getAuthenticatedUserByComparingPassword(user, passwordToCompare)
  }

  public getAuthDecodedToken = (token: string): string | object => {
    try {
      if (token === null) {
        return null
      }

      // Type object used is equivalent to IAuthenticatedUser.
      const decodedAuthToken: string | object = jsonwebtoken.verify(token, this.authSecret)

      if (!decodedAuthToken) {
        return null
      }

      return decodedAuthToken
    } catch (error) {
      return null
    }
  }

  public hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password + this.authSecret, this.saltRounds)
  }

  private getAuthenticatedUserByComparingPassword = async (
    user: IUser,
    passwordToCompare: string,
  ): Promise<IAuthenticatedUser> => {
    const isPasswordValid = await this.comparePassword(passwordToCompare, user.hashedPassword)
    if (isPasswordValid) {
      return this.generateValidAuth(user)
    }
    return this.generateEmptyAuth()
  }

  private generateEmptyAuth = (): IAuthenticatedUser => {
    return {
      _id: null,
      address: null,
      email: null,
      expiration: null,
      token: null,
      parentId: null,
      name: null,
      type: null,
    }
  }

  private comparePassword = async (
    inputPassword: string,
    userPassword: string,
  ): Promise<boolean> => {
    return await bcrypt.compare(inputPassword + this.authSecret, userPassword)
  }

  private generateValidAuth = (user: IUser): IAuthenticatedUser => {
    const authObject: IAuthInputObject = {
      _id: user._id,
      address: user.address,
      email: user.email,
      expiration: this.getExpiration(),
      parentId: user.parentId,
      name: user.name,
      type: user.type,
    }

    return Object.assign(authObject, { token: this.generateAuthToken(authObject) })
  }

  private getExpiration = (): Date => {
    return new Date(new Date().getTime() + 60 * 60 * 24 * 30 * 1000)
  }

  private generateAuthToken = (authObject: IAuthInputObject): string => {
    return jsonwebtoken.sign(authObject, this.authSecret, { expiresIn: this.tokenExpiration })
  }
}

export default AuthService
