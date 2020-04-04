import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import api from './api'

const defaultState = {
  user: null,
  isLogged: false,
  errors: [],
}

export const actionTypes = {
  SIGN_UP_SUCCES: 'SIGN_UP_SUCCES',
  SIGN_UP_ERROR: 'SIGN_UP_ERROR',
  SIGN_UP_PENDING: 'SIGN_UP_PENDING',
}

// REDUCERS
export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP_SUCCES:
      return { ...state, user: action.payload.user, isLogged: true }
    case actionTypes.SIGN_UP_PENDING:
      return { ...state, isLogged: false }
    case actionTypes.SIGN_UP_ERROR:
      return { ...state, isLogged: false }
    default:
      return state
  }
}

// ACTIONS
export const sinup = (email: string, password: string) => async (dispatch) => {
  try {
    await api('/register', { method: 'POST', data: { email, password } })
    dispatch({ type: actionTypes.SIGN_UP_PENDING })
    dispatch({
      type: actionTypes.SIGN_UP_SUCCES,
      payload: { email, password },
    })
  } catch (error) {
    dispatch({ type: actionTypes.SIGN_UP_ERROR })
  }
}

export function initializeStore(initialState = defaultState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
