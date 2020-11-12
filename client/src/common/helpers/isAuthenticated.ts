import Cookies from 'js-cookie'

const isAuthenticated = (): boolean => {
  const auth = Cookies.get('auth')
  if (!!auth) {
    const authData = JSON.parse(auth)
    return authData !== null
  }
  return false
}

export default isAuthenticated
