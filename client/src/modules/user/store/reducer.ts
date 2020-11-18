import { SET_USERS } from './action-types'

const initialState = Object.assign({
  users: [],
})

interface IReducerParams {
  payload: object[]
  type: string
}

function setUsers(state: object, payload: object[]): object {
  return {
    ...state,
    users: payload,
  }
}

const reducer = (state = initialState, action: IReducerParams): object => {
  const { type, payload } = action
  switch (type) {
    case SET_USERS:
      return setUsers(state, payload)
    default:
      return state
  }
}

export default reducer
