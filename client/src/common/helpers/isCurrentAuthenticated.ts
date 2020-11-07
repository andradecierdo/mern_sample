import Cookies from 'js-cookie'
import { userTypes } from '../constants'

const isCurrentAuthenticated = (): boolean => {
  const auth = Cookies.get('auth')
  if (!!auth) {
    const authData = JSON.parse(auth)
    if (
      authData.type === userTypes.business ||
      authData.type === userTypes.admin ||
      authData.type === userTypes.master
    ) {
      return true
    }
  }
  return false
}

export default isCurrentAuthenticated
