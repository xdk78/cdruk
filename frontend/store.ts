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
  LOGIN_SUCCES: 'LOGIN_SUCCES',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_PENDING: 'LOGIN_PENDING',
  LOGOUT: 'LOGOUT',
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
    case actionTypes.LOGIN_SUCCES:
      return { ...state, user: action.payload.user, isLogged: true }
    case actionTypes.LOGIN_PENDING:
      return { ...state, isLogged: false }
    case actionTypes.LOGIN_ERROR:
      return { ...state, isLogged: false }
    case actionTypes.LOGOUT:
      return { ...state, user: null, isLogged: false }
    default:
      return state
  }
}

// ACTIONS
export const signup = (email: string, password: string) => async (dispatch) => {
  try {
    const { data } = await api.post('/register', {
      email,
      password,
    })
    dispatch({ type: actionTypes.SIGN_UP_PENDING })
    dispatch({
      type: actionTypes.SIGN_UP_SUCCES,
      payload: { user: { email, token: data.data.token } },
    })
  } catch (error) {
    dispatch({ type: actionTypes.SIGN_UP_ERROR })
  }
}

export const login = (email: string, password: string) => async (dispatch) => {
  try {
    const { data } = await api.post('/login', { email, password })
    dispatch({ type: actionTypes.LOGIN_PENDING })
    dispatch({
      type: actionTypes.LOGIN_SUCCES,
      payload: { user: { email, token: data.data.token } },
    })
  } catch (error) {
    dispatch({ type: actionTypes.LOGIN_ERROR })
  }
}

export const logout = () => async (dispatch) => {
  dispatch({ type: actionTypes.LOGOUT })
}

export function initializeStore(initialState = defaultState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
