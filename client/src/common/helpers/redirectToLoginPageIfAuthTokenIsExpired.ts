import Cookies from 'js-cookie'
import { navigate } from '@reach/router'
import { routes } from '../constants'

const hasOneDayPassed = (): boolean => {
  const date = new Date().toLocaleDateString()

  if (localStorage.AuthTokenDate === date) {
    return false
  }

  localStorage.AuthTokenDate = date
  return true
}

const checkAuthTokenIfExpired = (): boolean => {
  const auth = Cookies.get('auth')
  if (!!auth) {
    const authData = JSON.parse(auth)
    const dateNow = Date.now() / 1000
    return authData.token === null || authData.expiration < dateNow
  }
  return true
}

const runOncePerDay = (): boolean | void => {
  if (!hasOneDayPassed()) {
    return false
  }

  if (checkAuthTokenIfExpired()) {
    navigate(routes.loginPage)
  }
}

const redirectToLoginPageIfAuthTokenIsExpired = (): void => {
  const dayInMilliseconds = 1000 * 60 * 60 * 24

  setInterval((): void => {
    runOncePerDay()
  }, dayInMilliseconds)
}

export default redirectToLoginPageIfAuthTokenIsExpired
