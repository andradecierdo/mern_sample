import { timeZone } from '../constants'

export const convertDateToReadableString = (dateString: string): string => {
  return new Date(dateString).toLocaleString('en-US', { timeZone })
}

export default convertDateToReadableString
