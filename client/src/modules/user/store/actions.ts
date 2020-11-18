import { SET_USERS } from './action-types'

export function setUsers(payload: object[]): { payload: object[]; type: string } {
  return {
    payload,
    type: SET_USERS,
  }
}
