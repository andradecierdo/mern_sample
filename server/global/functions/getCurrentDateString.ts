import { timeZone } from '../constants'

export const getCurrentDateString = (): string => {
  return new Date().toLocaleDateString('en-US', { timeZone })
}

export default getCurrentDateString
